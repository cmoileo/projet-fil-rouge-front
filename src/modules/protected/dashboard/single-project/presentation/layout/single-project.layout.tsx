import {useSingleProject} from "./single-project.viewModel.tsx";

export const SingleProjectLayout = () => {
    const {id, project} = useSingleProject();
    console.log("id :", id)
    console.log("project :", project)
    return (
        <div>
            <h1>Single Project Page</h1>
        </div>
    );
}