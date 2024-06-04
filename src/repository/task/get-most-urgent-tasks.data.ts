import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const getMostUrgentTasks = async () => {
    try {
        const res = await fetch(ApiUrl.Task.GetMostUrgent, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie('token')}`
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
    } catch (error) {
        console.log(error)
    }
}