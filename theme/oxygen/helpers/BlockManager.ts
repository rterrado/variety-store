import { BlockAPI, PatchAPI, PluncElementInterface, ScopeObject, app } from "../interfaces/app"


/**
 * Manages blocks within your component
 */
interface BlockManagerInterface {

    /**
     * Switch the block to the `active` state
     */
    __toActive:()=>Promise<void>

    /**
     * Switch the block to the `error` state
     */
    __toError:()=>Promise<void>

    /**
     * Switch the block to the `loading` state
     */
    __toLoading:()=>Promise<void>

    /**
     * Switch the block to the `empty` state
     */
    __toEmpty:()=>Promise<void>

    /**
     * Switch the block to the `ready` state
     */
    __toReady:()=>Promise<void>

    /**
     * Switch the block to the `completed` state
     */
    __toCompleted:()=>Promise<void>

    /**
     * Returns the current state value
     */
    __getCurrentState:()=>string

    __getElement:<TElement extends Element>()=>Promise<PluncElementInterface<TElement>>

    /**
     * Registers data into the block scope
     * @param name 
     * @param data 
     * @returns 
     */
    __bind:(name:string,data:((...args:any)=>void)|string|number|boolean|{[key:string]:any})=>void

    __getBind(name:string):unknown

}

app.helper<BlockManager>('BlockManager',(
    $scope: ScopeObject<StateInstance>,
    $patch: PatchAPI,
    $block: BlockAPI
)=>{
    const blockmanager = 'BlockManager'
    class __ManagerHelper implements BlockManagerInterface {
        private __scope: StateInstance
        private __patch: PatchAPI
        private __namespace: string
        private __name: string
        constructor(blockname:string){
            this.__scope = $scope
            this.__patch = $patch
            this.__namespace = blockname
            const tokens = blockname.split('/')
            if (tokens[0]!==''||tokens[1]!==blockmanager||tokens[2].length===0||tokens[3]!=='') {
                throw new Error(`Invalid block namespace structure "${blockname}"`)
            }
            this.__name = tokens[2]
            if (!(blockmanager in this.__scope)) {
                this.__scope[blockmanager] = {}
            }
            if (this.__name in this.__scope[blockmanager]) {
                throw new Error(`Duplicate block registration "${blockname}"`) 
            }
            this.__scope[blockmanager][this.__name] = {
                state: 'empty'
            }
        }

        private __setState(state:StateNames):Promise<void>{
            return new Promise(async (resolve,reject)=>{
                this.__scope[blockmanager][this.__name].state = state
                await this.__patch(this.__namespace)
                resolve(null)
            })
        }

        /**
         * Switch the block to the `active` state
         */
        __toActive():Promise<void>{
            return this.__setState('active')
        }

        /**
         * Switch the block to the `error` state
         */
        __toError():Promise<void>{
            return this.__setState('error')
        }

        /**
         * Switch the block to the `loading` state
         */
        __toLoading():Promise<void>{
            return this.__setState('loading')
        }

        /**
         * Switch the block to the `empty` state
         */
        __toEmpty():Promise<void>{
            return this.__setState('empty')
        }

        /**
         * Switch the block to the `ready` state
         */
        __toReady():Promise<void>{
            return this.__setState('ready')
        }

        /**
         * Switch the block to the `completed` state
         */
        __toCompleted():Promise<void>{
            return this.__setState('completed')
        }

        __getElement <TElement extends Element>(): Promise<PluncElementInterface<TElement>> {
            return new Promise((resolve,reject)=>{
                $block(this.__namespace,(element:PluncElementInterface<TElement>)=>resolve(element))
            })
        }
        
        __getCurrentState(){
            return this.__scope[blockmanager][this.__name].state
        }

        __bind(name: string, callback: ((...args:any)=>void)|string|number|boolean|{[key:string]:any}){
            if (name==='state') return 
            this.__scope[blockmanager][this.__name][name] = callback
        }

        __getBind(name: string):unknown {
            return this.__scope[blockmanager][this.__name][name] ?? null
        }

    }
    return __ManagerHelper
})

export type BlockManager = new <TName extends string>(blockname:BlockNamespace<TName>) => BlockManagerInterface

type StateNames = 'active' | 'error' | 'loading' | 'empty' | 'ready' | 'completed'

interface StateInstance {
    state: StateNames
}

type BlockNamespace<TName extends string> = `/BlockManager/${TName}/`