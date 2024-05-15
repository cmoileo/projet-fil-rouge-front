import {AccountType} from "./account.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const editAccountData = async (data: AccountType): Promise<AccountType | undefined> => {
    try {
        const res = await fetch(ApiUrl.Account.Update, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}