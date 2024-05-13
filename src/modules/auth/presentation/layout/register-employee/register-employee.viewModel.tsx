import {useParams} from "react-router-dom";

export const useRegisterEmployee = () => {
    const params = useParams().id;
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            passwordConfirm: formData.get('passwordConfirm'),
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
        }
        console.log('Form submitted', params, data);
    }
    return {
        handleSubmitForm,
    }
}