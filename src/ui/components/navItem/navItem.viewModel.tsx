import {useDrag, useDrop} from "react-dnd";
import {ProjectType} from "../../../types/project/projet.type.ts";
import {FolderType} from "../../../types/folder/folder.type.ts";
import React, {useEffect} from "react";
import {changeProjectParentFolderData} from "../../../repository/project/changeProjectParentFolder.data.ts";
import {getFolders} from "../../../repository/folder/getAll.data.ts";
import {createProject} from "../../../repository/project/createProject.data.ts";
import {deleteFolderData} from "../../../repository/folder/delete-folder.data.ts";

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
        parentUl.classList.remove("h-10");
    }
    const closeChevron = (el: Element, parentUl: HTMLElement) => {
        el.classList.add("-rotate-90");
        parentUl.classList.add("h-10");
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
        closeForm();
        if (!createdProject) return console.error("Error creating project");
        updateFolders(setFolders);
    }

    const handleDrop = async (folderId: string) => {
        if (!folders || !projectId || !projectName) return;
        const updatedFolder = await changeProjectParentFolderData(projectId, folderId, projectName)
        if (!updatedFolder) return console.error("Error updating folder");
        updateFolders(setFolders)
    }

    const updateFolders = async (setFolders: React.Dispatch<React.SetStateAction<FolderType[]>> | undefined) => {
        const newFolders: FolderType[] | undefined = await getFolders();
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
        }
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
        const folder = findSubfolders(folderId);
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

    return {
        chevronClickHandler,
        drag,
        drop,
        style,
        handleOpenForm,
        submitForm,
        handleDeleteFolder
    }
}