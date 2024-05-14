import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";
import {DashboardContext} from "../../../../../../../../contexts/dashboard.context.tsx";
import {useContext} from "react";

export const EmployeeCantEdit = ({employee}: { employee: EmployeeDto }) => {
    const {jobs} = useContext(DashboardContext);
    const jobColor = jobs.find(job => job.name === employee.job)?.color;
    return (
        <div className={"flex flex-col gap-300"}>
            <p className={"p-m"}>{employee.role}</p>
            <p style={{backgroundColor: jobColor}} className="p-m">
                {employee.job}
            </p>
        </div>
    );
}