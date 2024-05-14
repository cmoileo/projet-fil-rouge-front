import {useEmployeeView} from "./employee-view.viewModel.tsx";
import {EmployeeDto} from "../../../domain/dto/employee.dto.ts";
import {cookieManager} from "../../../../../../../services/coockies/CoockieManager.service.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../../../../../ui/components/select.tsx";
import {RolesEnum} from "../../../../../../../const/roles.enum.ts";

export const EmployeeViewLayout = () => {
    const { employees } = useEmployeeView();
    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-600'}>
            {
                employees && employees.map((employee: EmployeeDto, index: number) => {
                    return (
                        <article key={index} className={"flex justify-end flex-col gap-400 items-center padding-300 border-radius-300 shadow-[rgba(0,_0,_0,_0.15)_0px_0px_20px_0px]"}>
                            {
                                employee.profile_picture_url ? <img className={'w-32 h-32 rounded-full'} src={employee.profile_picture_url} alt={'avatar'}/> : <div className={'w-32 h-32 rounded-full bg-gray-200'}></div>
                            }
                            <div className="flex flex-col gap-300 items-center">
                                <p className={'p-s'}>{employee.firstname}</p>
                                <p className={'p-xs'}>{employee.email}</p>
                                {
                                    employee.role === "OWNER" ? (
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={employee.role} />
                                                </SelectTrigger>
                                                <SelectContent id={"role"} defaultValue={employee.role}>
                                                    <SelectItem defaultChecked={true} key={RolesEnum.OWNER} value={RolesEnum.OWNER}>Owner</SelectItem>
                                                </SelectContent>
                                            </Select>
                                    ) : cookieManager.getCookie("role") !== "EMPLOYEE" ? (
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={employee.role} />
                                            </SelectTrigger>
                                            <SelectContent id={"role"} defaultValue={employee.role}>
                                                <SelectItem defaultChecked={employee.role == RolesEnum.EMPLOYEE} key={RolesEnum.EMPLOYEE} value={RolesEnum.EMPLOYEE}>Employee</SelectItem>
                                                <SelectItem defaultChecked={employee.role == RolesEnum.ADMIN} key={RolesEnum.ADMIN} value={RolesEnum.ADMIN}>Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={employee.role} />
                                            </SelectTrigger>
                                            <SelectContent aria-disabled={true} id={"role"}>
                                                <SelectItem defaultChecked={true} key={employee.role} value={employee.role}>{employee.role}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )
                                }
                            </div>
                        </article>
                    );
                })
            }
        </div>
    );
}
