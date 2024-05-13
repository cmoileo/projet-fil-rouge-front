import {cookieManager} from "../coockies/CoockieManager.service.ts";
import {useNavigate} from "react-router-dom";

export const useProtectedRoute = () => {
    const token = cookieManager.getCookie();
    const navigate = useNavigate();
    if (!token) {
        navigate('/signin');
    }
}