import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {AddEmployeeDto} from "../../modules/protected/dashboard/emloyees/domain/dto/add-employee.dto.ts";

export const addEmployeeData = async (data: AddEmployeeDto) => {
    try {
        const res = await fetch(ApiUrl.Auth.AddEmployee, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie("token"),
            },
            body: JSON.stringify(data),
        })
    const json = await res.json();
    return json;
    } catch (error) {
        console.error(error);
    }
}