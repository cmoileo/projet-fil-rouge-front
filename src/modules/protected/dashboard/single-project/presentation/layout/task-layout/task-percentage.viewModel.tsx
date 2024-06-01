import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {updateTaskData} from "../../../../../../../repository/task/updateTask.data.ts";

export const useTaskPercentage = () => {
    const handleChangePercentage = async (value: number[], taskId: string | undefined) => {
        if (!taskId) return;
        const data: TaskType = {};
        data.progress_percentage = value[0];
        await updateTaskData(data, taskId);
    }

    return {
        handleChangePercentage
    }
}