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
                        secret_key: string,
                        captcha_token: string
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
            export namespace Cart {
                export type Product = {
                    extid: string,
                    name: string,
                    url: string,
                    group: string | null
                    imgsrc: string,
                    price: number,
                    currency: {
                        value: string
                        symbol: string
                    }
                }
                export type Item = {
                    items: Array<{
                        product: Cart.Product,
                        quantity: number
                    }>,
                    created: number,
                    updated: number
                }
            }
            export namespace Orders {
                export namespace Create {
                    export type V3SingleOrder = {
                        request: {
                            path: '/:tenantId/rehearsal/yotpo/orders/v3/create/single',
                            data: {
                                appKey: string,
                                storeName: string,
                                cart: Cart.Item,
                                subtotalPrice: number,
                                taxesAndFees: number,
                                totalPrice: number,
                                customer: {
                                    firstName: string,
                                    lastName: string,
                                    email: string,
                                    phoneNumber: string | null
                                }
                                billingAddress: {
                                    addressLine1: string
                                    townCity: string 
                                    stateProvince: string 
                                    zipcode: string
                                    countryCode: string
                                } | null
                                orderDate: string 
                                fulfillmentDate: string
                            }
                        },
                        response: {
                            reference_id: string
                        }
                    }
                }
                export namespace Get {
                    export type ByReferenceId = {
                        request: {
                            path: '/:tenantId/rehearsal/yotpo/orders/v3/get/single?reference_id=:reference_id'
                        },
                        response: S3OrderInterface
                    }
                }
                export type S3OrderInterface = {
                    yotpo_order_id: number
                    app_key: string,
                    store_name: string
                    external_order_id: string
                    reference_id: string,
                    cart: Rehearsal.Endpoints.Yotpo.Cart.Item
                    subtotal_price: number,
                    taxes_and_fees: number,
                    total_price: number,
                    billing_adress: Create.V3SingleOrder['request']['data']['billingAddress']
                    customer: Create.V3SingleOrder['request']['data']['customer']
                    order_date: Create.V3SingleOrder['request']['data']['orderDate']
                    fulfillment_date: Create.V3SingleOrder['request']['data']['fulfillmentDate']
                }
            }
        }
    }
}