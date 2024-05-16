import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const deleteFolderData = async (folderId: string) => {
    try {
        await fetch(`${ApiUrl.Folder.Delete}/${folderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${cookieManager.getCookie("token")}`
            },
        });
    } catch (error) {
        console.log(error)
    }
}