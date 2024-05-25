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
        categoryName,
    }: {
        categoryName: string
    }
) => {
    const {taskCategories, isOpen, setIsOpen, createTaskInputRef, colorInputRef, handleCreateCategory, handleDeleteCategory } = useTaskCategory();
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <MainButton className={"border-radius-full bg-grey-200 color-grey-1000 hover:bg-gray-400 p-xs"}>{categoryName}</MainButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"padding-300"}>
                <div className="margin-300-bottom flex flex-col gap-300">
                    {
                        taskCategories && taskCategories.map((taskCategory) => (
                            <DropdownMenuItem className={"p-0 gap-200"} key={taskCategory.id}>
                                <Badge className={"w-full padding-200-y cursor-pointer"} style={{backgroundColor: taskCategory.color}}>{taskCategory.name}</Badge>
                                <TrashIcon onClick={(e) => {
                                    e.preventDefault()
                                    handleDeleteCategory(taskCategory.id)
                                }}></TrashIcon>
                            </DropdownMenuItem>
                        ))
                    }
                </div>
                    <Input ref={createTaskInputRef} type={"text"} placeholder={"Write new category"} />
                    <Input ref={colorInputRef} className={"w-full margin-200-top"} type={"color"} />
                    <SecondaryButton className={"p-xs w-full margin-200-top"} onClick={handleCreateCategory}>Create Task Category</SecondaryButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}