import {TaskCategoryLayout} from "../task-category/task-category.layout.tsx";
import {TaskType} from "../../../../../../../types/task/task.type.ts";

export const TaskLayout = (
    {
        task
    } : {
        task: TaskType
    }
) => {
    return (
        <div>
            <TaskCategoryLayout taskId={task.id} categoryId={task?.task_category_id}/>
        </div>
    );
}