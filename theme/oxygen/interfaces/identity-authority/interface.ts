import { Entity, Tenant } from "../kernel/interface"

/**
 * IdentityAuthority is an application designed to manage user identities, authentication, 
 * and authorization within your application. The primary focus of this application is to 
 * streamline the handling of users, generate product authentication tokens, and manage 
 * roles and permissions effectively. Currently, IdentityAuthority supports popular 
 * identity providers such as Google and Firebase Authentication, providing seamless 
 * integration with external authentication systems.
 */
export namespace IdentityAuthority {

    export namespace Providers {
        export type Identity = 'fireauth' | 'google' | 'idauth'
        export type Pick<T extends Identity> = T
        export type Disregard<T extends Identity> = Exclude<Identity, T>
    }

    export namespace Users {

        export type Type = 'concrete' | 'abstract'

        export type Collection = 'iauth_users'

        export namespace Status {
            export type Type = 'active' | 'unverified' | 'banned' | 'deactivated' | 'archived' | 'suspended'
            export type Pick<T extends Type> = T
            export type Disregard<T extends Type> = Exclude<Type, T>
        }

        export namespace ApplicationAccess {
            /** User status that are allowed to communicate with your application */
            export type Allowed = Status.Pick<'active' | 'unverified'>
            /** User status that are allowed, but LIMITED to communicate with your application */
            export type Limited = Status.Pick<'deactivated' | 'archived'>
            /** User status that are PROHIBITED to communicate with your application */
            export type Prohibited = Status.Pick<'banned' | 'suspended'>
            export type Response = {
                is_user_registered: true,
                user_status: Allowed,
                token: string
                user_id: string
                access_type: 'allowed'
            } | {
                is_user_registered: true,
                user_status: Limited,
                token: string
                user_id: string
                access_type: 'limited'
            } | {
                is_user_registered: true,
                user_id: string
                user_status: Prohibited
                access_type: 'prohibited'
            } | {
                is_user_registered: false
            }
        }

        export namespace Types {

            /** The type of User first name */
            export type FirstName = string & {minLen:2,maxLen:32,key:'first_name'}

            /** The type of User last name */
            export type LastName  = string & {minLen:2,maxLen:32,key:'last_name'}

            /** A valid email address, but may not be unique */
            export type EmailAddress = string & {minLen:8,maxLen:64,verifiedUnique:false,key:'email_address'}

            /** A valid email address, and certified unique throughout the tenant */
            export type UniqueEmailAddress = string & {minLen:8,maxLen:64,verifiedUnique:true,key:'email_address'}

            /** A valid username, but may not be unique */
            export type Username = string & {minLen:5,maxLen:32,verifiedUnique:false,key:'username'}

            /** A valid username, and certified unique throughout the tenant */
            export type UniqueUsername = string & {minLen:5,maxLen:32,verifiedUnique:true,key:'username'}
        }

        export type Snippet = {
            id: string,
            first_name: string,
            last_name: string,
            username: string,
            email_address: string,
            is_email_verified: boolean
            user_type: Type
            status: Status.Type,
            profile_photo: string | null
        }

        export namespace Topics {
            export namespace Messages {
                export type User = {
                    topic_name: 'UserCreate' | 'UserSnippetUpdate',
                    entity_id: string,
                    first_name: string,
                    last_name: string,
                    username: string,
                    email_address: string,
                    is_email_verified: boolean
                    user_type: Type
                    status: Status.Type,
                    profile_photo: string | null
                }
                export type Emails = {
                    topic_name: 'TransactionalEmailDelivery',
                    template_id: string,
                    sender_id: string,
                    to_email: string,
                    variables: {
                        entity_id: string,
                        first_name: string,
                        last_name: string,
                        email_address: string,
                        username: string,
                        action_link: string
                    }
                }
            }
        }
        

