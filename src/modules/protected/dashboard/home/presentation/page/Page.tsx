import { useProtectedRoute } from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import { Navbar } from "../../../../../../ui/layouts/Navbar.layout.tsx";
import {Outlet} from "react-router-dom";

export const DashboardPage = () => {
    useProtectedRoute();
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};
