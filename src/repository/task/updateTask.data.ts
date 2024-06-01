import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {TaskType} from "../../types/task/task.type.ts";

export const updateTaskData = async (task: TaskType, id: string) => {
    try {
        const res = await fetch(ApiUrl.Task.Update + "/" + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
            body: JSON.stringify(task),
        })
        return await res.json();
    } catch (error) {
        console.error(error)
    }
}