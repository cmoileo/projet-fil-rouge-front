import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const getTaskCategoriesData = async() => {
    try {
        const res = await fetch('http://localhost:3000/task-categories', {
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