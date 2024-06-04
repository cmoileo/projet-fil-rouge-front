import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const editJobData = async (id: string, name: string, color: string) => {
    try {
        await fetch(`${ApiUrl.Jobs.Update}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie("token")
            },
            body: JSON.stringify({
                id: id,
                name: name,
                color: color
            })
        });
        toast('✅ Job updated successfully')
    } catch (error) {
        toast('❌ An error occurred while updating the job')
        console.error(error);
    }
}