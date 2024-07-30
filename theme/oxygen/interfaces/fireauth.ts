export type FireAuthSignInRespose = {
    user: {
        email: string 
        uid: string
    },
    _tokenResponse: {
        idToken: string
    }
}