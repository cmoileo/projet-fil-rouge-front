import {TaskType} from "../task/task.type.ts";

export type ProjectType = {
    id?: string;
    name: string;
    description?: string;
    tasks?: TaskType[];
    folder_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};
