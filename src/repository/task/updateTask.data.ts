import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {TaskType} from "../../types/task/task.type.ts";
import {toast} from "react-toastify";

export const updateTaskData = async (task: TaskType, id: string) => {
    try {
        console.log(task)
        await fetch(ApiUrl.Task.Update + "/" + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
            body: JSON.stringify(task),
        })
        toast('✅ Task updated successfully')
    } catch (error) {
        toast('❌ An error occurred while updating the task')
        console.error(error)
    }
}