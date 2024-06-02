import {useSingleProject} from "./single-project.viewModel.tsx";
import {TaskLayout} from "./task-layout/task.layout.tsx";
import {CreateNewTaskLayout} from "./task-layout/create-new-task.layout.tsx";

export const SingleProjectLayout = () => {
    const {project, setProject, fetchProject} = useSingleProject();
    return (
        <div className={"flex flex-col h-full justify-between overflow-hidden"}>
            <div className={"flex flex-col gap-800 overflow-y-auto"}>
                {
                    project && project.tasks && project.tasks.map((task) => (
                        <TaskLayout fetchProject={fetchProject} key={task.id} task={task} />
                    ))
                }
            </div>
            <CreateNewTaskLayout setProject={setProject} projectId={project?.id} />
        </div>
    );
}