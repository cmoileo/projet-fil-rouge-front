import { useProtectedRoute } from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import { Navbar } from "../../../../../../ui/layouts/Navbar.layout.tsx";
import {Route, Routes} from "react-router-dom";
import {EmployeesPage} from "../../../emloyees/presentation/page/Page.tsx";

export const DashboardPage = () => {
    useProtectedRoute();
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/dashboard/employees" element={<EmployeesPage />} />
            </Routes>
        </div>
    );
};
