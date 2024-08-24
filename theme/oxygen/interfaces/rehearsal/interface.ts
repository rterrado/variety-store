import { IdentityAuthority } from "../identity-authority/interface";
import { YotpoAPI } from "../yotpo/interface";

export namespace Rehearsal {
    export namespace Endpoints {
        export type Refresh = {
            request: {
                path: "/:tenantId/rehearsal/user/token/refresh";
            };
            response: {
                token: string;
            };
        };
        export namespace Yotpo {
            export type Login = {
                request: {
                    path: '/:tenantId/rehearsal/yotpo/token/generate',
                    data: {
                        app_key: string,
                        secret_key: string
                    }
                },
                response: {
                    token: string
                }
            }
            export type Refresh = {
                request: {
                    path: '/:tenantId/identity-authority/yotpo/token/refresh'
                }
                response: {
                    token: string
                }
            }
            export namespace Products {
                export namespace Get {
                    export type All = {
                        request: {
                            path: '/:tenantId/rehearsal/yotpo/products/get/all?next=:next_page_token',
                        },
                        response: {
                            pagination: {
                                next_page_info: string
                            }
                            products: Array<YotpoAPI.Products.ListItem>
                        }
                    }
                    export type ByIds = {
                        request: {
                            path: '/:tenantId/rehearsal/yotpo/products/search?ids=:ids',
                        },
                        response: {
                            pagination: {
                                next_page_info: string
                            }
                            products: Array<YotpoAPI.Products.ListItem>
                        }
                    }
                }
            }
        }
    }
}