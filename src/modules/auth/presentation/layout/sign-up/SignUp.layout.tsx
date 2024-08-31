import {useSignUpViewModel} from "./SignUp.viewModel.tsx";
import {Input} from "../../../../../ui/components/input.tsx";
import {MainButton} from "../../../../../ui/components/mainButton.tsx";
import {SecondaryButton} from "../../../../../ui/components/secondaryButton.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "../../../../../ui/components/select.tsx";
import Countries from "./countries.json"

const SignUpLayout = () => {
    const { handleSubmitForm, step, setStep, handleGoesForward, errorMessage, email, setEmail, firstname, setFirstname, lastname, setLastname, password, setPassword, passwordConfirm, setPasswordConfirm, houseNumber, setHouseNumber, street, setStreet, city, setCity, zipCode, setZipCode, country, setCountry, agencyName, setAgencyName, handleKeyDown } = useSignUpViewModel();

    return (
        <form autoComplete="on" onKeyDown={handleKeyDown} className={"flex flex-col gap-500 w-1/3 mx-auto mt-44"} action=""
              onSubmit={handleSubmitForm}>
            {
                step === 0 && (
                    <div className={"flex-col flex gap-300"}>
                        <label className={"p-m grey-100"} htmlFor="Email">Email*</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete={"email"} name={"email"} type={"email"} placeholder={"Enter your email address"} required />
                        <label className={"p-m grey-100"} htmlFor="firstname">Firstname*</label>
                        <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} autoComplete={"given-name"} name={"firstname"} type={"text"} placeholder={"Enter your firstname"} required />
                        <label className={"p-m grey-100"} htmlFor="lastname">Lastname*</label>
                        <Input value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete={'family-name'} name={"lastname"} type={"text"} placeholder={"Enter your lastname"} required />
                        <label className={"p-m grey-100"} htmlFor="password">Password*</label>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} name={"password"} type={"password"} placeholder={"Enter your password"} required />
                        <label className={"p-m grey-100"} htmlFor="passwordConfirm">Confirm Password*</label>
                        <Input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} name={"passwordConfirm"} type={"password"} placeholder={"Confirm your password"} required />
                    </div>
                )
            }
            {
                step === 1 && (
                    <div className={"flex-col flex gap-300"}>
                        <label className={"p-m grey-100"} htmlFor="house_number">House Number*</label>
                        <Input value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} autoComplete={"shipping cc-number"} name={"house_number"} type={"number"} placeholder={"Enter your house number"} required />
                        <label className={"p-m grey-100"} htmlFor="street">Street*</label>
                        <Input value={street} onChange={(e) => setStreet(e.target.value)} autoComplete={"street-address"} name={"street"} type={"text"} placeholder={"Enter your street"} required />
                        <label className={"p-m grey-100"} htmlFor="city">City*</label>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} autoComplete={"street-address"} name={"city"} type={"text"} placeholder={"Enter your city"} required />
                        <label className={"p-m grey-100"} htmlFor="zip_code">Zip Code*</label>
                        <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} autoComplete={'postal-code'} name={"zip_code"} type={"number"} placeholder={"Enter your zip code"} required />
                        <label className={"p-m grey-100"} htmlFor="country">Country*</label>
                        <Select value={country} onValueChange={(value) => setCountry(value)}>
                            <SelectTrigger>
                                <p className="p-m grey-700">{country || "Select your country"}</p>
                            </SelectTrigger>
                            <SelectContent>
                                {Countries.map((country) => (
                                    <SelectItem key={country} value={country}>{country}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <label className={"p-m grey-100"} htmlFor="agencyName">Agency Name*</label>
                        <Input value={agencyName} onChange={(e) => setAgencyName(e.target.value)} name={"agencyName"} type={"text"} placeholder={"Enter your agency name"} required />
                    </div>
                )
            }
            <p className={"p-m danger margin-300-top"}>{errorMessage}</p>
            <div className={"flex gap-400 margin-400-top"}>
                {
                    step === 1 && (
                        <SecondaryButton className={"w-1/2 mx-auto"} onClick={() => setStep(0)}>Back</SecondaryButton>
                    )
                }
                {
                    step === 0 ? (
                        <MainButton className={"w-1/2 mx-auto p-l"} onClick={handleGoesForward}>Next</MainButton>
                    ) : (
                        <MainButton className={"w-1/2 mx-auto"} type={"submit"}>Signup</MainButton>
                    )
                }
            </div>
        </form>
    );
}

export default SignUpLayout;
