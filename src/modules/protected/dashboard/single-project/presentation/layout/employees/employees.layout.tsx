import {useContext} from "react";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";

export const EmployeesLayout = () => {
    const {employees} = useContext(DashboardContext)

    return {
        employees
    }
}