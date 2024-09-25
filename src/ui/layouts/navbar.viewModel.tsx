import {createFolderData} from "../../repository/folder/createFodler.data.ts";
import {FolderType} from "../../types/folder/folder.type.ts";
import {getFolders} from "../../repository/folder/getAll.data.ts";
import React from "react";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const useNavLayout = (
    {
        setFolders
    }: {
        setFolders: React.Dispatch<React.SetStateAction<FolderType[]>>
    }) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);

    const handleLogout = () => {
        cookieManager.deleteCookie("token");
        window.location.href = "/onboarding";
    }
    const handleCreateFolder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPopoverOpen(false)
        const formTarget = e.target as HTMLFormElement;
        await createFolderData(formTarget.folderTitle.value, null);
        const updatedFolders = await getFolders();
        if (!setFolders || !updatedFolders) return console.error("Error creating folder");
        setFolders(updatedFolders);
    }
    return {
        handleCreateFolder,
        isPopoverOpen,
        setIsPopoverOpen,
        handleLogout
    }
}