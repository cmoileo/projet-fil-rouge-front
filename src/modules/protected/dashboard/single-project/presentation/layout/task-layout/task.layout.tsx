import {TaskCategoryLayout} from "../task-category/task-category.layout.tsx";
import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {useEffect, useState} from "react";

export const TaskLayout = (
    {
        task
    } : {
        task: TaskType
    }
) => {
    const [categoryId, setCategoryId] = useState<string | undefined>(task?.task_category_id);

    useEffect(() => {
        setCategoryId(task?.task_category_id)
    }, []);
    return (
        <form id={task.id} className={"flex items-center justify-between"}>
            <p className="p-m">{task.name}</p>

            <TaskCategoryLayout setCategoryId={setCategoryId} taskId={task.id} categoryId={categoryId}/>
        </form>
    );
}