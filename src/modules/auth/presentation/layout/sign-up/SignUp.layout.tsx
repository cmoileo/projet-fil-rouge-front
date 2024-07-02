import {useSignUpViewModel} from "./SignUp.viewModel.tsx";
import {Input} from "../../../../../ui/components/input.tsx";
import {MainButton} from "../../../../../ui/components/mainButton.tsx";

const SignUpLayout = () => {
    const { handleSubmitForm } = useSignUpViewModel();
    return (
        <form autoComplete="on" className={"flex flex-col gap-500 w-fit mx-auto mt-44"} action=""
              onSubmit={handleSubmitForm}>
            <label className={"p-m grey-100"} htmlFor="Email">Email*</label>
            <Input autoComplete={"email"} name={"email"} type={"email"} placeholder={"Enter your email address"}
                   required/>
            <div className={"flex gap-500"}>
                <div className={"flex-col flex gap-300 w-96"}>
                    <label className={"p-m grey-100"} htmlFor="agencyName">Agency Name*</label>
                    <Input name={"agencyName"} type={"text"} placeholder={"Enter your agency name"} required/>
                    <label className={"p-m grey-100"} htmlFor="password">Password*</label>
                    <Input name={"password"} type={"password"} placeholder={"Enter your password"} required/>
                    <label className={"p-m grey-100"} htmlFor="passwordConfirm">Confirm Password*</label>
                    <Input name={"passwordConfirm"} type={"password"} placeholder={"Confirm your password"} required/>
                    <label className={"p-m grey-100"} htmlFor="house_number">House Number*</label>
                    <Input autoComplete={"shipping cc-number"} name={"house_number"} type={"number"}
                           placeholder={"Enter your house number"} required/>
                    <label className={"p-m grey-100"} htmlFor="firstname">Firstname*</label>
                    <Input autoComplete={"given-name"} name={"firstname"} type={"text"}
                           placeholder={"Enter your firstname"} required/>
                </div>
                <div className={"flex-col flex gap-300 w-96"}>
                    <label className={"p-m grey-100"} htmlFor="street">Street*</label>
                    <Input autoComplete={"street-address"} name={"street"} type={"text"}
                           placeholder={"Enter your street"} required/>
                    <label className={"p-m grey-100"} htmlFor="city">City*</label>
                    <Input autoComplete={"street-address"} name={"city"} type={"text"} placeholder={"Enter your city"}
                           required/>
                    <label className={"p-m grey-100"} htmlFor="zip_code">Zip Code*</label>
                    <Input autoComplete={'postal-code'} name={"zip_code"} type={"number"}
                           placeholder={"Enter your zip code"} required/>
                    <label className={"p-m grey-100"} htmlFor="country">Country*</label>
                    <Input autoComplete={"country"} name={"country"} type={"text"} placeholder={"Enter your country"}
                           required/>
                    <label className={"p-m grey-100"} htmlFor="lastname">Lastname*</label>
                    <Input autoComplete={'family-name'} name={"lastname"} type={"text"}
                           placeholder={"Enter your lastname"} required/>
                </div>
            </div>
            <MainButton className={"w-1/2 mx-auto"} type={"submit"}>Signup</MainButton>
        </form>
    );
}

export default SignUpLayout;