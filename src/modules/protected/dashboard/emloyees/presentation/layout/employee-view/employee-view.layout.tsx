import {useEmployeeView} from "./employee-view.viewModel.tsx";
import {RegisterEmployeeDto} from "../../../../../../auth/domain/dto/RegisterEmployee.dto.ts";

export const EmployeeViewLayout = () => {
    const {employee} = useEmployeeView();
    return (
        <div>
            {
                employee && employee.map((employee: RegisterEmployeeDto) => {
                    return (
                        <div>
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