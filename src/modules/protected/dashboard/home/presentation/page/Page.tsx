import { useProtectedRoute } from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import { Navbar } from "../../../../../../ui/layouts/Navbar.layout.tsx";
import {Outlet} from "react-router-dom";

export const DashboardPage = () => {
    useProtectedRoute();
    return (
        <div className={"flex gap-1000"}>
            <Navbar/>
            <main className={"margin-600-top"}>
                <Outlet/>
            </main>
        </div>
    );
};
