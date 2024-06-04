import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

export const deleteFolderData = async (folderId: string) => {
    try {
        await fetch(`${ApiUrl.Folder.Delete}/${folderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${cookieManager.getCookie("token")}`
            },
        });
        toast("✅ Folder deleted successfully")
    } catch (error) {
        toast("❌ An error occurred while deleting the folder")
        console.log(error)
    }
}