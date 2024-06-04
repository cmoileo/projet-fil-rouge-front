import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {AddEmployeeDto} from "../../modules/protected/dashboard/emloyees/domain/dto/add-employee.dto.ts";
import {toast} from "react-toastify";

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
        toast('✅ Employee added successfully')
    return json;
    } catch (error) {
        toast('❌ An error occurred while adding the employee')
        console.error(error);
    }
}