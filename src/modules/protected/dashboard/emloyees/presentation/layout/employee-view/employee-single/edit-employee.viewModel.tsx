import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";
import {assignJobEmployeeData} from "../../../../../../../../repository/jobs/add-job-employee.data.ts";

export const EditEmployeeViewModel = ({ employee }: { employee: EmployeeDto }) => {
    const editEmployeeRole = async (jobId: string | null) => {
        if (!jobId) return;
        console.log(jobId)
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