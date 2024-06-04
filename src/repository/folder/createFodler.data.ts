import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {toast} from "react-toastify";

export const createFolderData = async (folderName: string, parentFolderId: string | null): Promise<void> => {
    try {
        const data = {
            name: folderName,
            parent_folder_id: parentFolderId
        }
        await fetch(ApiUrl.Folder.Create, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookieManager.getCookie("token")
            },
            body: JSON.stringify(data)
        });
        toast("✅ Folder created successfully")
    } catch (error) {
        toast("❌ An error occurred while creating the folder")
        console.log(error)
    }
}