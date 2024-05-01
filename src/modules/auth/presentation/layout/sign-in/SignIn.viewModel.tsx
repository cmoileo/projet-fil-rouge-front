import {FormEvent} from "react";
import {SignInDto} from "../../../domain/dto/Signin.dto.ts";

const useSignInViewModel = () => {
    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const data: SignInDto = {
            email: target.email.value,
            password: target.password.value
        }
        console.log(data)
    }

    return {
        handleSignIn
    }
}

export default useSignInViewModel