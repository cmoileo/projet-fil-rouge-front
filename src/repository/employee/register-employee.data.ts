import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {RegisterEmployeeDto} from "../../modules/auth/domain/dto/RegisterEmployee.dto.ts";

export const registerEmployeeData = async (data: RegisterEmployeeDto, id: string): Promise<{token: string; role: string} | false> => {
    try {
        const res = await fetch(`${ApiUrl.Auth.RegisterEmployee}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json) {
            const token = json.token;
            cookieManager.setCookie(token, 'token', 30);
            return json;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false
    }
}