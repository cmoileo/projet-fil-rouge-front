import {useSingleProject} from "./single-project.viewModel.tsx";
import {TaskCategoryLayout} from "./task-category/task-category.layout.tsx";

export const SingleProjectLayout = () => {
    const {id, project} = useSingleProject();
    console.log("id :", id)
    console.log("project :", project)
    return (
        <div>
            <TaskCategoryLayout />
        </div>
    );
}