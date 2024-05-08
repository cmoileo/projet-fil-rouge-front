import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl"
import {FolderType} from "../../types/folder/folder.type.ts";
import {getSortedFolders} from "../../modules/protected/dashboard/domain/use-case/sort-folders.usecase.ts";
export const getFolders = async (): Promise<FolderType[] | undefined> => {
    const token = cookieManager.getCookie();
    try {
        const res = await fetch(ApiUrl.Folder.Get, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        const sortedData = getSortedFolders(data)
        console.log(sortedData)
        return data;
    } catch (error) {
        console.log(error);
    }
}