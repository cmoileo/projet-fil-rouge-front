import React, {Ref} from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../services/shadcn/utils.ts';
import {PlusIcon, ChevronDownIcon, TrashIcon, PenIcon} from 'lucide-react';
import {useNavitem} from "./navItem.viewModel.tsx"
import {ProjectType} from "../../../types/project/projet.type.ts";
import {FolderType} from "../../../types/folder/folder.type.ts";
import {MainButton} from "../mainButton.tsx";
import {Input} from "../input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "../Popup.tsx";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent, ContextMenuSubTrigger,
    ContextMenuTrigger
} from "../contextMenu.tsx";
import {
    AlertDialog,
    AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "../altertDialog.tsx";

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
    const baseStyle = "select-none grow transition blue-1000 border-radius-100 padding-200-x cursor-pointer padding-100-y flex justify-between hover-bg-grey-200 items-center group";
    const iconStyle = "text-200 transition hover-bg-grey-300 border-radius-200";
    const chevronIconRef = React.useRef<HTMLDivElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);
    const plusIconRef = React.useRef<SVGSVGElement>(null);
    const createFolderButtonRef = React.useRef<HTMLButtonElement>(null);
    const [isAltertDialogOpen, setIsAltertDialogOpen] = React.useState<boolean>(false);
    const { chevronClickHandler, drop, style, drag, handleOpenForm, submitForm, handleDeleteFolder, isPopoverOpen, setIsPopoverOpen, handleDeleteProject, handleCreateFolder } = useNavitem({ chevronIconRef, plusIconRef, id, project, folders, setFolders, formRef, navbarRef });

    const linkElement = path ? (
        <div className={cn(baseStyle, className)}>
            <Link ref={drag} to={path} className={"w-full"}>
                <p className={"p-m"}>
                    {name}
                </p>
            </Link>
            {
                project && (
                    <TrashIcon onClick={() => handleDeleteProject(project?.id || null)} className={"transition padding-100 border-radius-200 hover-bg-grey-300"}></TrashIcon>
                )
            }
        </div>
    ) : (
        <ContextMenu>
            <li style={style} ref={drop} className={cn(baseStyle, className)}>
                <ContextMenuTrigger onMouseMove={(e) => e.preventDefault()}>
                    <div className={"flex min-w-[200%] gap-200 items-center"}>
                        <div ref={chevronIconRef} onClick={chevronClickHandler} className={iconStyle}>
                            <ChevronDownIcon className={"transition -rotate-90"}/>
                        </div>
                        {name}
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <AlertDialog open={isAltertDialogOpen}>
                        <AlertDialogTrigger className={"w-full"}>
                            <ContextMenuItem onClick={(e) => {
                                e.preventDefault();
                                setIsAltertDialogOpen(true);
                            }}  className={"justify-between w-full gap-400"}>
                                <TrashIcon strokeWidth={1}></TrashIcon>
                                Delete folder
                            </ContextMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will permanently delete the folder and all projects in it.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => {
                                    setIsAltertDialogOpen(false)
                                }}>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction asChild onClick={() => {
                                    setIsAltertDialogOpen(false)
                                    handleDeleteFolder(id);
                                }}>
                                    <MainButton className={"danger"} variant="danger">Continue</MainButton>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <PlusIcon strokeWidth={1}></PlusIcon>
                            Create subfolder
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent asChild>
                            <ContextMenuItem onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    createFolderButtonRef.current?.click();
                                }
                            }} asChild>
                                <form onSubmit={(e) => handleCreateFolder(e, id)} className={"flex flex-col gap-300"}>
                                    <Input name={"folderTitle"} onClick={(e) => e.preventDefault()} type={"text"} placeholder={"Enter the folder name"} required/>
                                    <MainButton ref={createFolderButtonRef} className={"w-full"} type={"submit"}>Create folder</MainButton>
                                </form>
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuItem className={"justify-between gap-400"}>
                        <PenIcon strokeWidth={1} width={24}></PenIcon>
                        Edit folder name
                    </ContextMenuItem>
                </ContextMenuContent>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger>
                        {isPlusIcon && <PlusIcon ref={plusIconRef} onClick={handleOpenForm}
                                                 className="group-hover:block text-200 transition hover-bg-grey-300 border-radius-200"/>}
                    </PopoverTrigger>
                    <PopoverContent className={'p-0'}>
                        <form onSubmit={submitForm} id={id} ref={formRef}
                              className={"z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_0px_50px_0px] flex flex-col gap-700 padding-500 border-radius-300 bg-white"}
                              action="submit">
                            <Input name={"projectTitle"} type={"text"} placeholder={"Enter the project name"}
                                   required/>
                            <MainButton className={"w-full"} type={"submit"}>Create project</MainButton>
                        </form>
                    </PopoverContent>
                </Popover>
            </li>
        </ContextMenu>
    );

    return linkElement;
};
