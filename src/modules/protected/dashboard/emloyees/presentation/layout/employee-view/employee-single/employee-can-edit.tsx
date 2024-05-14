import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../../../../../../ui/components/select.tsx";
import {RolesEnum} from "../../../../../../../../const/roles.enum.ts";
import {useContext} from "react";
import {DashboardContext} from "../../../../../../../../contexts/dashboard.context.tsx";
import {JobDto} from "../../../../domain/dto/job.dto.ts";

export const EmployeeCanEdit = ({employee}: { employee: EmployeeDto }) => {
    const {jobs} = useContext(DashboardContext)
    return (
        <div className={"flex flex-col gap-400"}>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={employee.role} />
                </SelectTrigger>
                <SelectContent id={"role"} defaultValue={employee.role}>
                    <SelectItem defaultChecked={employee.role == RolesEnum.EMPLOYEE} key={RolesEnum.EMPLOYEE} value={RolesEnum.EMPLOYEE}>Employee</SelectItem>
                    <SelectItem defaultChecked={employee.role == RolesEnum.ADMIN} key={RolesEnum.ADMIN} value={RolesEnum.ADMIN}>Admin</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={employee.job} />
                </SelectTrigger>
                <SelectContent id={"job"} defaultValue={employee.job}>
                    {
                        jobs && jobs.map((job: JobDto) => {
                            return (
                                <SelectItem defaultChecked={employee.job == job.name} key={job.id} value={job.name}>{job.name}</SelectItem>
                            );
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    );
}