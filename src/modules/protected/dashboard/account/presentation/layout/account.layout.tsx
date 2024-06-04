import { useAccountLayout } from "./account.viewModel.tsx";
import { Input } from "../../../../../../ui/components/input.tsx";
import { Image } from "lucide-react";
import { MainButton } from "../../../../../../ui/components/mainButton.tsx";

export const AccountLayout = () => {
    const { account, handleSaveChanges, isAvatar, handleAvatarChange, imageInputRef } = useAccountLayout();

    return (
        <div>
            {account ? (
                <form onSubmit={handleSaveChanges} className={"margin-800-top"}>
                    <div className="flex gap-500">
                        <div className="w-full flex items-center gap-400">
                            <label className={"p-s grey-300"}>Firstname</label>
                            <Input name={"firstname"} type={"text"} className={"h-fit"} defaultValue={account.firstname} />
                        </div>
                        <div className="w-full flex items-center gap-400">
                            <label className={"p-s grey-300"}>Lastname</label>
                            <Input name={"lastname"} type={"text"} className={"h-fit"} defaultValue={account.lastname} />
                        </div>
                    </div>
                    <div className="flex items-center gap-400 margin-600-top">
                        <label className={"p-s grey-300"}>Email</label>
                        <Input name={"email"} type={"email"} defaultValue={account.email} />
                    </div>
                    <div className="flex items-center gap-500 margin-600-top">
                        <div className={"relative"}>
                            {account.profile_picture_url || isAvatar ? (
                                <img src={isAvatar || account.profile_picture_url} alt={"profile picture"} className={"w-36 rounded-full object-cover h-36"} />
                            ) : (
                                <div className={"w-36 rounded-full h-36 bg-grey-200"} />
                            )}
                            <div className={"absolute z-10 border-1 rounded-sm top-1/2 bg-transparent shadow-[0px_0px_25px_10px_#00000024] left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
                                <Image onClick={() => {
                                    imageInputRef.current?.click();
                                }} color={"white"} cursor={"pointer"} viewBox={"2 2 20 20"} size={32} />
                            </div>
                            <Input ref={imageInputRef} onChange={handleAvatarChange} accept={"image/png, image/jpg, image/jpeg"} name={"avatar"} type={"file"} className={"cursor-pointer absolute opacity-0 top-0 w-full h-full"} />
                        </div>
                        <label className="p-s grey-300">Profile picture</label>
                    </div>
                    <MainButton className={"margin-800-top"}>Save changes</MainButton>
                </form>
            ) : null}
        </div>
    );
};
