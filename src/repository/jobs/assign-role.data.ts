import {RolesEnum} from "../../const/roles.enum.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const assignRoleData = async (data: {user_id: string; role: RolesEnum;}) => {
    try {
        console.log(data)
        await fetch(ApiUrl.Roles.Assign, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token')
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
}