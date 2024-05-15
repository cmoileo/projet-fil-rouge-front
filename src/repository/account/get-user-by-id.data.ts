import {AccountType} from "../../types/account/account.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const getUserByIdData = async (): Promise<AccountType | undefined> => {
    try {
        const res = await fetch(ApiUrl.Account.GetByUserId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie('token')}`,
            },
        })
        return await res.json()
    } catch (error) {
     console.log(error)
    }
}