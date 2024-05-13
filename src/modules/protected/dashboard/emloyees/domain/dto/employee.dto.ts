export type EmployeeDto = {
    email: string;
    firstname: string;
    lastname: string;
    profile_picture_url?: string | null;
    roles?: string[];
}