import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const deleteTaskData = async(id: string) => {
    try {
        await fetch(ApiUrl.Task.Delete + "/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie('token')}`,
            },
        })
        toast('✅ Task deleted successfully')
    } catch (error) {
        toast('❌ An error occurred while deleting the task')
        console.log(error)
    }
}