        export namespace Endpoints {
            export namespace Create {
                export namespace Public {
                    export type WithExternalProvider = {
                        request: {
                            path: '/:tenantId/identity-authority/user/sync',
                            data: {
                                first_name: string,
                                last_name: string,
                                username: string,
                                provider_token: string,
                                provider: Providers.Pick<'google'|'fireauth'>
                            }
                        },
                        response: {
                            provider: Providers.Pick<'google'>,
                            user_id: string,
                            first_name: string,
                            last_name: string,
                            user_name: string,
                            status: Status.Pick<'active'>,
                            iauth_token: string
                        } | {
                            provider: Providers.Pick<'fireauth'>,
                            user_id: string,
                            first_name: string,
                            last_name: string,
                            user_name: string,
                            status: Status.Pick<'unverified'>,
                            iauth_token: string
                        }
                    } 
                    export type WithIAuthAsProvider = {
                        request: {
                            path: '/:tenantId/identity-authority/user/create',
                            data: {
                                first_name: string,
                                last_name: string,
                                username: string,
                                email: string,
                                password: string
                            }
                        },
                        response: {
                            user_id: string,
                            first_name: string,
                            last_name: string,
                            user_name: string,
                            status: Status.Pick<'unverified'>,
                            iauth_token: string
                        }
                    }
                }
                export namespace Private {
                    export type Concrete = {
                        request: {
                            path: '/:tenantId/identity-authority/user/create/concrete',
                            data: {
                                first_name: string,
                                last_name: string,
                                username: string,
                                email: string,
                                password: string,
                                is_verified_user: boolean
                            }
                        },
                        response: {
                            provider: Providers.Pick<'idauth'>,
                            idauth_user_id: string,
                            first_name: string,
                            last_name: string,
                            user_name: string,
                            status: Status.Pick<'unverified'|'active'>,
                            /**
                             * An idauth token is provided to give you a option to
                             * register on behalf of the users. You can then pass the 
                             * idauth token after the user successfully registers.
                             */
                            idauth_token: string,
                            tenant_id: string
                        }
                    }
                    export type Abstract = {
                        request: {
                            path: '/identity-authority/user/create/abstract',
                            data: {
                                first_name: string,
                                last_name: string,
                                tenant_id: string
                            }
                        },
                        response: {
                            provider: Providers.Pick<'idauth'>,
                            idauth_user_id: string,
                            first_name: string,
                            last_name: string,
                            username: string,
                            email_address: string,
                            naked_password: string,
                            status: Status.Pick<'active'>,
                            tenant_id: string
                        }
                    }
                }
            }
            export namespace Get {
                export namespace Public {
                    export type SnippetByEmailOrUsername = {
                        request: {
                            path: '/:tenantId/identity-authority/user/get/snippet?type=:type&value=:value'
                        },
                        response: Snippet
                    }
                    export type SnippetById = {
                        request: {
                            path: '/:tenantId/identity-authority/user/retrieve/snippet?id=:id'
                        },
                        response: Snippet
                    }
                }
                export namespace Private {
                    export namespace UserView {
                        export type Me = {
                            request: {
                                path: '/:tenantId/identity-authority/user/me'
                            },
                            response: {
                                user_id: string,
                                first_name: Types.FirstName
                                last_name: Types.LastName
                                identity_provider: Providers.Identity
                                email_address: Types.UniqueEmailAddress 
                                username: Types.UniqueUsername 
                                is_email_verified: boolean 
                                verified_since: Date | null
                                profile_photo: string | null
                                status: Status.Type
                                type: Type
                                description: string | null
                                created_at: number,
                                updated_at: number,
                                tenant_id: string
                            }
                        }
                    }
                    export namespace InternalView {
                        export type ByUserId = {
                            request: {
                                path: '/:tenantId/identity-authority/user/get?id=:id'
                            },
                            response: {
                                user_id: string,
                                first_name: Types.FirstName
                                last_name: Types.LastName
                                identity_provider: Providers.Identity
                                email_address: Types.UniqueEmailAddress 
                                username: Types.UniqueUsername 
                                is_email_verified: boolean 
                                verified_since: Date | null
                                roles: Array<string>
                                profile_photo: string | null
                                status: Status.Type
                                type: Type
                                description: string | null
                                notes: string | null
                                created_at: number,
                                updated_at: number,
                                tenant_id: string
                            }
                        }
                    }
                    export type UserIdCertificationToken = {
                        request: {
                            path: '/:tenantId/identity-authority/user/certify?id=:id&aud=:aud'
                        },
                        response: {
                            token: string
                        }
                    }
                    export type List = {
                        request: {
                            path: '/:tenantId/identity-authority/users?page=:page&per_page=:per_page'
                        },
                        response: {
                            list: Array<Snippet>,
                            has_next_page: boolean
                        }
                    }
                }
                export namespace Token {
                    export type Generate = {
                        request: {
                            path: '/:tenantId/identity-authority/user/token/generate'
                            data: {
                                email_address: string;
                                password: string;
                                captcha_token: string
                            }
                        },
                        response: ApplicationAccess.Response
                    }
                    export type Refresh = {
                        request: {
                            path: '/:tenantId/identity-authority/user/token/refresh'
                        },
                        response: {
                            token: string
                        }
                    }
                }
            }
            export namespace Update {
                export namespace ByUserHimself {
                    export type Description = {
                        request: {
                            path: '/:tenantId/identity-authority/users/:userId/profile/description',
                            data: {
                                description: string
                            }
                        },
                        response: {}
                    }
                    export type NameFields = {
                        request: {
                            path: '/:tenantId/identity-authority/users/:userId/profile/names',
                            data: {
                                first_name: string,
                                last_name: string
                            }
                        },
                        response: {}
                    }
                    export type Username = {
                        request: {
                            path: '/:tenantId/identity-authority/users/:userId/profile/username',
                            data: {
                                username: string
                            }
                        },
                        response: {}
                    }
                    export namespace Password {
                        export namespace Public {
                            export type SendResetEmail = {
                                request: {
                                    path: '/:tenantId/identity-authority/user/password/reset/send',
                                    data: {
                                        email_address: string
                                    }
                                },
                                response: {}
                            }
                            export type SubmitUsingOOBCode = {
                                request: {
                                    path: '/:tenantId/identity-authority/user/password/update/with/oobcode',
                                    data: {
                                        provider: Providers.Pick<'fireauth'>,
                                        password: string,
                                        oob_code: string,
                                        api_key: string
                                    } | {
                                        provider: Providers.Pick<'idauth'>,
                                        oob_code: string,
                                        password: string
                                    }
                                },
                                response: {}
                            }
                        }
                        export namespace Private {
                            export type IAuthProvider = {
                                request: {
                                    path: '/:tenantId/identity-authority/users/:userId/password/update',
                                    data: {
                                        current_password: string,
                                        new_password: string
                                    }
                                },
                                response: {}
                            }
                        }
                    }
                    export namespace AccountStatus {
                        export type SendVerificationEmail = {
                            request: {
                                path: '/:tenantId/identity-authority/user/account/verification/send',
                                data: {}
                            },
                            response: {}
                        }
                        export type ConfirmVerificationEmail = {
                            request: {
                                path: '/:tenantId/identity-authority/user/account/verification/confirm',
                                data: {
                                    verification_token: string
                                }
                            },
                            response: {}
                        }
                    }
                    export namespace Emails {
                        export type SendVerificationEmail = {
                            request: {
                                path: '/:tenantId/identity-authority/user/email/verification/send',
                                data: {
                                    new_email_address: string
                                }
                            },
                            response: {}
                        }

