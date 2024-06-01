import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "../../../../../../../ui/components/drawer.tsx";

export const TaskDetailsLayout = (
    {
        task,
        fetchProject,
    }: {
        task: TaskType,
        fetchProject: () => void
    }
) => {
    return (
        <div className={"flex flex-col gap-400"}>
            <Drawer>
                <DrawerTrigger asChild>
                    <button>test</button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                     <h1>header</h1>
                    </DrawerHeader>
                    <p>{task.name}</p>
                </DrawerContent>
            </Drawer>
        </div>
    )
}