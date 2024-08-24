import { app } from "../../interfaces/app";
import { YotpoAPIClient } from "../yotpo/YotpoAPIClient";

export interface ProductBottomlineService {
    get:(appkey:string, productId: string)=>Promise<{totalReviews:number, averageScore: number}>
}

app.service<ProductBottomlineService>('ProductBottomlineService',(
    YotpoAPIClient: YotpoAPIClient
)=>{
    class __Service {
        memoized: {[key:string]:{totalReviews:number, averageScore: number}}
        constructor(){
            this.memoized = {}
        }
        get(appkey:string, productId: string):Promise<{totalReviews:number, averageScore: number}>{
            return new Promise(async (resolve, reject)=>{
                if (productId in this.memoized) {
                    resolve(this.memoized[productId])
                    return
                }
                YotpoAPIClient.__getProductBottomline(appkey, productId)
                .then(response=>{
                    this.memoized[productId] = {
                        totalReviews: response.response.bottomline.total_reviews,
                        averageScore: response.response.bottomline.average_score
                    }
                    resolve(this.memoized[productId])
                })
                .catch(error=>reject(error))
            })
        }
    }
    return new __Service
})