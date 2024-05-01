import {FormEvent} from "react";
import {SignUpDto} from "../../../domain/dto/Signup.dto.ts";
import { ApiUrl } from "../../../../../const/ApiUrl.ts";
import {CookieManager} from "../../../../../services/coockies/CoockieManager.service.ts";
import {useNavigate} from "react-router-dom";

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

        console.log(data)

        try {
            const res = await fetch (ApiUrl.Auth.Signup, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            const token = json.token
            if (!token) {
                throw new Error('Token not found')
            }
            new CookieManager().setCookie("token", token)
            return navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    return {
        handleSubmitForm
    }
}
