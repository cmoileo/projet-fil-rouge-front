import {ProjectsLayout} from "../layout/projects/projects.layout.tsx";
import {TaskCategoriesLayout} from "../layout/task-categories/taskCategoriesLayout.tsx";

export const ProjectsPage = () => {
    return (
        <div>
            <ProjectsLayout />
            <TaskCategoriesLayout />
        </div>
    );
}