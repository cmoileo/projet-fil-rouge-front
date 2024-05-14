import {useEmployeeView} from "./employee-view.viewModel.tsx";
import {EmployeeDto} from "../../../domain/dto/employee.dto.ts";
import {cookieManager} from "../../../../../../../services/coockies/CoockieManager.service.ts";
import {EmployeeCantEdit} from "./employee-single/employee-cant-edit.tsx";
import {EmployeeCanEdit} from "./employee-single/employee-can-edit.tsx";

export const EmployeeViewLayout = () => {
    const { employees } = useEmployeeView();
    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-600'}>
            {
                employees ? employees.map((employee: EmployeeDto, index: number) => {
                    return (
                        <article key={index} className={"flex flex-col gap-400 items-center padding-500 border-radius-300 shadow-[rgba(0,_0,_0,_0.15)_0px_0px_20px_0px]"}>
                            {
                                employee.profile_picture_url ? <img className={'w-32 h-32 rounded-full'} src={employee.profile_picture_url} alt={'avatar'}/> : <div className={'w-32 h-32 rounded-full bg-gray-200'}></div>
                            }
                            <div className="flex flex-col gap-300 items-center">
                                <p className={'p-s'}>{employee.firstname}</p>
                                <a href={"mailto:" + employee.email}><p className={'p-xs'}>{employee.email}</p></a>
                                {
                                    employee.role === "OWNER" && cookieManager.getCookie("role") !== "OWNER" ? (
                                        <EmployeeCantEdit employee={employee} />
                                    ) : cookieManager.getCookie("role") !== "EMPLOYEE" ? (
                                        <EmployeeCanEdit employee={employee} />
                                    ) : (
                                        <EmployeeCantEdit employee={employee} />
                                    )
                                }
                            </div>
                        </article>
                    );
                }) : null
            }
        </div>
    );
}