                        export type ConfirmVerificationEmail = {
                            request: {
                                path: '/:tenantId/identity-authority/user/email/verification/confirm',
                                data: {
                                    provider: Providers.Pick<'fireauth'>,
                                    provider_token: string,
                                    update_email_token: string,
                                    api_key: string
                                } | {
                                    provider: Providers.Pick<'idauth'>,
                                    update_email_token: string
                                }
                            },
                            response: {}
                        }
                    }
                    export namespace Status {
                        export type Deactivate = {
                            request: {
                                path: '/:tenantId/identity-authority/users/:userId/status/deactivate',
                                data: {
                                    notes: string
                                    password: string
                                }
                            },
                            response: {}
                        }
                        export type Reactivate = {
                            request: {
                                path: '/:tenantId/identity-authority/users/:userId/status/reactivate',
                                data: {}
                            },
                            response: {}
                        }
                        export type Archive = {
                            request: {
                                path: '/:tenantId/identity-authority/users/:userId/status/archive',
                                data: {
                                    password: string
                                }
                            },
                            response: {}
                        }
                    }
                    export namespace Images {
                        export type Upload = {
                            request: {
                                path: '/:tenantId/identity-authority/users/:userId/profile/images?type=:type',
                                data: {
                                    token: string
                                }
                            },
                            response: {}
                        } 
                    }
                }
                export namespace BySomeoneInternal {
                    export type Suspend = {
                        request: {
                            path: '/:tenantId/identity-authority/user/status/suspend',
                            data: {
                                user_id: string
                                notes: string
                                suspended_until_ms: number
                            }
                        },
                        response: {}
                    }
                    export type Ban = {
                        request: {
                            path: '/:tenantId/identity-authority/user/status/ban',
                            data: {
                                user_id: string
                                notes: string
                            }
                        },
                        response: {}
                    }
                    export namespace AccountStatus {
                        export type ForceVerifyAccount = {
                            request: {
                                path: '/:tenantId/identity-authority/user/account/verification/force',
                                data: {
                                    user_id: string
                                    tenant_user_password: string
                                }
                            },
                            response: {}
                        }
                    }
                }


            }
        }
    
    }

