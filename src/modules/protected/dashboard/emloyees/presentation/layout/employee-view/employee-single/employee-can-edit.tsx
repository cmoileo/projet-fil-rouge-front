import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../../../../../../ui/components/select.tsx";
import {RolesEnum} from "../../../../../../../../const/roles.enum.ts";

export const EmployeeCanEdit = ({employee}: { employee: EmployeeDto }) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={employee.role} />
            </SelectTrigger>
            <SelectContent id={"role"} defaultValue={employee.role}>
                <SelectItem defaultChecked={employee.role == RolesEnum.EMPLOYEE} key={RolesEnum.EMPLOYEE} value={RolesEnum.EMPLOYEE}>Employee</SelectItem>
                <SelectItem defaultChecked={employee.role == RolesEnum.ADMIN} key={RolesEnum.ADMIN} value={RolesEnum.ADMIN}>Admin</SelectItem>
            </SelectContent>
        </Select>
    );
}