export type FolderType = {
    id: string;
    name: string;
    agency_id: string;
    parent_folder_id: string;
    children: FolderType[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};
