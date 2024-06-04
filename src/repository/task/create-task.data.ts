import {TaskType} from "../../types/task/task.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const createTaskData = async (data: TaskType) => {
    try {
        await fetch(ApiUrl.Task.Create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token')
            },
            body: JSON.stringify(data),
        })
        toast('✅ Task created successfully')
    } catch (error) {
        toast('❌ An error occurred while creating the task')
        console.log(error);
    }
}