import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../../../../../ui/components/dropdown-menu.tsx";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {useTaskCategory} from "./task-category.viewModel.tsx";

export const TaskCategoryLayout = () => {
    const {taskCategories} = useTaskCategory();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MainButton>Actions</MainButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    Create Task Category
                </DropdownMenuItem>
                {
                    taskCategories && taskCategories.map((taskCategory) => (
                        <DropdownMenuItem key={taskCategory.id}>
                            {taskCategory.name}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}