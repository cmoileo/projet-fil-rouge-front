import "./assets/styles/main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OnBoardingPage from "./modules/auth/presentation/page/OnBoarding.page.tsx";
import SignupPage from "./modules/auth/presentation/page/Signup.page.tsx";
import SigninPage from "./modules/auth/presentation/page/Signin.page.tsx";
import { DashboardPage } from "./modules/protected/dashboard/home/presentation/page/Page.tsx";
import {EmployeesPage} from "./modules/protected/dashboard/emloyees/presentation/page/Page.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/signin",
            element: <SigninPage />,
        },
        {
            path: "/onboarding",
            element: <OnBoardingPage />,
        },
        {
            path: "/signup",
            element: <SignupPage />,
        },
        {
            path: "/dashboard/",
            element: <DashboardPage />,
            children: [
                {
                    path: "employees",
                    element: <EmployeesPage />,
                },
            ],
        },
        {
            path: "/dashboard/employees",
            element: <SigninPage />,
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
