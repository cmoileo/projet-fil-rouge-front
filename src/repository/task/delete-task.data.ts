import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const deleteTaskData = async(id: string) => {
    try {
        await fetch(ApiUrl.Task.Delete + "/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie('token')}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}