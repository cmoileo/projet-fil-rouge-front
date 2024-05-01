import {FormEvent} from "react";
import {SignUpDto} from "../../../domain/dto/Signup.dto.ts";
import {useNavigate} from "react-router-dom";
import {handleSignup} from "../../../domain/use-case/handleSignup.service.ts";

export const useSignUpViewModel = () => {
    const navigate = useNavigate()
    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data: SignUpDto = {
            email: form.email.value,
            name: form.agencyName.value,
            password: form.password.value,
            passwordConfirm: form.passwordConfirm.value,
            house_number: Number(form.house_number.value),
            street: form.street.value,
            city: form.city.value,
            zip_code: Number(form.zip_code.value),
            country: form.country.value,
            plan: form.plan.value,
            firstname: form.firstname.value,
            lastname: form.lastname.value,
        }
        const submitedForm = await handleSignup(data)
        if (!submitedForm) {
            return console.error('Form not submited')
        }
        navigate('/dashboard')
    }

    return {
        handleSubmitForm
    }
}
