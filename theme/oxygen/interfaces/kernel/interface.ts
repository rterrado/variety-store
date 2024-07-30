export namespace Entity {
    /**
    * The Entity ID of an object. This value can only be provided once, 
    * and cannot be overriden. This property only accepts value typeof string, 
    * with characters not lesser than 1 and not more than 32.
    */
    export type Id = string & { length: 32 }
    /**
     * The external id representation of the Entity Object. 
     * Please know that this value is not universally unique, 
     * and it's only unique within the type of entity
     */
    export type ExternalId = number

    /**
     * The owners of a record, represented by a User ID 
     * or a Tenant ID
     */
    export type Owners = Array<Tenant.Id|Entity.Id>
}

/** 
 * Extract path params from a segment 
 * For example `/orders/:orderId/transactions` will extract `orderId`
 */
type ExtractParam<Path, NextPart> = Path extends `:${infer Param}` ? Record<Param,string> & NextPart : NextPart;

/**
 * Extract value from key-value pair
 * For example `key=:value` will extract `value`
 */
type ExtractKeyValuePair<KeyValuePair, NextPart> = 
    KeyValuePair extends `${infer Key}=:${infer Value}` 
    ? Record<Value,string|null|undefined> & NextPart
    : NextPart

/**
 * Explodes query params string
 * For example, `?id=:id&status=:status` will extract `id` and `status`
 */
type ExplodeQueryParams<QueryParams> = 
    QueryParams extends `${infer KeyValuePair}&${infer Rest}` 
        ? ExtractKeyValuePair<KeyValuePair,ExplodeQueryParams<Rest>>
        : ExtractKeyValuePair<QueryParams, {}>

/**
 * Converts a path into segments 
 * For example `/orders/:orderId/transactions` will extract 
 * segments into `orders` , `:orderId`, `transactions`
 */        
export type ExtractParams<Path> = 
    (Path extends `${infer Segment}/${infer Rest}`
        ? ExtractParam<Segment, ExtractParams<Rest>>
        : (Path extends `:${infer Segment}?${infer Rest}`
            ? Record<Segment,string>
            : ExtractParam<Path, {}>
        )
    ) 
    & (Path extends `${infer RightSide}?${infer QueryParams}`
        ? (ExplodeQueryParams<QueryParams>) : {}
    )

export type ToUnknownKeys<T> = { [K in keyof T]: unknown }

type HttpRequestType = Request
type HttpResponse = Response
/**
 * A collection of types that relates to routes or routing
 */
export namespace Route {
    export namespace Endpoint {
        export type Schema = {
            request: {
                path: string,
                data?: {[key:string]:any} | undefined
            },
            response: {[key:string]:any}
        }
    }
    
    //type ToUnknownKeys<T> = { [K in keyof T]: T[K] extends string ? K extends string ? T[K] : unknown : unknown }
    export type Data<T extends Route.Endpoint.Schema> = {
        data:  ExtractParams<T['request']['path']> &  ToUnknownKeys<T['request']['data']>,
        requester: null    
    }
    export type Handler<T extends Route.Endpoint.Schema> = (params:Route.Data<T>) => Promise<T['response']>

    export namespace Http {
        export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'
        export type ContentType = 'image/png'
        export type Request = HttpRequestType & {
            /** Named route path parameters. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. */
            params: {[key: string]: any}
            /** This property is an object containing a property for each query string parameter in the route.  */
            query: {[key: string]: any}
            /** Contains key-value pairs of data submitted in the request body. */
            body: {[key: string]: any}
            /** Contains key-valur pairs of file data */
            files: {[key: string]: any}
            /** The requester of the request, defined by the token passed to the X-Krypton-Token in the header */
            requester: null
            useragent: string
            clientIp: string
        }
        export type Response = HttpResponse & {
            /** Sets the HTTP status for the response.  */
            status(code:number)
            /** Sends a JSON response */
            json(data:{[key: string]: any})
            sendFile(filePath:string)
        }
    }
    export type FrameworkInterface = {
        /** A GET request */
        get<T extends Route.Endpoint.Schema>(uri:T['request']['path'],authMiddleware:(request,response,next)=>void,callback:Route.Handler<T>):void
        /** A POST request */
        post<T extends Route.Endpoint.Schema>(uri:T['request']['path'],authMiddleware:(request,response,next)=>void,callback:Route.Handler<T>):void
        /** A PATCH request */
        patch<T extends Route.Endpoint.Schema>(uri:T['request']['path'],authMiddleware:(request,response,next)=>void,callback:Route.Handler<T>):void
        /** A PUT request */
        put<T extends Route.Endpoint.Schema>(uri:T['request']['path'],authMiddleware:(request,response,next)=>void,callback:Route.Handler<T>):void
        /** A DELETE request */
        delete<T extends Route.Endpoint.Schema>(uri:T['request']['path'],authMiddleware:(request,response,next)=>void,callback:Route.Handler<T>):void
    }
    export type ProxyInterface = {
        /** A GET request */
        get<T extends Route.Endpoint.Schema>(uri:T['request']['path'],callback:Route.Handler<T>):void
        /** A POST request */
        post<T extends Route.Endpoint.Schema>(uri:T['request']['path'],callback:Route.Handler<T>):void
        /** A PATCH request */
        patch<T extends Route.Endpoint.Schema>(uri:T['request']['path'],callback:Route.Handler<T>):void
        /** A PUT request */
        put<T extends Route.Endpoint.Schema>(uri:T['request']['path'],callback:Route.Handler<T>):void
        /** A DELETE request */
        delete<T extends Route.Endpoint.Schema>(uri:T['request']['path'],callback:Route.Handler<T>):void
    }
}



