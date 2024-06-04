import {useMostUrgentTasksViewModel} from "./most-urgent-tasks.viewModel.tsx";
import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {TaskLayout} from "../../../../single-project/presentation/layout/task-layout/task.layout.tsx";
import {useSingleProject} from "../../../../single-project/presentation/layout/single-project.viewModel.tsx";

export const MostUrgentTasksLayout = () => {
    const {mostUrgentTasks} = useMostUrgentTasksViewModel();
    const {fetchProject} = useSingleProject()
    return (
        <div className={"w-[52%] pr-[3%] border-r-2 border-right-grey-700 overflow-x-auto"}>
            <h2 className={"h4 grey-200"}>Most urgent tasks</h2>
            <div className={"flex flex-col gap-600 margin-500-top"}>
                {
                    mostUrgentTasks?.map((task: TaskType) => (
                        <div key={task.id}>
                            <TaskLayout isLink={true} task={task} fetchProject={fetchProject}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}