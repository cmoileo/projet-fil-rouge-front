import "./assets/styles/main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OnBoardingPage from "./modules/auth/presentation/page/OnBoarding.page.tsx";
import SignupPage from "./modules/auth/presentation/page/Signup.page.tsx";
import SigninPage from "./modules/auth/presentation/page/Signin.page.tsx";
import { DashboardPage } from "./modules/protected/dashboard/dashboard/presentation/page/Page.tsx";
import {EmployeesPage} from "./modules/protected/dashboard/emloyees/presentation/page/Page.tsx";
import {RegisterEmployeePage} from "./modules/auth/presentation/page/RegisterEmployee.page.tsx";
import {AccountPage} from "./modules/protected/dashboard/account/presentation/page/Page.tsx";
import {ProjectsPage} from "./modules/protected/dashboard/projects/presentation/page/Page.tsx";
import {SingleProjectPage} from "./modules/protected/dashboard/single-project/presentation/page/Page.tsx";
import {HomePage} from "./modules/protected/dashboard/home/presentation/Page.tsx";
import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";

function App() {
    useEffect(() => {
        document.title = 'Task Pilot';
        if (window.location.pathname === "/") {
            window.location.pathname = localStorage.getItem('token') ? "/dashboard" : "/onboarding";
        }
    }, []);
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
                {
                    path: "account",
                    element: <AccountPage />,
                },
                {
                    path: "projects",
                    element: <ProjectsPage />,
                },
                {
                    path: "project/:id",
                    element: <SingleProjectPage />,
                },
                {
                    path: "",
                    element: <HomePage />
                }
            ],
        },
        {
            path: "/dashboard/employees",
            element: <SigninPage />,
        },
        {
            path: "/register-employee/:id",
            element: <RegisterEmployeePage />
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                progressStyle={{backgroundColor: 'green'}}
            />
        </>
    );
}

export default App;
