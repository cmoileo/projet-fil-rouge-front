import {useProtectedRoute} from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import {AddEmployeeLayout} from "../layout/add-employee/AddEmployee.layout.tsx";

export const EmployeesPage = () => {
    useProtectedRoute();
    return (
        <div>
            <AddEmployeeLayout />
        </div>
    );
}