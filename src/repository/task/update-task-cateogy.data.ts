import {TaskCategoryType} from "../../types/task-categories/task-category.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const updateTaskCategoryData = async (body: TaskCategoryType) => {
    try {
        const res = await fetch(ApiUrl.TaskCategory.Update, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}