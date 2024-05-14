import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const deleteJobData = async (id: string): Promise<void> => {
    try {
        await fetch(`${ApiUrl.Jobs.Delete}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie()}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}