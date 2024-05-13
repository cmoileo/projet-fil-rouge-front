import {useEmployeeView} from "./employee-view.viewModel.tsx";
import {RegisterEmployeeDto} from "../../../../../../auth/domain/dto/RegisterEmployee.dto.ts";

export const EmployeeViewLayout = () => {
    const {employees} = useEmployeeView();
    return (
        <div>
            {
                employees && employees.map((employee: RegisterEmployeeDto, index: number) => {
                    return (
                        <div key={index}>
                            <p>{employee.firstname}</p>
                            <p>{employee.lastname}</p>
                            <p>{employee.email}</p>
                        </div>
                    );
                })
            }
        </div>
    );
}