import {RolesEnum} from "../../../../../../const/roles.enum.ts";

export type EmployeeDto = {
    email: string;
    firstname: string;
    lastname: string;
    profile_picture_url?: string | null;
    role: RolesEnum;
    job: string;
}