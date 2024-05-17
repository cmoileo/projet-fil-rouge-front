import {useSingleProject} from "./single-project.viewModel.tsx";

export const SingleProjectLayout = () => {
    const {id} = useSingleProject();
    console.log("id :", id)
    return (
        <div>
            <h1>Single Project Page</h1>
        </div>
    );
}