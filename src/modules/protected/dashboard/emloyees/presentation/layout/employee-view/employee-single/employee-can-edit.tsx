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
import {EditEmployeeViewModel} from "./edit-employee.viewModel.tsx";

export const EmployeeCanEdit = ({employee}: { employee: EmployeeDto }) => {
    const {jobs} = useContext(DashboardContext)
    const {editEmployeeRole, editEmployeeJob} = EditEmployeeViewModel({employee});
    return (
        <div className={"flex flex-col gap-400"}>
            <Select onValueChange={(value: RolesEnum) => {
                console.log(value, employee.id)
                editEmployeeRole(
                    value,
                    employee.id
                );
            }}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={employee.role} />
                </SelectTrigger>
                <SelectContent id={"role"} defaultValue={employee.role}>
                    <SelectItem defaultChecked={employee.role == RolesEnum.EMPLOYEE} key={RolesEnum.EMPLOYEE} value={RolesEnum.EMPLOYEE}>Employee</SelectItem>
                    <SelectItem defaultChecked={employee.role == RolesEnum.ADMIN} key={RolesEnum.ADMIN} value={RolesEnum.ADMIN}>Admin</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => {
                editEmployeeJob(
                    jobs.find(job => job.name === employee.job?.name)?.id,
                    jobs.find(job => job.name === value)?.id,
                );
            }}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={employee.job?.name} />
                </SelectTrigger>
                <SelectContent id={"job"} defaultValue={employee.job?.name}>
                    {
                        jobs && jobs.map((job: JobDto) => {
                            return (
                                <SelectItem defaultChecked={employee.job?.name === job.name} key={job.id} value={job.name}>{job.name}</SelectItem>
                            );
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    );
}