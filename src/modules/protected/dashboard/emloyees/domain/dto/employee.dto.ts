import {RolesEnum} from "../../../../../../const/roles.enum.ts";
import {JobDto} from "./job.dto.ts";

export type EmployeeDto = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    profile_picture_url?: string | null;
    role: RolesEnum;
    job: JobDto | null;
}