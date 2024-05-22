import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const deleteTaskCategoryData = async (task_id: string) => {
    try {
        const res = await fetch(ApiUrl.TaskCategory.Delete + task_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
        })
        return await res.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}