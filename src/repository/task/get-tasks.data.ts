import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {TaskType} from "../../types/task/task.type.ts";

export const getTasksData = async (): Promise<TaskType[] | undefined> => {
    try {
        const res = await fetch(ApiUrl.Task.Get, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}