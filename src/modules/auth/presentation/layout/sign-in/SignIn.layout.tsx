import useSignInViewModel from "./SignIn.viewModel.tsx";
import {Input} from "../../../../../ui/components/input.tsx";
import {MainButton} from "../../../../../ui/components/mainButton.tsx";

const SignInLayout = () => {
    const {handleSignIn} = useSignInViewModel();
    return (
        <form className={"flex flex-col gap-700 w-96 mx-auto mt-44"} action="submit" onSubmit={handleSignIn}>
            <div className={"flex flex-col gap-300"}>
                <label className={"p-m grey-100"} htmlFor="Email">Email*</label>
                <Input autoComplete={"email"} name={"email"} type={"email"} placeholder={"Enter your email address"}
                       required/>
                <label className={"p-m grey-100"} htmlFor="password">Password*</label>
                <Input name={"password"} type={"password"} placeholder={"Enter your password"} required/>
            </div>
            <MainButton className={"w-1/2"} type={"submit"}>Signin</MainButton>
        </form>
    );
}

export default SignInLayout;