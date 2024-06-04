import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const deleteTaskCategoryData = async (task_id: string) => {
    try {
        const res = await fetch(ApiUrl.TaskCategory.Delete + "/" + task_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
        })
        toast('✅ Task category deleted successfully')
        return await res.json();
    } catch (error) {
        toast('❌ An error occurred while deleting the task category')
        console.log(error);
        return error;
    }
}