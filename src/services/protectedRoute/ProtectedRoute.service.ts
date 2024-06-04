import {cookieManager} from "../coockies/CoockieManager.service.ts";

export const useProtectedRoute = () => {
    const token = cookieManager.getCookie("token");
    if (!token) {
        const origin = window.location.origin;
        window.location.href = `${origin}/signin`;
    }
}