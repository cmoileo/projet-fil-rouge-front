import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const editFolderData = async(
    {
        id,
        name,
        parent_folder_id
    }: {
        id: string,
        name: string,
        parent_folder_id: string | null
    }) => {
    try {
        await fetch(ApiUrl.Folder.Update, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie("token")}`
            },
            body: JSON.stringify({
                id: id,
                name: name,
                parent_folder_id: parent_folder_id
            })
        })
    } catch (error) {
        console.error(error)
    }
}