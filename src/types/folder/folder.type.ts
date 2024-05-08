import {ProjectType} from "../project/projet.type.ts";

export type FolderType = {
    id: string;
    name: string;
    agency_id: string;
    parent_folder_id: string | null;
    children: FolderType[];
    projects: ProjectType[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};
