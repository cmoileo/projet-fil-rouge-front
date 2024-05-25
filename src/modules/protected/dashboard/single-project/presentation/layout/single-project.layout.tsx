import {useSingleProject} from "./single-project.viewModel.tsx";
import {TaskCategoryLayout} from "./task-category/task-category.layout.tsx";

export const SingleProjectLayout = () => {
    const {id, project} = useSingleProject();
    return (
        <div>
            {
                project && project.tasks && project.tasks.map((task) => (
                    <TaskCategoryLayout taskId={id} categoryId={task?.task_category_id} />
                ))
            }
        </div>
    );
}