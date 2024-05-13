import {Input} from "../../../../../ui/components/input.tsx";
import {useRegisterEmployee} from "./register-employee.viewModel.tsx";
import {MainButton} from "../../../../../ui/components/mainButton.tsx";

export const RegisterEmployeeLayout = () => {
    const {handleSubmitForm} = useRegisterEmployee();

    return (
        <form autoComplete="on" className={"flex flex-col gap-700 w-fit mx-auto mt-44"} onSubmit={handleSubmitForm}>
            <div className="w-96 flex flex-col gap-500">
                <div className="flex flex-col gap-300">
                    <label className={"p-m"} htmlFor="Email">Email*</label>
                    <Input autoComplete={"email"} name={"email"} type={"email"} placeholder={"Enter your email address"}
                           required/>
                </div>
                <div className="flex flex-col gap-300">
                    <label className={"p-m"} htmlFor="password">Password*</label>
                    <Input name={"password"} type={"password"} placeholder={"Enter your password"} required/>
                </div>
                <div className="flex flex-col gap-300">
                    <label className={"p-m"} htmlFor="passwordConfirm">Confirm Password*</label>
                    <Input name={"passwordConfirm"} type={"password"} placeholder={"Confirm your password"} required/>
                </div>
                <div className="flex flex-col gap-300">
                    <label className={"p-m"} htmlFor="firstname">Firstname*</label>
                    <Input autoComplete={"given-name"} name={"firstname"} type={"text"}
                       placeholder={"Enter your firstname"} required/>
                </div>
                <div className="flex flex-col gap-300">
                    <label className={"p-m"} htmlFor="lastname">Lastname*</label>
                    <Input autoComplete={'family-name'} name={"lastname"} type={"text"}
                           placeholder={"Enter your lastname"} required/>
                </div>
                <div className="flex flex-col gap-300">
                    <label className={"p-m"} htmlFor="profile picture">Profile picture</label>
                    <Input id={"profilePicture"} name={"profilePicture"} accept={"image/png, image/jpeg, image/jpg"} type={"file"} placeholder={"Profile picture"}/>
                </div>
            </div>
            <MainButton className={"w-1/2 mx-auto"} type={"submit"}>Signup</MainButton>
        </form>
    )
}