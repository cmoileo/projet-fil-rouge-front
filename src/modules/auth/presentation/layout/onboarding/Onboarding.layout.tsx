import {MainButton} from "../../../../../ui/components/mainButton.tsx";
import {SecondaryButton} from "../../../../../ui/components/secondaryButton.tsx";
import { useNavigate } from 'react-router-dom';

const OnboardingLayout = () => {
    const navigate = useNavigate();
    return (
        <section className={"m-auto w-fit mt-72 gap-500 flex"}>
            <MainButton onClick={() => {navigate("/login")}}>Login</MainButton>
            <SecondaryButton onClick={() => {navigate("/signup")}}>Register</SecondaryButton>
        </section>
    );
}

export default OnboardingLayout;