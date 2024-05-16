import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const deleteProjectData = async (projectId: string): Promise<void> => {
    try {
        await fetch(ApiUrl.Projects.Delete + "/" + projectId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookieManager.getCookie("token")
            },
        });
    } catch (error) {
        console.log(error)
    }
}