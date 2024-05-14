import {addEmployeeData} from "../../../../../../../repository/employee/add-employee.data.ts";
import {useContext, useState} from "react";
import {AddEmployeeDto} from "../../../domain/dto/add-employee.dto.ts";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";

export const AddEmployeeViewModel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {jobs} = useContext(DashboardContext)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const target = e.target as any
        if (!target) return;
        setIsOpen(false)
        const data: AddEmployeeDto = {
            email: target.email.value,
            role: target[2].value || undefined
        }
        target.reset()
        await addEmployeeData(data);
    }

    return {
        handleSubmit,
        isOpen,
        setIsOpen,
        jobs
    }
}