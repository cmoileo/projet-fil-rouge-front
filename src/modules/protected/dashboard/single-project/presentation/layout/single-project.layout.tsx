import {useSingleProject} from "./single-project.viewModel.tsx";
import {TaskLayout} from "./task-layout/task.layout.tsx";
import {CreateNewTaskLayout} from "./task-layout/create-new-task.layout.tsx";

export const SingleProjectLayout = () => {
    const {project, setProject} = useSingleProject();
    console.log(project)
    return (
        <div className={"flex flex-col gap-400"}>
            {
                project && project.tasks && project.tasks.map((task) => (
                    <TaskLayout task={task} />
                ))
            }
            <CreateNewTaskLayout setProject={setProject} projectId={project?.id} />
        </div>
    );
}