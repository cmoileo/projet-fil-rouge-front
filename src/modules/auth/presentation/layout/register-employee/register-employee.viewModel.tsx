import {useNavigate, useParams} from "react-router-dom";
import {RegisterEmployeeDto} from "../../../domain/dto/RegisterEmployee.dto.ts";
import {registerEmployeeData} from "../../../../../repository/employee/register-employee.data.ts";
import {cookieManager} from "../../../../../services/coockies/CoockieManager.service.ts";

export const useRegisterEmployee = () => {
    const params = useParams().id;
    const navigate = useNavigate();
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (formData.get('password') !== formData.get('passwordConfirm') || !formData.get('password') || !formData.get('passwordConfirm') || !formData.get('email')
            || !formData.get('firstname') || !formData.get('lastname') || !params) return;
        const data: RegisterEmployeeDto = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            passwordConfirm: formData.get('passwordConfirm') as string,
            firstname: formData.get('firstname') as string,
            lastname: formData.get('lastname') as string,
        }
        const registeredEmployee: string | boolean = await registerEmployeeData(data, params)
        if (registeredEmployee) {
            cookieManager.setCookie(registeredEmployee)
            navigate('/dashboard')
        }
    }
    return {
        handleSubmitForm,
    }
}