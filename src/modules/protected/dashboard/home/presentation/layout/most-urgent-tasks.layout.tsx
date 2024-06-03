import {useMostUrgentTasksViewModel} from "./most-urgent-tasks.viewModel.tsx";

export const MostUrgentTasksLayout = () => {
    const {mostUrgentTasks} = useMostUrgentTasksViewModel();
    console.log(mostUrgentTasks)
    return (
        <div>
            <h1>Most Urgent Tasks</h1>
        </div>
    );
}