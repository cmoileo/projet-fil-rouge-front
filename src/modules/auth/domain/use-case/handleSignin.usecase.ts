import {ApiUrl} from "../../../../const/ApiUrl.ts";
import {SignInDto} from "../dto/Signin.dto.ts";
import {cookieManager} from "../../../../services/coockies/CoockieManager.service.ts";

export const handleSignin = async (data: SignInDto) => {
    try {
        const res = await fetch(ApiUrl.Auth.Signin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const json = await res.json()
        const token = json.token
        if (!token) {
            throw new Error('Token not found')
        }
        cookieManager.setCookie(token)
        return true
    } catch (err) {
        console.error(err)
    }
}