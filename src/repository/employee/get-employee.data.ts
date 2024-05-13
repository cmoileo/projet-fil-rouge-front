import {RegisterEmployeeDto} from "../../modules/auth/domain/dto/RegisterEmployee.dto.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const getEmployeeData = async (): Promise<RegisterEmployeeDto[] | null> => {
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
        const employee: RegisterEmployeeDto[] = json;
        return employee;
    } catch (error) {
        console.error(error);
        return null
    }
}