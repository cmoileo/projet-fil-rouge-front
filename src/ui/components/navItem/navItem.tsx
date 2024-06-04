import React, {ReactElement, Ref} from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../services/shadcn/utils.ts';
import {PlusIcon, ChevronDownIcon, TrashIcon, PenIcon, CheckIcon, LucideProps} from 'lucide-react';
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
    navbarRef?: React.RefObject<HTMLDivElement> | undefined,
    icon?: ReactElement<LucideProps>;
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
        navbarRef,
        icon
    }) => {
    const baseStyle = "select-none grow transition blue-1000 border-radius-100 padding-200-x cursor-pointer padding-100-y flex justify-between hover-bg-grey-700 items-center group";
    const iconStyle = "text-200 transition hover-bg-grey-700 border-radius-200";
    const chevronIconRef = React.useRef<HTMLDivElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);
    const plusIconRef = React.useRef<SVGSVGElement>(null);
    const createFolderButtonRef = React.useRef<HTMLButtonElement>(null);
    const [isAltertDialogOpen, setIsAltertDialogOpen] = React.useState<boolean>(false);
    const editFolderInputRef = React.useRef<HTMLInputElement>(null);
    const { chevronClickHandler, drop, style, drag, handleOpenForm, submitForm, handleDeleteFolder, isPopoverOpen, setIsPopoverOpen, handleDeleteProject, handleCreateFolder, handleEditFolderName, isEditFolderName, setIsEditFolderName, findSubfolders } = useNavitem({ chevronIconRef, plusIconRef, id, project, folders, setFolders, formRef, navbarRef });
    const folder = folders?.find(folder => folder.id === id) || findSubfolders(id) || null;
    const isChevron = folder && (folder?.children?.length > 0 || folder.projects.length > 0);

    const linkElement = path ? (
        <div className={cn(baseStyle, className)}>
            <Link ref={drag} to={path} className={"w-full flex gap-300 items-start"}>
                {icon}
                <p className={"p-s grey-300"}>
                    {name}
                </p>
            </Link>
            {
                project && (
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <TrashIcon color={"lightgrey"} className={"transition padding-100 border-radius-200 hover-bg-grey-700"}></TrashIcon>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will permanently delete the project.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction asChild onClick={() => {
                                    handleDeleteProject(project?.id || null)
                                }}>
                                    <MainButton className={"danger"} variant="danger">Continue</MainButton>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )
            }
        </div>
    ) : (
        <ContextMenu>
            <li style={style} ref={drop} className={cn(baseStyle, className)}>
                <ContextMenuTrigger onMouseMove={(e) => e.preventDefault()}>
                    <div className={"flex min-w-[200%] gap-200 items-center"}>
                        {
                            !isEditFolderName && isChevron && (
                                <div ref={chevronIconRef} onClick={chevronClickHandler} className={iconStyle}>
                                    <ChevronDownIcon color={"lightgrey"} className={"transition -rotate-90"}/>
                                </div>
                            )
                        }
                        {
                            isEditFolderName ? (
                                <form onSubmit={(e) => handleEditFolderName(e, id)} className={"flex gap-300"}>
                                <Input ref={editFolderInputRef} className={"w-2/3"} name={"folderTitle"} onClick={(e) => e.preventDefault()} type={"text"} placeholder={"Enter the folder name"} required/>
                                    <MainButton className={"w-fit h-fit padding-100"} type={"submit"}>
                                        <CheckIcon color={"lightgrey"}></CheckIcon>
                                    </MainButton>
                                </form>
                            ) : (
                                <p className={"p-m grey-300"}>{name}</p>
                            )
                        }
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className={"bg-grey-900 border-grey-500"}>
                    <AlertDialog open={isAltertDialogOpen}>
                        <AlertDialogTrigger className={"w-full"}>
                            <ContextMenuItem onClick={(e) => {
                                e.preventDefault();
                                setIsAltertDialogOpen(true);
                            }}  className={"justify-between w-full gap-400"}>
                                <TrashIcon color={"lightgrey"} strokeWidth={1}></TrashIcon>
                                <p className={"grey-200"}>Delete folder</p>
                            </ContextMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent className={"bg-grey900"}>
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
                        <ContextMenuSubTrigger className={"bg-grey-700"}>
                            <PlusIcon color={"lightgrey"} strokeWidth={1}></PlusIcon>
                            <p className={"grey-200"}>Create subfolder</p>
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent asChild>
                            <ContextMenuItem onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    createFolderButtonRef.current?.click();
                                }
                            }} asChild>
                                <form onSubmit={(e) => handleCreateFolder(e, id)} className={"flex flex-col bg-grey-900 gap-300"}>
                                    <Input name={"folderTitle"} onClick={(e) => e.preventDefault()} type={"text"} placeholder={"Enter the folder name"} required/>
                                    <MainButton ref={createFolderButtonRef} className={"w-full"} type={"submit"}>Create folder</MainButton>
                                </form>
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuItem onClick={() => {
                        setIsEditFolderName(true)
                        setTimeout(() => {
                            editFolderInputRef?.current?.focus();
                        }, 10)
                    }} className={"justify-between gap-400"}>
                        <PenIcon color={"lightgrey"} strokeWidth={1} width={24}></PenIcon>
                        <p className={'grey-200'}>Edit folder name</p>
                    </ContextMenuItem>
                </ContextMenuContent>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger>
                        {isPlusIcon && !isEditFolderName && <PlusIcon color={"lightgrey"} ref={plusIconRef} onClick={handleOpenForm}
                                                 className="group-hover:block text-200 transition hover-bg-grey-800 border-radius-200"/>}
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
