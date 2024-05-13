import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {EmployeeDto} from "../../modules/protected/dashboard/emloyees/domain/dto/employee.dto.ts";

export const getEmployeeData = async (): Promise<EmployeeDto[] | null> => {
    try {
        const res = await fetch(`${ApiUrl.Auth.GetEmployee}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie()}`,
            },
        });
        const json = await res.json();
        if (!json) return null
        const employees: EmployeeDto[] = json;
        return employees;
    } catch (error) {
        console.error(error);
        return null
    }
}