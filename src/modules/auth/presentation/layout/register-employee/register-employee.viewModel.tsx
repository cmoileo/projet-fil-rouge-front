import {useNavigate, useParams} from "react-router-dom";
import {RegisterEmployeeDto} from "../../../domain/dto/RegisterEmployee.dto.ts";
import {registerEmployeeData} from "../../../../../repository/employee/register-employee.data.ts";
import {cookieManager} from "../../../../../services/coockies/CoockieManager.service.ts";
import {FormEvent} from "react";

export const useRegisterEmployee = () => {
    const params = useParams().id;
    const navigate = useNavigate();

    const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!params) return console.error('No params')
        const target = e.target as HTMLFormElement;
        console.log(target.password.value)
        const data: RegisterEmployeeDto = {
            email: target.email.value,
            password: target.password.value,
            passwordConfirm: target.passwordConfirm.value,
            firstname: target.firstname.value,
            lastname: target.lastname.value,
            avatar: target.avatar.files[0] ? await toBase64(target.avatar.files[0]) as string : null,
        }

        const registeredEmployee: {token: string; role: string} | boolean = await registerEmployeeData(data, params)
        if (registeredEmployee) {
            cookieManager.setCookie(registeredEmployee.token, "token", 30)
            cookieManager.setCookie(registeredEmployee.role, "role", 30)
            navigate('/dashboard')
        }
    }
    return {
        handleSubmitForm,
    }
}