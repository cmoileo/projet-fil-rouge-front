import {addEmployeeData} from "../../../../../../../repository/employee/add-employee.data.ts";
import {FormEvent, useState} from "react";
import {AddEmployeeDto} from "../../../domain/dto/add-employee.dto.ts";

export const AddEmployeeViewModel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        if (!target) return;
        setIsOpen(false)
        const data: AddEmployeeDto = {
            email: target.email.value,
            role: target.employeeRole.value.length > 1 ? target.employeeRole.value : null
        }
        target.reset()
        await addEmployeeData(data);
    }

    return {
        handleSubmit,
        isOpen,
        setIsOpen,
    }
}