    export namespace Registry {
        export namespace Endpoints {
            export namespace Template {
                export namespace Private {
                    export type Create = {
                        request: {
                            path: '/:tenantId/identity-authority/registry/templates/email/create',
                            data: {
                                tenant_sender_id: string
                                action_link_root_domain: string
                            }
                        },
                        response: {
                            entity_id: string,
                            tenant_sender_id: string
                            action_link_root_domain: string
                            created_at: Date | string | number,
                            updated_at: Date | string | number
                        }
                    }
                    export type Get = {
                        request: {
                            path: '/:tenantId/identity-authority/registry/templates/email/get',
                            data: {}
                        },
                        response: {
                            entity_id: string,
                            tenant_sender_id: string
                            action_link_root_domain: string
                            password_reset_template_id: Entity.Id | null
                            account_verification_template_id?: Entity.Id | null
                            email_confirmation_template_id?: Entity.Id | null
                            created_at: Date | string | number,
                            updated_at: Date | string | number
                        }
                    }
                    export type Update = {
                        request: {
                            path: '/:tenantId/identity-authority/registry/templates/email/update',
                            data: {
                                tenant_sender_id: string
                                action_link_root_domain: string
                                password_reset_template_id: string | null
                                account_verification_template_id: string | null
                                email_confirmation_template_id: string | null
                            }
                        },
                        response: {
                            entity_id: string,
                            tenant_sender_id: string
                            action_link_root_domain: string
                            password_reset_template_id: Entity.Id | null
                            account_verification_template_id?: Entity.Id | null
                            email_confirmation_template_id?: Entity.Id | null
                            created_at: Date | string | number,
                            updated_at: Date | string | number
                        }
                    }
                }
            }
        }
    }


    export namespace Roles {
        export type Status = 'active' | 'archived'

        export type Snippet = {
            name: string
            permission: string
            description: string
            status: Roles.Status
        }

        export namespace Endpoints {
            export namespace Create {
                export namespace Private {
                    export type CreateNewRole = {
                        request: {
                            path: '/:tenantId/identity-authority/role/create',
                            data: {
                                name: string
                                description: string
                                permission: string
                            }
                        },
                        response: {
                            entity_id: string,
                            name: string,
                            permission: string,
                            description: string,
                            status: Roles.Status,
                            tenant_id: string,
                            created_at: string,
                            updated_at: string
                        }
                    }
                }
            }

