import {useProtectedRoute} from "../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import {Navbar} from "../../../../../ui/layouts/Navbar.layout.tsx";

export const DashboardPage = () => {
    useProtectedRoute();
    return (
        <div>
            <Navbar/>
        </div>
    )
}