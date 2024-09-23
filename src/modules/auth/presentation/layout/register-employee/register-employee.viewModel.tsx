import {useNavigate, useParams} from "react-router-dom";
import {RegisterEmployeeDto} from "../../../domain/dto/RegisterEmployee.dto.ts";
import {registerEmployeeData} from "../../../../../repository/employee/register-employee.data.ts";
import {cookieManager} from "../../../../../services/coockies/CoockieManager.service.ts";
import {FormEvent} from "react";
import {toBase64} from "../../../../../services/toBas64.service.ts";

export const useRegisterEmployee = () => {
    const params = useParams().id;
    const navigate = useNavigate();
    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!params) return console.error('No params')
        const target = e.target as HTMLFormElement;

        const data: RegisterEmployeeDto = {
            email: target.email.value,
            password: target.password.value,
            passwordConfirm: target.passwordConfirm.value,
            firstname: target.firstname.value,
            lastname: target.lastname.value,
            avatar: target.avatar.files[0] ? await toBase64(target.avatar.files[0]) as string : null,
        }

        const registeredEmployee: {token: string; role: string; userId: string} | boolean = await registerEmployeeData(data, params)
        if (registeredEmployee) {
            console.log(registeredEmployee)
            cookieManager.setCookie(registeredEmployee.token, "token", 30)
            cookieManager.setCookie(registeredEmployee.role, "role", 30)
            cookieManager.setCookie(registeredEmployee.userId, "userId", 30)
            navigate('/dashboard')
        }
    }
    return {
        handleSubmitForm,
    }
}