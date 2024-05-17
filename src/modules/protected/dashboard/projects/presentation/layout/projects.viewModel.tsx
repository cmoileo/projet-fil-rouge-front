import {useContext} from "react";
import {DashboardContext} from "../../../../../../contexts/dashboard.context.tsx";

export const useProjects = () => {
    const {projects} = useContext(DashboardContext);
    return {
        projects,
    }
}