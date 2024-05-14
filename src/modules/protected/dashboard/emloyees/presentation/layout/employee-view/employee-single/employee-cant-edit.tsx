import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../../../../../../ui/components/select.tsx";
import {EmployeeDto} from "../../../../domain/dto/employee.dto.ts";

export const EmployeeCantEdit = ({employee}: { employee: EmployeeDto }) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={employee.role} />
            </SelectTrigger>
            <SelectContent aria-disabled={true} id={"role"}>
                <SelectItem defaultChecked={true} key={employee.role} value={employee.role}>{employee.role}</SelectItem>
            </SelectContent>
        </Select>
    );
}