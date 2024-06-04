import {TaskCategoryType} from "../../types/task-categories/task-category.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const createTaskCategoryData = async (body: TaskCategoryType) => {
    try {
        const res = await fetch(ApiUrl.TaskCategory.Create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
            body: JSON.stringify(body),
        });
        toast('✅ Task category created successfully')
        return await res.json();
    } catch (error) {
        toast('❌ An error occurred while creating the task category')
        console.error(error)
    }
}