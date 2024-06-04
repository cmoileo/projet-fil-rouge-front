import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const assignCategoryToTaskData = async(task_id: string, task_category_id: string) => {
    try {
        await fetch(ApiUrl.TaskCategory.Assign, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
            body: JSON.stringify({
                task_id: task_id,
                task_category_id: task_category_id
            }),
        })
        toast('✅ Task category assigned successfully')
    } catch (error) {
        toast('❌ An error occurred while assigning the task category')
        console.log(error)
    }
}