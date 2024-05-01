import {FormEvent} from "react";
import {SignInDto} from "../../../domain/dto/Signin.dto.ts";
import {handleSignin} from "../../../domain/use-case/handleSignin.usecase.ts";
import {useNavigate} from "react-router-dom";

const useSignInViewModel = () => {
    const navigate = useNavigate()
    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const data: SignInDto = {
            email: target.email.value,
            password: target.password.value
        }
        const submitedForm = await handleSignin(data)
        if (!submitedForm) {
            throw new Error('Form not submited')
        }
        navigate('/dashboard')
    }

    return {
        handleSignIn
    }
}

export default useSignInViewModel