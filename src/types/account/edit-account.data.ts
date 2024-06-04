import {AccountType} from "./account.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

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
        toast('✅ Account updated successfully')
        return await res.json();
    } catch (error) {
        toast('❌ An error occurred while updating the account')
        console.log(error)
    }
}