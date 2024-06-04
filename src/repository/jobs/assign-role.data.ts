import {RolesEnum} from "../../const/roles.enum.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const assignRoleData = async (data: {user_id: string; role: RolesEnum;}) => {
    try {
        await fetch(ApiUrl.Roles.Assign, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token')
            },
            body: JSON.stringify(data),
        });
        toast('✅ Role assigned successfully')
    } catch (error) {
        toast('❌ An error occurred while assigning the role')
        console.log(error);
    }
}