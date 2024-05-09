import {useDrag, useDrop} from "react-dnd";
import {ProjectType} from "../../../types/project/projet.type.ts";
import {FolderType} from "../../../types/folder/folder.type.ts";
import React, {useEffect} from "react";
import {changeProjectParentFolderData} from "../../../repository/project/changeProjectParentFolder.data.ts";
import {getFolders} from "../../../repository/folder/getAll.data.ts";

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
        const parentUl = chevronIconRef.current.parentElement?.parentElement?.parentElement;
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

    const handleDrop = async (folderId: string) => {
        if (!folders || !projectId || !projectName) return;
        const updatedFolder = await changeProjectParentFolderData(projectId, folderId, projectName)
        if (!updatedFolder) return console.error("Error updating folder");
        const newFolders: FolderType[] | undefined = await getFolders();
        if (!newFolders) return console.error("Error sorting folders");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setFolders(newFolders)
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
            formRef.current.classList.remove("hidden");
            formRef.current.classList.add("flex");
        } else {
            formRef.current.classList.add("hidden");
            formRef.current.classList.remove("flex");
        }
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return {
        chevronClickHandler,
        drag,
        drop,
        style,
        handleOpenForm,
        submitForm
    }
}