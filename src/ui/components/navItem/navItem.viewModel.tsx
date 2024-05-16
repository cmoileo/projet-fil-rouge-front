import {useDrag, useDrop} from "react-dnd";
import {ProjectType} from "../../../types/project/projet.type.ts";
import {FolderType} from "../../../types/folder/folder.type.ts";
import React, {useEffect} from "react";
import {changeProjectParentFolderData} from "../../../repository/project/changeProjectParentFolder.data.ts";
import {getFolders} from "../../../repository/folder/getAll.data.ts";
import {createProject} from "../../../repository/project/createProject.data.ts";
import {deleteFolderData} from "../../../repository/folder/delete-folder.data.ts";
import {deleteProjectData} from "../../../repository/project/delete-project.data.ts";
import {createFolderData} from "../../../repository/folder/createFodler.data.ts";
import {editFolderData} from "../../../repository/folder/edit-folder.data";

export const useNavitem = (
    {
        chevronIconRef,
        plusIconRef,
        id,
        project,
        folders,
        setFolders,
        formRef,
        navbarRef
    }: {
        chevronIconRef:  React.RefObject<HTMLDivElement>,
        plusIconRef: React.RefObject<SVGSVGElement>,
        id: string,
        project: ProjectType | undefined
        folders: FolderType[] | undefined,
        setFolders?: React.Dispatch<React.SetStateAction<FolderType[]>>,
        formRef: React.RefObject<HTMLFormElement>,
        navbarRef: React.RefObject<HTMLDivElement> | undefined
    }) => {
    const projectId = project?.id;
    const projectName = project?.name;
    const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);
    const [isEditFolderName, setIsEditFolderName] = React.useState<boolean>(false);
    let projects: ProjectType[] = [];
    let subfolders: FolderType[] = [];

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (plusIconRef.current && plusIconRef.current.contains(e.target)) return;
            if (formRef.current && chevronIconRef.current && !formRef.current.contains(e.target)) {
                formRef.current.classList.add("hidden");
                formRef.current.classList.remove("flex");
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [formRef]);
    const chevronClickHandler = () => {
        if (!chevronIconRef || !chevronIconRef.current) return;
        const parentUl = chevronIconRef.current.parentElement?.parentElement?.parentElement?.parentElement;
        if (!parentUl) return;
        const el: Element = chevronIconRef.current.children[0]
        if (el.classList.contains("-rotate-90")) {
            openChevron(el, parentUl);
        } else {
            closeChevron(el, parentUl);
        }
    }

    const openChevron = (el: Element, parentUl: HTMLElement) => {
        el.classList.remove("-rotate-90");
        parentUl.classList.remove("h-[33px]");
    }
    const closeChevron = (el: Element, parentUl: HTMLElement) => {
        el.classList.add("-rotate-90");
        parentUl.classList.add("h-[33px]");
    }

    const ItemType = 'LI';
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { name, type: ItemType },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult: { name: string | undefined; } | null = monitor.getDropResult()
            const isDragged = monitor.didDrop()
            if (isDragged && isDragging && item && dropResult && dropResult?.name) {
                handleDrop(dropResult.name)
            }
        }
    });


    const [{ isOver }, drop] = useDrop({
        accept: 'LI',
        drop: () => {
            const getDropResult = { name: id, type: ItemType };
            return getDropResult;
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const style = {
        backgroundColor: isOver ? '#c7cbd1' : 'transparent',
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;
        const formTarget = e.target as HTMLFormElement;
        const data = {
            name: formTarget.projectTitle.value,
            folder_id: id
        }
        const createdProject = await createProject(data);
        formRef.current.reset();
        if (!createdProject) return console.error("Error creating project");
        updateFolders(setFolders);
        setIsPopoverOpen(false)
    }

    const handleDrop = async (folderId: string) => {
        if (!folders || !projectId || !projectName) return;
        const updatedFolder = await changeProjectParentFolderData(projectId, folderId, projectName)
        if (!updatedFolder) return console.error("Error updating folder");
        updateFolders(setFolders)
    }

    const handleDeleteProject = async (projectId: string | null) => {
        if (!projectId) return console.error("Project not found");
        await deleteProjectData(projectId)
        const updatedFolders = await getFolders();
        if (!setFolders || !updatedFolders) return console.error("Error deleting project");
        setFolders(updatedFolders);
    }

    const handleCreateFolder = async (e:React.FormEvent<HTMLFormElement>, folderId: string | null) => {
        e.preventDefault()
        const formTarget = e.target as HTMLFormElement;
        await createFolderData(formTarget.folderTitle.value, folderId);
        const updatedFolders = await getFolders();
        if (!setFolders || !updatedFolders) return console.error("Error creating folder");
        setFolders(updatedFolders);
    }

    const updateFolders = async (setFolders: React.Dispatch<React.SetStateAction<FolderType[]>> | undefined) => {
        const newFolders: FolderType[] | undefined = await getFolders();
        console.log(newFolders)
        if (!newFolders) return console.error("Error sorting folders");
        if (setFolders) setFolders(newFolders);
    }

    const handleOpenForm = () => {
        if (!formRef || !formRef.current) return;
        if (!navbarRef || !navbarRef.current) return;
        const allForms = navbarRef.current.querySelectorAll("form");
        allForms.forEach((form: HTMLFormElement) => {
            if (form.id === id) return;
            form.classList.add("hidden");
            form.classList.remove("flex");
        })
        if (formRef.current.classList.contains("hidden")) {
            openForm()
        } else {
            closeForm()
        }
    }
    const closeForm = () => {
        if (!formRef || !formRef.current) return;
        formRef.current.classList.add("hidden");
        formRef.current.classList.remove("flex");
    }
    const openForm = () => {
        if (!formRef || !formRef.current) return;
        formRef.current.classList.remove("hidden");
        formRef.current.classList.add("flex");
    }

    const storeProjects = (folder: FolderType) => {
        if (!folder.projects) return false;
        folder.projects.map(project => {
            projects.push(project);
        })
        if (folder.children) {
            folder.children.map(child => {
                storeProjects(child);
            })
        }
    }

    const storeSubfolders = (folder: FolderType) => {
        if (folder.children) {
            folder.children.map(child => {
                subfolders.push(child);
                storeSubfolders(child);
            })
        } else return;
    }

    const findSubfolders = (folderId: string): FolderType | undefined | void => {
        if (!folders) return;
        storeSubfolders(folders[0])
        const subfolder = subfolders.find(subfolder => subfolder.id === folderId);
        if (!subfolder) return console.error("Subfolder not found");
        subfolders = []
        return subfolder;
    }

    const handleDeleteFolder = async (folderId: string) => {
        if (!folders) return console.error("Error deleting folder");
        let folder = findSubfolders(folderId);
        if (!folder) {
            folder = folders.find(folder => folder.id === folderId);
        }
        if (!folder) return console.error("Folder not found");
        storeProjects(folder);
        storeSubfolders(folder);
        await deleteFolderData(folder.id)
        for (const subfolder of subfolders) {
            await deleteFolderData(subfolder.id)
        }
        const updatedFolders = await getFolders();
        if (!setFolders || !updatedFolders) return console.error("Error deleting folder");
        setFolders(updatedFolders);
        projects = []
        subfolders = []
    }

    const handleEditFolderName = async (e:  React.FormEvent<HTMLFormElement>, folderId: string) => {
        e.preventDefault();
        const folder = folders?.find(folder => folder.id === folderId);
        if (!folder) return console.error("Folder not found");
        const formTarget = e.target as HTMLFormElement;
        const data = {
            id: folderId,
            name: formTarget.folderTitle.value,
            parent_folder_id: folder.parent_folder_id
        }
        await editFolderData(data);
        const updatedFolders = await getFolders();
        if (!setFolders || !updatedFolders) return console.error("Error editing folder");
        setFolders(updatedFolders);
        setIsEditFolderName(false);
    }

    return {
        chevronClickHandler,
        drag,
        drop,
        style,
        handleOpenForm,
        submitForm,
        handleDeleteFolder,
        isPopoverOpen,
        setIsPopoverOpen,
        handleDeleteProject,
        handleCreateFolder,
        handleEditFolderName,
        isEditFolderName,
        setIsEditFolderName,
        findSubfolders
    }
}