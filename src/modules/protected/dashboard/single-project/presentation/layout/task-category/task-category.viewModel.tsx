import {useContext, useRef, useState} from "react";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";
import {createTaskCategoryData} from "../../../../../../../repository/task-categoriy/create-task-category.data.ts";
import {getTaskCategoriesData} from "../../../../../../../repository/task/get-task-categories.data.ts";
import {deleteTaskCategoryData} from "../../../../../../../repository/task/delete-task-category.data.ts";

export const useTaskCategory = () => {
    const {taskCategories, setTaskCategories} = useContext(DashboardContext);
    const [isOpen, setIsOpen] = useState(false);
    const createTaskInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const colorInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    const handleCreateCategory = async () => {
        if (!createTaskInputRef.current || !colorInputRef.current) return
        const name = createTaskInputRef.current.value
        const color = colorInputRef.current.value
        const data = {
            name,
            color
        }
        createTaskInputRef.current.value = ''
        colorInputRef.current.value = ''
        await createTaskCategoryData(data)
        updateTaskCategory()
    }

    const handleDeleteCategory = async (id: string | undefined) => {
        if (!id) return
        await deleteTaskCategoryData(id)
        updateTaskCategory()
    }

    const updateTaskCategory = async () => {
        const updatedTaskCategory = await getTaskCategoriesData()
        if (!updatedTaskCategory) return
        setTaskCategories(updatedTaskCategory)
    }

    return {
        taskCategories,
        isOpen,
        setIsOpen,
        createTaskInputRef,
        handleCreateCategory,
        colorInputRef,
        handleDeleteCategory
    }
}