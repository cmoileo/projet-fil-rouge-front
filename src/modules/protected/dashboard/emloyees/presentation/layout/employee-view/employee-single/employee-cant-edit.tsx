import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";
import {DashboardContext} from "../../../../../../../../contexts/dashboard.context.tsx";
import {useContext} from "react";

export const EmployeeCantEdit = ({employee}: { employee: EmployeeDto }) => {
    const {jobs} = useContext(DashboardContext);
    const jobColor = jobs.find(job => job.name === employee.job?.name)?.color || "white";
    return (
        <div className={"flex flex-col gap-300 w-full"}>
            <p className={"p-m text-center"}>{employee.role}</p>
            <p style={{backgroundColor: jobColor}} className="p-s text-center border-radius-1000 w-full white">
                {employee.job?.name}
            </p>
        </div>
    );
}