import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SignUpDto} from "../../../domain/dto/Signup.dto.ts";
import {handleSignup} from "../../../domain/use-case/handleSignup.usecase.ts";

export const useSignUpViewModel = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')

    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [agencyName, setAgencyName] = useState('');
    const [isAvatar, setIsAvatar] = useState<string | undefined>()

    const emailRef = useRef<HTMLInputElement>(null);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const imageInputRef = React.useRef<HTMLInputElement>(null);


    const handleGoesForward = () => {
        if (
            !email ||
            !firstname ||
            !lastname ||
            !password ||
            !passwordConfirm
        ) {
            setErrorMessage('Please fill all fields !');
            return;
        }
        setErrorMessage('');
        setStep(step + 1);
    };

    const typePasswordConfirmInput = () => {
        if (password !== passwordConfirm) {
            setErrorMessage('Passwords must match !');
            return;
        }
    }
    const typePasswordInput = () => {
        if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)) {
            setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.')
            return;
        } else {
            setErrorMessage('')
        }
    }

    useEffect(() => {
        handleFillPassword();
        typePasswordInput()
        typePasswordConfirmInput()
    }, [password, passwordConfirm]);
    const handleFillPassword = () => {
        if ((!password || !passwordConfirm) || password !== passwordConfirm) {
            // setErrorMessage('Passwords must match !')
            return;
        } else {
            setErrorMessage('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (step == 1) return;
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGoesForward();
        }
    };

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitting form');
        if (
            !houseNumber ||
            !street ||
            !city ||
            !zipCode ||
            !country ||
            !agencyName
        ) {
            return setErrorMessage('Please fill all fields !');
        }
        const data: SignUpDto = {
            email,
            name: agencyName,
            password,
            passwordConfirm,
            house_number: Number(houseNumber),
            street,
            city,
            zip_code: Number(zipCode),
            country,
            firstname,
            lastname,
            avatar: isAvatar ? isAvatar as string : null,
        };
        console.log(isAvatar);
        const submitedForm = await handleSignup(data);
        if (!submitedForm) {
            return console.error('Form not submitted');
        }
        navigate('/dashboard');
    };

    return {
        handleSubmitForm,
        step,
        setStep,
        handleGoesForward,
        emailRef,
        firstnameRef,
        lastnameRef,
        passwordRef,
        passwordConfirmRef,
        errorMessage,
        setEmail,
        setFirstname,
        setLastname,
        setPassword,
        setPasswordConfirm,
        setHouseNumber,
        setStreet,
        setCity,
        setZipCode,
        setCountry,
        setAgencyName,
        email,
        firstname,
        lastname,
        password,
        passwordConfirm,
        houseNumber,
        street,
        city,
        zipCode,
        country,
        agencyName,
        handleKeyDown,
        imageInputRef,
        isAvatar,
        setIsAvatar,
        typePasswordInput,
        typePasswordConfirmInput,
    };
};
