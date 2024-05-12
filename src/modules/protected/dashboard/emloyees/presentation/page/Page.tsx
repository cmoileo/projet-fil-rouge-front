import {useProtectedRoute} from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";

export const EmployeesPage = () => {
    useProtectedRoute();
    return (
        <div>

        </div>
    );
}