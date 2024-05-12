import {addEmployeeData} from "../../../../../../../repository/employee/add-employee.data.ts";
import {FormEvent} from "react";
import {AddEmployeeDto} from "../../../domain/dto/add-employee.dto.ts";

export const AddEmployeeViewModel = () => {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        if (!target) return;
        const data: AddEmployeeDto = {
            email: target.email.value,
            role: target.employeeRole.value.length > 1 ? target.employeeRole.value : undefined
        }
        const res = await addEmployeeData(data);
        console.log(res)
    }
    return {
        handleSubmit
    }
}