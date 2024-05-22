import {useSingleProject} from "./single-project.viewModel.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../../../../ui/components/dropdown-menu.tsx";
import {MainButton} from "../../../../../../ui/components/mainButton.tsx";

export const SingleProjectLayout = () => {
    const {id, project} = useSingleProject();
    console.log("id :", id)
    console.log("project :", project)
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MainButton>Actions</MainButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Create
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Get
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}