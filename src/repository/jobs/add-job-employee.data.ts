import {RemoveJobEmployeeDto} from "../../modules/protected/dashboard/emloyees/domain/dto/remove-job-employee.dto.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const assignJobEmployeeData = async (data: RemoveJobEmployeeDto) => {
    try {
        await fetch(ApiUrl.Jobs.AddEmployee, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookieManager.getCookie('token')
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.error(err);
    }
}