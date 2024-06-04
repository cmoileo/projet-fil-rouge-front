import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const deleteJobData = async (id: string): Promise<void> => {
    try {
        await fetch(`${ApiUrl.Jobs.Delete}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie("token")}`
            }
        })
        toast('✅ Job deleted successfully')
    } catch (error) {
        toast('❌ An error occurred while deleting the job')
        console.log(error)
    }
}