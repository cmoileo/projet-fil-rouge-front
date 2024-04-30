import "./assets/styles/main.scss"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {OnBoardingPage} from "./modules/auth/presentation/page/OnBoarding.page.tsx";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Hello world!</div>,
        },
        {
            path: "/onboarding",
            element: <OnBoardingPage />,
        }
    ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
