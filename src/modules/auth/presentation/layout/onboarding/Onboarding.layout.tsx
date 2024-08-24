import {MainButton} from "../../../../../ui/components/mainButton.tsx";
import {SecondaryButton} from "../../../../../ui/components/secondaryButton.tsx";
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import onBoardingImg from './onboarding-img.avif';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import appLogo from './app-logo.png';

const OnboardingLayout = () => {
    const navigate = useNavigate();
    return (
        <section className={"w-full h-screen items-center gap-900 flex"}>
            <img className={"w-1/2 h-full object-cover"} src={onBoardingImg} alt="Working employees around a table"/>
            <div className={"flex w-1/3 bg-grey-100 padding-800 border-radius-500 flex-col"}>
                <img src={appLogo} alt="App logo" className={"w-[70px] object-contain"}/>
                <p className={"h6 margin-300-top"}>Connect with your team</p>
                <p className="p-s">Centralize and manage all of your projects and their tasks, and improve your productivity and communication.</p>
                <SecondaryButton className={"bg-grey-300 margin-500-top grey-800 w-full p-l"} onClick={() => {navigate("/signup")}}>Sign up</SecondaryButton>
                <div className={'margin-300-top flex flex-col gap-300 items-center'}>
                    <p className={"text-grey-700 p-xs"}>Already have an account?</p>
                    <MainButton className={'w-full'} onClick={() => {navigate("/signin")}}>Sign in</MainButton>
                </div>
            </div>
        </section>
    );
}

export default OnboardingLayout;