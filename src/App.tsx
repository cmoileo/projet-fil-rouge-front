import "./assets/styles/main.scss"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import OnBoardingPage from "./modules/auth/presentation/page/OnBoarding.page.tsx";
import SignupPage from "./modules/auth/presentation/page/Signup.page.tsx";
import SigninPage from "./modules/auth/presentation/page/Signin.page.tsx";


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
        }
    ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
