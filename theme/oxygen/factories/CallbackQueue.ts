import { app } from "../interfaces/app";

interface CallbackQueueObjectInterface {
    add:(callback:(...args: any[])=>void)=>void
    withdraw:()=>Array<(...args: any[])=>void>
}

export type CallbackQueue = new (...args: any[]) => CallbackQueueObjectInterface

app.factory('CallbackQueue', () => {
    class CallbackQueueObject implements CallbackQueueObjectInterface {
        private queue:Array<(...args: any[])=>void>
        constructor(){
            this.queue = []
        }
        add(callback:(...args: any[])=>void){
            this.queue.push(callback)
        }
        withdraw(){
            return this.queue
        }
    }
    return CallbackQueueObject
})