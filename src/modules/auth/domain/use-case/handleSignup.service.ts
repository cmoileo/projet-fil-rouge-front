import {ApiUrl} from "../../../../const/ApiUrl.ts";
import {cookieManager} from "../../../../services/coockies/CoockieManager.service.ts";
import {SignUpDto} from "../dto/Signup.dto.ts";

export const handleSignup = async (data: SignUpDto) => {
    try {
        const res = await fetch (ApiUrl.Auth.Signup, {
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