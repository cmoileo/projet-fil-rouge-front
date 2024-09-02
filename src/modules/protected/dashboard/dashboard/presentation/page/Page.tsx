import { useProtectedRoute } from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import { Navbar } from "../../../../../../ui/layouts/Navbar.layout.tsx";
import {Outlet} from "react-router-dom";
import {DashboardProvider} from "../../../../../../contexts/dashboard.context";

export const DashboardPage = () => {
    useProtectedRoute();
    return (
        <DashboardProvider>
            <div className={"flex max-lg:gap-6 gap-1000 max-lg:flex-col lg:flex-row"}>
                <Navbar/>
                <main className={"margin-600-top w-full margin-500-right margin-600-bottom max-lg:px-4"}>
                    <Outlet/>
                </main>
            </div>
        </DashboardProvider>
    );
};
