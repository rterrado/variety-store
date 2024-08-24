export namespace YotpoAPI {
    export namespace Products {
        export type ListItem = {
            brand: string
            compare_at_price: number | null
            created_at: string,
            currency: string | null
            custom_properties: {
                is_blocklisted: boolean,
                review_form_tag: string
            } | null
            description: string 
            external_created_at: string | null
            external_id: string
            external_updated_at: string | null
            group_name: string | null 
            gtins: Array<{
                declared_type: 'UPC' | 'ISBN' | 'EAN',
                value: string
            }>,
            handle: string | null 
            image_url: string | null 
            inventory_quantity: number | null 
            is_discontinued: boolean 
            is_valid_url_forma: boolean
            mpn: string | null 
            name: string
            price: number | null
            sku: string | null
            status: string | null 
            store_id: string
            updated_at: string 
            url: string 
            yotpo_id: number
        }
        export namespace Endpoints {
            export namespace Get {
                export type Bottomline = {
                    request: {
                        path: '/products/:appkey/:productId/bottomline'
                    }
                    response: {
                        status: {
                            code: 200,
                            message: 'OK'
                        },
                        response: {
                            bottomline: {
                                average_score: number,
                                total_reviews: number
                            }
                        }
                    }
                }
            }
        }
    }
    export namespace Account {
        export namespace Endpoints {
            export namespace Get {
                export type Details = {
                    request: {
                        path: '/v1/lp/apps/:appkey/account_settings'
                    }
                    response: {
                        status: {
                            code: 200,
                            message: 'OK'
                        },
                        account_settings: {
                            account_logo: string,
                            account_language: string,
                            store_name: string
                        }
                    }
                }
            }
        }
    }
}