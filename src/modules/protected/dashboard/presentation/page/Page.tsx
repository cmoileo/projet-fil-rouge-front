import {useProtectedRoute} from "../../../../../services/protectedRoute/ProtectedRoute.service.ts";

export const DashboardPage = () => {
    useProtectedRoute();
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}