            export namespace Get {
                export namespace Private {
                    export type GetRoleById = {
                        request: {
                            path: '/:tenantId/identity-authority/roles/:roleId'
                        }
                        response: {
                            entity_id: string,
                            name: string,
                            permission: string,
                            description: string,
                            status: Roles.Status,
                            tenant_id: string,
                            created_at: string | number | Date,
                            updated_at: string | number | Date
                        }
                    }
                }
            }


            export namespace Update {
                export namespace Private {
                    export type PromoteUserToAdmin = {
                        request: {
                            path: '/identity-authority/user/promote/admin',
                            data: { tenant_id: string, user_id: string }
                        },
                        response: {}
                    }
                    export type UpdateExistingRole = {
                        request: {
                            path: '/:tenantId/identity-authority/roles/:roleId/update',
                            data: {
                                name: string
                                description: string
                                permission: string
                                status: string
                            }
                        },
                        response: {}
                    }
                    export namespace User {
                        export type AddRole = {
                            request: {
                                path: '/:tenantId/identity-authority/users/:userId/role/add',
                                data: {
                                    role_id: string
                                }
                            },
                            response: {}
                        }
                        export type RemoveRole = {
                            request: {
                                path: '/:tenantId/identity-authority/users/:userId/role/remove',
                                data: {
                                    role_id: string
                                }
                            },
                            response: {}
                        }
                    }
                }
            }


            export namespace Delete {

            }

            
        }
    }

    export namespace Tenants {
        export namespace Endpoints {
            export namespace Create {
                export namespace Private {
                    export type CreateProfileIfNotExist = {
                        request: {
                            path: '/:tenantId/identity-authority/tenant/profile/create',
                            data: {
                                name: string
                                description: string
                            }
                        }
                        response: {
                            tenant_id: string,
                            name: string,
                            description: string,
                            created_at: Date | string | number,
                            updated_at: Date | string | number
                        }
                    }
                }
            }
            export namespace Get {
                export namespace Private {
                    export namespace ProfileById {
                        export type AsTenantAdmin = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/full'
                            }
                            response: {
                                tenant_id: string,
                                name: string,
                                description: string,
                                primary_address_id: string | null
                                address_ids: Array<string> | null
                                primary_contact_id: string | null
                                contact_ids: Array<string> | null
                                business_profile_id: string | null
                                profile_photo: string | null
                                cover_photo: string | null
                                created_at: Date | string | number,
                                updated_at: Date | string | number
                            }
                        }
                        export type AsTenantUser = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/limited'
                            }
                            response: {
                                tenant_id: string,
                                name: string,
                                description: string,
                                profile_photo: string | null
                                cover_photo: string | null
                            }
                        }
                    }
                    
                }
            }
            export namespace Update {
                export namespace Private {
                    export type BasicProfile = {
                        request: {
                            path: '/:tenantId/identity-authority/tenant/profile/update',
                            data: {
                                name: string
                                description: string
                            }
                        }
                        response: {
                            tenant_id: string,
                            name: string,
                            description: string,
                            created_at: Date | string | number,
                            updated_at: Date | string | number
                        }
                    }
                    export namespace Address {
                        export type SetPrimaryAddress = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/address/primary',
                                data: {
                                    address_id: string
                                }
                            }
                            response: {}
                        }
                        export type AddAddress = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/address/add',
                                data: {
                                    address_id: string
                                }
                            }
                            response: {}
                        }
                        export type RemoveAddress = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/address/remove',
                                data: {
                                    address_id: string
                                }
                            }
                            response: {}
                        }
                    }
                    export namespace Contact {
                        export type SetPrimaryContact = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/contact/primary',
                                data: {
                                    contact_id: string
                                }
                            }
                            response: {}
                        }
                        export type AddContact = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/contact/add',
                                data: {
                                    contact_id: string
                                }
                            }
                            response: {}
                        }
                        export type RemoveContact = {
                            request: {
                                path: '/:tenantId/identity-authority/tenant/profile/contact/remove',
                                data: {
                                    contact_id: string
                                }
                            }
                            response: {}
                        }
                    }
                }
            }
        }
    }

}
