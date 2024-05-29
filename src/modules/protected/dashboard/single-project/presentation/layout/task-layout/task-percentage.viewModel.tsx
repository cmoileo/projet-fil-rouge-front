import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {updateTaskData} from "../../../../../../../repository/task/updateTask.data.ts";

export const useTaskPercentage = () => {
    const handleChangePercentage = async (value: number[]) => {
        const data: TaskType = {};
        data.progress_percentage = value[0];
        await updateTaskData(data);
    }

    return {
        handleChangePercentage
    }
}