import {useAccountLayout} from "./account.viewModel.tsx";
import {Input} from "../../../../../../ui/components/input.tsx";
import {Image} from "lucide-react";
import {MainButton} from "../../../../../../ui/components/mainButton.tsx";

export const AccountLayout = () => {
    const { account } = useAccountLayout();
    console.log(account);

    return (
        <div>
            {account ? (
                <form className={"margin-800-top"}>
                    <div className="flex gap-500">
                        <div className="w-full flex items-center gap-400">
                            <label className={"p-s"}>Firstname</label>
                            <Input type={"text"} className={"h-fit"} defaultValue={account.firstname}/>
                        </div>
                        <div className="w-full flex items-center gap-400">
                            <label className={"p-s"}>Lastname</label>
                            <Input type={"text"} className={"h-fit"} defaultValue={account.lastname}/>
                        </div>
                    </div>
                    <div className="flex items-center gap-400 margin-600-top">
                        <label className={"p-s"}>Email</label>
                        <Input type={"email"} defaultValue={account.email}/>
                    </div>
                    <div className="flex items-center gap-500 margin-600-top">
                        <div className={"relative"}>
                            {
                                account.profile_picture_url ?
                                    <img src={account.profile_picture_url} alt={"profile picture"}
                                         className={"w-36  rounded-full object-cover h-36"}/>
                                    :
                                    <div className={"w-36 rounded-full h-36 bg-grey-200"}/>

                            }
                            <Image className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}
                                   color={"white"} size={32}/>
                            <Input type={"file"} className={"cursor-pointer absolute opacity-0 top-0 w-full h-full"}/>
                        </div>
                        <label className="p-s">
                            Profile picture
                        </label>
                    </div>
                    <MainButton className={"margin-800-top"}>Save changes</MainButton>
                </form>
            ) : null}
        </div>
    );
};
