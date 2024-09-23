import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";

export const getTaskCategoriesData = async() => {
    try {
        const res = await fetch(ApiUrl.TaskCategory.Get, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token'),
            },
        })
        return await res.json();
    } catch (error) {
        console.error(error)
    }
}