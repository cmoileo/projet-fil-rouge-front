import {useProtectedRoute} from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import {AddEmployeeLayout} from "../layout/add-employee/AddEmployee.layout.tsx";
import {EmployeeViewLayout} from "../layout/employee-view/employee-view.layout.tsx";

export const EmployeesPage = () => {
    useProtectedRoute();
    return (
        <div className={"flex flex-col gap-800"}>
            <AddEmployeeLayout />
            <EmployeeViewLayout />
        </div>
    );
}