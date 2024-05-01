import {FormEvent} from "react";
import {SignUpDto} from "../../../domain/dto/Signup.dto.ts";

export const useSignUpViewModel = () => {
    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data: SignUpDto = {
            email: form.email.value,
            name: form.agencyName.value,
            password: form.password.value,
            passwordConfirm: form.passwordConfirm.value,
            house_number: form.house_number.value,
            street: form.street.value,
            city: form.city.value,
            zip_code: form.zip_code.value,
            country: form.country.value,
            plan: form.plan.value,
            firstname: form.firstname.value,
            lastname: form.lastname.value,
        }
        console.log(data)
    }

    return {
        handleSubmitForm
    }
}
