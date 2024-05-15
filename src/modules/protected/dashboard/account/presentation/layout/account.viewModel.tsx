import React, {useContext, useState} from "react";
import {DashboardContext} from "../../../../../../contexts/dashboard.context.tsx";
import {AccountType} from "../../../../../../types/account/account.type.ts";
import {toBase64} from "../../../../../../services/toBas64.service.ts";
import {editAccountData} from "../../../../../../types/account/edit-account.data.ts";

export const useAccountLayout = () => {
    const {account, setAccount} = useContext(DashboardContext);
    const [isAvatar, setIsAvatar] = useState<string | undefined>()
    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: AccountType = {
            email: formData.get('email') as string,
            firstname: formData.get('firstname') as string,
            lastname: formData.get('lastname') as string,
            avatar: formData.get("avatar") ? await toBase64(formData.get("avatar") as File) as string : null,
        }

        const updatedUser = await editAccountData(data)
        if (!updatedUser) return;
        setAccount(updatedUser)
    }
    const handleAvatarChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                if (!e.target) return;
                console.log(e.target)
                if (typeof e.target.result !== "string") return;
                setIsAvatar(e.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };
    return {
        account,
        handleSaveChanges,
        isAvatar,
        handleAvatarChange,
        imageInputRef
    }
}