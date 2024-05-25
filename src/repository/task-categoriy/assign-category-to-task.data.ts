import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const assignCategoryToTaskData = async({
    task_id,
    task_category_id
}: {
    task_id: string,
    task_category_id: string
}) => {
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
    } catch (error) {
        console.log(error)
    }
}