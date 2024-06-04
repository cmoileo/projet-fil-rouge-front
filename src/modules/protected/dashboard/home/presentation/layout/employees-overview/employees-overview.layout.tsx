import {useContext, useEffect} from "react";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";
import {getEmployeeOccupationPtUseCase} from "../../../domain/use-case/get-employee-occupation-pt.useCase.ts";
export const EmployeesOverviewLayout = () => {
    const { employees, fetchEmployee } = useContext(DashboardContext);
    useEffect(() => {
        fetchEmployee();
    }, []);
    return (
        <div className={"w-[43%] sticky top-4 h-fit"}>
            <h2 className={"h4 grey-200"}>Employees overview</h2>
            <div className={"grid grid-cols-3 gap-10 margin-500-top justify-items-center"}>
                {
                    employees && employees?.map((employee) => (
                        <div className={"flex flex-col items-center gap-400 h-full"} key={employee.id}>
                            <div className={"flex flex-col justify-between items-center h-full w-full"}>
                                {
                                    employee.profile_picture_url ? (
                                        <img className={"w-28 h-28 object-cover border-radius-full"}
                                             src={employee.profile_picture_url} alt={employee.firstname}/>
                                    ) : (
                                        <div className={"w-28 h-28 bg-gray-500 rounded-full"}/>
                                    )
                                }
                                <p className={"p-m grey-300 text-center"}>{employee.firstname}</p>
                            </div>
                                <div className={"w-full h-2 border-radius-full bg-grey-200 relative"}>
                                    <div style={{width: getEmployeeOccupationPtUseCase(employee) + "%"}} className={"h-full absolute left-0 bg-green-300 rounded-full"}>
                                    </div>
                                </div>
                            </div>
                    ))
                }
            </div>
        </div>
    )
}