import React, {Ref} from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../services/shadcn/utils.ts';
import { PlusIcon, ChevronDownIcon } from 'lucide-react';
import {useNavitem} from "./navItem.viewModel.tsx"
import {ProjectType} from "../../../types/project/projet.type.ts";
import {FolderType} from "../../../types/folder/folder.type.ts";
import {MainButton} from "../mainButton.tsx";
import {Input} from "../input.tsx";

interface NavItemProps {
    name: string;
    path?: string;
    className: string;
    isPlusIcon: boolean;
    parentUl?: Ref<HTMLDivElement>;
    id: string,
    project?: ProjectType,
    folders?: FolderType[]
    setFolders?: React.Dispatch<React.SetStateAction<FolderType[]>>,
    navbarRef?: React.RefObject<HTMLDivElement> | undefined
}

export const NavItem: React.FC<NavItemProps> = (
    {
        name,
        path,
        className,
        isPlusIcon,
        id,
        project,
        folders,
        setFolders,
        navbarRef
    }) => {
    const baseStyle = "select-none grow p-m transition blue-1000 border-radius-100 padding-200-x cursor-pointer padding-100-y flex justify-between hover-bg-grey-200 items-center relative group";
    const iconStyle = "text-200 transition hover-bg-grey-300 border-radius-200";
    const chevronIconRef = React.useRef<HTMLDivElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);
    const plusIconRef = React.useRef<SVGSVGElement>(null);
    const { chevronClickHandler, drop, style, drag, handleOpenForm } = useNavitem({ chevronIconRef, plusIconRef, id, project, folders, setFolders, formRef, navbarRef });


    const linkElement = path ? (
        <Link  ref={drag} to={path} className={cn(baseStyle, className)}>
            <div className={"flex gap-200 items-center"}>
                {name}
            </div>
            {isPlusIcon && <PlusIcon className="hidden group-hover:block text-200 transition hover-bg-grey-300 border-radius-200" />}
        </Link>
    ) : (
        <li style={style} ref={drop} className={cn(baseStyle, className)}>
            <div className={"flex gap-200 items-center"}>
                <div ref={chevronIconRef} onClick={chevronClickHandler} className={iconStyle}>
                    <ChevronDownIcon className={"transition -rotate-90"}/>
                </div>
                {name}
            </div>
            <form id={id} ref={formRef} className={"z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_0px_50px_0px] flex-col gap-700 fixed translate-x-full padding-500 border-radius-300 bg-white hidden"} action="submit">
                <label htmlFor="name">Project name</label>
                <Input name={"projectTitle"} type={"text"} placeholder={"Enter the project name"}
                       required/>
                <MainButton className={"w-full"} type={"submit"}>Create project</MainButton>
            </form>
            {isPlusIcon && <PlusIcon ref={plusIconRef} onClick={handleOpenForm}
                className="hidden group-hover:block text-200 transition hover-bg-grey-300 border-radius-200"/>}
        </li>
    );

    return linkElement;
};
