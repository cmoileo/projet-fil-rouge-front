import {useSingleProject} from "./single-project.viewModel.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "../../../../../../ui/components/Popup.tsx";
import {MainButton} from "../../../../../../ui/components/mainButton.tsx";
import {Input} from "../../../../../../ui/components/input.tsx";

export const SingleProjectLayout = () => {
    const {id, project} = useSingleProject();
    console.log("id :", id)
    console.log("project :", project)
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <MainButton>Create task</MainButton>
                </PopoverTrigger>
                <PopoverContent>
                    <form>
                        <Input name={"taskName"} placeholder="Task name" />
                        <textarea name={"taskDescription"} placeholder="Task description" />
                        <MainButton>Create task</MainButton>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
}