/** A collection of types that relates to Tenant as an abstraction */
export namespace Tenant {
    /**
     * The Tenant ID of an object. This value can only be provided once,
     * and cannot be overriden. This property only accepts value typeof string, 
     * with strictly 32 characters in length.
    */
    export type Id = string & { length: 32, tenant: true }

    export type Status = 'active' | 'pending' | 'banned' | 'deactivated' | 'archived' | 'reported'
    export namespace Tokens {
        export type Registration = {
            payload: {tenant_id: string, action: 'registration'}
        }
    }
    export namespace Endpoints {
        export type CreateExternally = {
            request: {
                path: '/kernel/tenant/create',
                data: {}
            }
            response: {
                tenant_id: string,
                tenant_action_token: string
            }
        }
        export namespace Installations {
            export type Start = {
                request: {
                    path: '/:tenantId/installations/start',
                    data: {}
                }
                response: {}
            }
        }
        export namespace Get {
            export namespace Private {
                export type ById = {
                    request: {
                        path: '/kernel/application/tenants?tenantId=:tenantId'
                    }
                    response: {
                        app_key: string
                        firebase_project_id: string | null
                        aws_s3_bucket: string | null
                        notification_service_id: string | null
                        redis_hostname: string | null
                        mysql_hostname: string | null
                        indexer_hostname: string
                        mail_service_id: string
                        timezone: string
                        language: string
                        status: Tenant.Status
                    }
                }
            }
        }
    }
}

export namespace User {
    export type Status = 'active' | 'unverified' | 'banned' | 'archived' | 'suspended' | 'deactivated'
    export type Data = {entity_id: string, status: User.Status}
}

/**
 * A permission token with placeholders. For example, 
 * tenant:{tenant_id}:user:{user_id}. 
 * This token needs to be populated with data first 
 * before this can be validated
 */
export type AbstractPermissionToken = string & {delimiter:':',placeholders:true}
/**
 * A permission token with actual values. For example,
 * tenant:sampletenantid:user:sampleuserid
 */
export type ConcretePermissionToken = string & {delimiter:':',placeholders:false}
/**
 * A token that represents a permission. This refers to 
 * both Abstract and Concrete tokens
 */
export type PermissionToken = AbstractPermissionToken | ConcretePermissionToken
/** 
 * A list of individual permission tokens
 */
export type PermissionTokens = Array<PermissionToken>

export namespace FileUploadManager {
    export type RelativePath = string & { format: 'files/{year}/{month}/{id}.{filetype}' }
    export namespace Endpoints {
        export namespace Private {
            export type UploadFile = {
                request: {
                    path: '/:tenantId/upload/file',
                    data: {
                        audience: string,
                        file: File,
                        uploadedForEntityId: string
                    }
                }
                response: {
                    relativePath: RelativePath
                    token: string
                }
            }
        }
    }
    export type FileObject = {
        name: string,
        data: null,
        size: number,
        encoding: '7bit',
        tempFilePath: '',
        truncated: false,
        mimeType: Route.Http.ContentType,
        md5: string,
        mv: (path:string,callback:(error:Error)=>void)=>void
    }
    export type UploadTokenPayload = {
        payload : { createdByUserId: Entity.Id, uploadedForEntityId: Entity.Id, relativeFilePath: string }
    }
}


export namespace Auth {
    export namespace Tokens {
        export type Authorization = {
            payload: { user: { id: string, status: string }, permissions: Array<ConcretePermissionToken> }
        }
    }
    export namespace Endpoints {
        export type GetTokenUsingAppAndSecretKey = {
            request: {
                path: '/kernel/application/authenticate',
                data: { app_key: string, secret_key: string }
            }
            response: {
                token: string
            }
        }
    }
}
