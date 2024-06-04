import {useSingleProject} from "./single-project.viewModel.tsx";
import {TaskLayout} from "./task-layout/task.layout.tsx";
import {CreateNewTaskLayout} from "./task-layout/create-new-task.layout.tsx";

export const SingleProjectLayout = () => {
    const {project, setProject, fetchProject} = useSingleProject();
    return (
        <div className={"h-full overflow-y-hidden"}>
            <div>
                <h2 className={"h3 grey-200"}>{project?.name}</h2>
                <hr className={"margin-300-top"}/>
            </div>
            <div className={"flex flex-col h-[60vh] justify-between margin-500-top"}>
            <div className={"flex flex-col gap-800 h-full overflow-y-auto"}>
                    {
                        project && project.tasks && project.tasks.map((task) => (
                            <TaskLayout fetchProject={fetchProject} key={task.id} task={task}/>
                        ))
                    }
                </div>
                <CreateNewTaskLayout setProject={setProject} projectId={project?.id}/>
            </div>
        </div>
    );
}