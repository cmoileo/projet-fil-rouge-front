import {useContext} from "react";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";

export const EmployeesOverviewLayout = () => {
    const { employees } = useContext(DashboardContext);
    return (
        <div className={"w-[43%] sticky top-4 h-fit"}>
            <h2 className={"h4"}>Employees overview</h2>
            <div className={"grid grid-cols-3 gap-10 margin-500-top justify-items-center"}>
                {
                    employees?.map((employee) => (
                        <div className={"flex flex-col items-center gap-400"} key={employee.id}>
                            {
                                employee.profile_picture_url ? (
                                    <img className={"w-28 h-28 object-cover border-radius-full"} src={employee.profile_picture_url} alt={employee.firstname} />
                                ) : (
                                    <div className={"w-28 h-28 bg-gray-500 rounded-full"} />
                                )
                            }
                            <p className={"p-m text-center"}>{employee.firstname}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}