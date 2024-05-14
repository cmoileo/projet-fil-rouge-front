import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const editJobData = async (id: string, name: string, color: string) => {
    try {
        await fetch(`${ApiUrl.Jobs.Update}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie()
            },
            body: JSON.stringify({
                id: id,
                name: name,
                color: color
            })
        });
    } catch (error) {
        console.error(error);
    }
}