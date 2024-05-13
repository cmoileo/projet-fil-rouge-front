import {useEffect, useState} from "react";
import {getEmployeeData} from "../../../../../../../repository/employee/get-employee.data.ts";
import {EmployeeDto} from "../../../domain/dto/employee.dto.ts";

export const useEmployeeView = () => {
    const [employees, setEmployees] = useState<EmployeeDto[] | null>(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            const employees: EmployeeDto[] | null = await getEmployeeData();
            if (!employees) return;
            setEmployees(employees);
        }
        fetchEmployee()
    }, []);
    return {
        employees,
    }
}