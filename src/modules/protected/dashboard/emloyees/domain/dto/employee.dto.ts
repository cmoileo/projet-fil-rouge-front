import {RolesEnum} from "../../../../../../const/roles.enum.ts";
import {JobDto} from "./job.dto.ts";
import {TaskType} from "../../../../../../types/task/task.type.ts";

export type EmployeeDto = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    profile_picture_url?: string | null;
    role: RolesEnum;
    job: JobDto | null;
    employe?: EmployeeDto;
    occupationPt: string;
    assigned_tasks: AssignTask[];
}

type AssignTask = {
    id: string;
    title: string;
    description: string;
    finishing_date: Date;
    task: TaskType;
}