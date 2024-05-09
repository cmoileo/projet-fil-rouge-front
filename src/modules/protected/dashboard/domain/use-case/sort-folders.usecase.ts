import {FolderType} from "../../../../../types/folder/folder.type.ts";

export const getSortedFolders = (folders: FolderType[]): FolderType[] => {
    const foldersByParentId: Record<string, FolderType[]> = {};

    folders.forEach(folder => {
        const parentId = folder.parent_folder_id;

        if (!parentId) {
            if (!foldersByParentId['']) {
                foldersByParentId[''] = [];
            }
            foldersByParentId[''].push(folder);
        } else {
            if (!foldersByParentId[parentId]) {
                foldersByParentId[parentId] = [];
            }
            foldersByParentId[parentId].push(folder);
        }
    });

    const buildTree = (parentId: string): FolderType[] => {
        const foldersUnderParent = foldersByParentId[parentId] || [];
        foldersUnderParent.forEach(folder => {
            folder.children = buildTree(folder.id);
        });
        return foldersUnderParent;
    };
    return buildTree('');
};
