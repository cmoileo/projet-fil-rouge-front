import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";
import {assignJobEmployeeData} from "../../../../../../../../repository/jobs/add-job-employee.data.ts";
import {assignRoleData} from "../../../../../../../../repository/jobs/assign-role.data.ts";
import {RolesEnum} from "../../../../../../../../const/roles.enum.ts";

export const EditEmployeeViewModel = ({ employee }: { employee: EmployeeDto }) => {
    const editEmployeeRole = async (role: RolesEnum, user_id: string) => {
        if (!role) return;
        const data = {
            role: role,
            user_id: user_id
        }
        await assignRoleData(data)
    }

    const editEmployeeJob = async (curentJobId: string | undefined, newJobId: string | undefined) => {
        if (!newJobId) return;
        if (newJobId === curentJobId) return;
        const data = {
            user_id: employee.id,
            job_id: newJobId
        }
        await assignJobEmployeeData(data)
    }

    return {
        editEmployeeRole,
        editEmployeeJob
    }
}