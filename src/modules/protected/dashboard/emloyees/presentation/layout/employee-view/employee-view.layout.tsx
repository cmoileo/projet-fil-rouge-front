import {useEmployeeView} from "./employee-view.viewModel.tsx";
import {EmployeeDto} from "../../../domain/dto/employee.dto.ts";

export const EmployeeViewLayout = () => {
    const {employees} = useEmployeeView();
    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-600'}>
            {
                employees && employees.map((employee: EmployeeDto, index: number) => {
                    return (
                        <article key={index} className={"flex flex-col gap-400 items-center padding-300 border-radius-300 shadow-[rgba(0,_0,_0,_0.15)_0px_0px_20px_0px]"}>
                            <p className={'p-s'}>{employee.firstname}</p>
                            <p className={'p-xs'}>{employee.email}</p>
                        </article>
                    );
                })
            }
        </div>
    );
}