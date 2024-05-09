import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";

export const changeProjectParentFolderData = async (projectId: string, folderId: string, name: string) => {
    try {
        const res = await fetch(`${ApiUrl.Projects.Update}/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie()
            },
            body: JSON.stringify({
                "name": name,
                "folder_id": folderId,
            })
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new Error('Error changing project parent folder')
    }
}