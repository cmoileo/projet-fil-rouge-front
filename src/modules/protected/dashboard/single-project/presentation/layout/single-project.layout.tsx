import {useSingleProject} from "./single-project.viewModel.tsx";
import {TaskLayout} from "./task-layout/task.layout.tsx";
import {CreateNewTaskLayout} from "./task-layout/create-new-task.layout.tsx";

export const SingleProjectLayout = () => {
    const {project, handleCreateTask} = useSingleProject();
    return (
        <div className={"flex flex-col gap-400"}>
            {
                project && project.tasks && project.tasks.map((task) => (
                    <TaskLayout task={task} />
                ))
            }
            <CreateNewTaskLayout handleCreateTask={handleCreateTask} />
        </div>
    );
}