import {RemoveJobEmployeeDto} from "../../modules/protected/dashboard/emloyees/domain/dto/remove-job-employee.dto.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {toast} from "react-toastify";

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
        toast('✅ Employee assigned to job successfully')
    } catch (err) {
        toast('❌ An error occurred while assigning the employee to the job')
        console.error(err);
    }
}