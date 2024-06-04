import { useProtectedRoute } from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import { Navbar } from "../../../../../../ui/layouts/Navbar.layout.tsx";
import {Outlet} from "react-router-dom";
import {DashboardProvider} from "../../../../../../contexts/dashboard.context";

export const DashboardPage = () => {
    useProtectedRoute();
    return (
        <DashboardProvider>
            <div className={"flex gap-1000"}>
                <Navbar/>
                <main className={"margin-600-top w-full margin-500-right margin-600-bottom"}>
                    <Outlet/>
                </main>
            </div>
        </DashboardProvider>
    );
};
