import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../../../../../ui/components/dropdown-menu.tsx";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {useTaskCategory} from "./task-category.viewModel.tsx";
import {SecondaryButton} from "../../../../../../../ui/components/secondaryButton.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {Badge} from "../../../../../../../ui/components/badge.tsx";
import {TrashIcon} from "lucide-react";

export const TaskCategoryLayout = (
    {
        categoryId,
        taskId,
        setCategoryId,
    }: {
        categoryId: string | undefined,
        taskId: string | undefined,
        setCategoryId: React.Dispatch<string> | undefined
    }
) => {
    const {taskCategories, isOpen, setIsOpen, createTaskInputRef, colorInputRef, handleCreateCategory, handleDeleteCategory, handleAssignTaskCategory } = useTaskCategory({
        taskId,
        setCategoryId
    });
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <MainButton style={{backgroundColor: categoryId && taskCategories?.find((taskCategory) => categoryId == taskCategory?.id)?.name ? taskCategories?.find((taskCategory) => categoryId == taskCategory?.id)?.color : ""}} className={"border-radius-full white bg-grey-200 color-grey-1000 hover:bg-gray-800 p-xs"}>
                    {categoryId && taskCategories?.find((taskCategory) => categoryId == taskCategory?.id)?.name ? taskCategories?.find((taskCategory) => categoryId == taskCategory?.id)?.name : "Category"}
                </MainButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"padding-300 bg-grey-800 border-grey-700"}>
                <div className="margin-300-bottom flex flex-col gap-300">
                    {
                        taskCategories && taskCategories.map((taskCategory) => (
                            <DropdownMenuItem className={"p-0 hover:bg-grey-800 gap-200"} key={taskCategory.id}>
                                <Badge onClick={() => handleAssignTaskCategory(taskCategory.id)} className={"w-full padding-200-y cursor-pointer"} style={{backgroundColor: taskCategory.color}}>{taskCategory.name}</Badge>
                                <TrashIcon color={"lightgrey"} className={"cursor-pointer"} onClick={(e) => {
                                    e.preventDefault()
                                    handleDeleteCategory(taskCategory.id)
                                }}></TrashIcon>
                            </DropdownMenuItem>
                        ))
                    }
                </div>
                    <Input ref={createTaskInputRef} type={"text"} placeholder={"Write new category"} />
                    <Input ref={colorInputRef} className={"w-full margin-200-top"} type={"color"} />
                    <SecondaryButton className={"p-xs w-full margin-200-top bg-grey-100 grey-900"} onClick={handleCreateCategory}>Create Task Category</SecondaryButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}