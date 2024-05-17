import {useProjects} from "./projects.viewModel.tsx";

export const ProjectsLayout = () => {
    const {projects} = useProjects();
    return (
        <div>
            {
                projects && projects.map(project => {
                    return (
                        <div key={project.id}>
                            <h1>{project.name}</h1>
                        </div>
                    )
                })
            }
        </div>
    );
}