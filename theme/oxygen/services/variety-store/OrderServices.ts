import { AppConfig } from "../../factories/AppConfig";
import { BinaryState } from "../../factories/BinaryState";
import { CallbackQueue } from "../../factories/CallbackQueue";
import { app } from "../../interfaces/app";
import { Rehearsal } from "../../interfaces/rehearsal/interface";
import { HttpRequestHelper } from "../HttpRequestHelper";

export interface OrderServices {
    __getOrderByReferenceId:(
        referenceId: string, 
        listener: (data:Rehearsal.Endpoints.Yotpo.Orders.Get.ByReferenceId['response'] | Error)=>void
    )=>void
}

app.service<OrderServices>('OrderServices',(
    CallbackQueue: CallbackQueue,
    BinaryState: BinaryState,
    HttpRequestHelper: HttpRequestHelper,
    AppConfig: AppConfig
)=>{
    const APP_CONFIG = new AppConfig
    const GetOrderServiceClient: {[key:string]:{
        listeners: InstanceType<CallbackQueue>,
        data: Rehearsal.Endpoints.Yotpo.Orders.Get.ByReferenceId['response'] | null
        state: {
            loading: InstanceType<BinaryState>,
            ready: InstanceType<BinaryState>
        }
    }} = {}
    return {
        __getOrderByReferenceId: (referenceId, listener)=>{
            if (!(referenceId in GetOrderServiceClient)) {
                GetOrderServiceClient[referenceId] = {
                    listeners: new CallbackQueue(),
                    data: null,
                    state: {
                        loading: new BinaryState(false),
                        ready: new BinaryState(false)
                    }
                }
            }
            if (GetOrderServiceClient[referenceId].state.ready.true()){
                listener(GetOrderServiceClient[referenceId].data)
                return
            }
            if (GetOrderServiceClient[referenceId].state.loading.false()){
                GetOrderServiceClient[referenceId].state.loading.set(true)
                HttpRequestHelper.__get<Rehearsal.Endpoints.Yotpo.Orders.Get.ByReferenceId>({
                    __host: APP_CONFIG.__getServiceHost().__Rehearsal(),
                    __path: '/:tenantId/rehearsal/yotpo/orders/v3/get/single?reference_id=:reference_id',
                    __params: {tenantId: APP_CONFIG.__getTenantId(), reference_id: referenceId },
                    __doNotPassRequesterToken: true
                }).then(response => {
                    GetOrderServiceClient[referenceId].state.ready.set(true)
                    GetOrderServiceClient[referenceId].data = response
                    const queue = GetOrderServiceClient[referenceId].listeners.withdraw()
                    for (let i = 0; i < queue.length; i++) {
                        queue[i](response)
                    }
                }).catch(error=>{
                    listener(new Error(error))
                })
            }
            GetOrderServiceClient[referenceId].listeners.add(listener)
        }
    }
})
