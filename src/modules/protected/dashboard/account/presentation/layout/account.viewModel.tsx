import {useContext} from "react";
import {DashboardContext} from "../../../../../../contexts/dashboard.context.tsx";

export const useAccountLayout = () => {
    const {account} = useContext(DashboardContext);
    return {
        account
    }
}