import {useProtectedRoute} from "../../../../../../services/protectedRoute/ProtectedRoute.service.ts";
import {AddEmployeeLayout} from "../layout/add-employee/AddEmployee.layout.tsx";
import {EmployeeViewLayout} from "../layout/employee-view/employee-view.layout.tsx";
import {JobsViewLayout} from "../layout/jobs-view/jobs-view.layout.tsx";

export const EmployeesPage = () => {
    useProtectedRoute();
    return (
        <div className={"flex max-lg:flex-col-reverse justify-between gap-700 w-full"}>
            <div className="flex w-full gap-900 flex-col max-lg:items-center">
                <AddEmployeeLayout />
                <EmployeeViewLayout />
            </div>
            <div>
                <JobsViewLayout />
            </div>
        </div>
    );
}