import {useProjects} from "./projects.viewModel.tsx";
import {Link} from "react-router-dom";

export const ProjectsLayout = () => {
    const {projects} = useProjects();
    return (
        <div className={"flex flex-col gap-500"}>
            {
                projects && projects.map(project => {
                    return (
                        <Link to={`/project/${project.id}`}>
                            <div key={project.id}>
                                <h3 className={"p-m"}>{project.name}</h3>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}