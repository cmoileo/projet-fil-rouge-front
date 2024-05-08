import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl"
export const getFolders = async () => {
    const token = cookieManager.getCookie();
    try {
        const res = await fetch(ApiUrl.Folder.Get, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}