import {useContext} from "react";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";

export const useTaskCategory = () => {
    const {taskCategories} = useContext(DashboardContext);

    return {
        taskCategories
    }
}