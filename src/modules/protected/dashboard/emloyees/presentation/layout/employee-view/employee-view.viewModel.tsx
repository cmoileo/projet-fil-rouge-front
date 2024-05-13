import {useEffect, useState} from "react";
import {RegisterEmployeeDto} from "../../../../../../auth/domain/dto/RegisterEmployee.dto.ts";
import {getEmployeeData} from "../../../../../../../repository/employee/get-employee.data.ts";

export const useEmployeeView = () => {
    const [employee, setEmployee] = useState<RegisterEmployeeDto[] | null>(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            const employees = await getEmployeeData();
            if (!employees) return;
            setEmployee(employees);
        }
        fetchEmployee()
    }, []);
    return {
        employee,
    }
}