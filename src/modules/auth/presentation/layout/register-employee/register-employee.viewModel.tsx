import {useParams} from "react-router-dom";

export const useRegisterEmployee = () => {
    const params = useParams().id;
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted', params);
    }
    return {
        handleSubmitForm,
    }
}