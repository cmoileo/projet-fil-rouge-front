import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";

export const EditEmployeeViewModel = ({ employee }: { employee: EmployeeDto }) => {
    const editEmployeeRole = async (role: string) => {

    }

    const editEmployeeJob = async (job: string) => {

    }

    return {
        editEmployeeRole,
        editEmployeeJob
    }
}