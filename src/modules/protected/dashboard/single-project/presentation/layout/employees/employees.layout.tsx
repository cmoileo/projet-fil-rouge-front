import {useContext} from "react";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "../../../../../../../ui/components/Popup.tsx";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {EmployeeDto} from "../../../../emloyees/domain/dto/employee.dto.ts";
import {Link} from "react-router-dom";
import {PlusIcon} from "lucide-react";

export const EmployeesLayout = (
    {
        selectedEmployees,
        setSelectedEmployees,
        handleAssignEmployeeToApi
    }: {
        selectedEmployees: EmployeeDto[],
        setSelectedEmployees: React.Dispatch<EmployeeDto[]>,
        handleAssignEmployeeToApi?: (updatedEmployees: EmployeeDto[]) => void
    }
) => {
    const {employees} = useContext(DashboardContext)
    const handleSelectEmployee = (employee: EmployeeDto) => {
        const isSelected = selectedEmployees.some(selectedEmployee => selectedEmployee.id === employee.id);
        let updatedEmployees: EmployeeDto[] = [];
        if (isSelected) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee.id !== employee.id));
            updatedEmployees = selectedEmployees.filter(selectedEmployee => selectedEmployee.id !== employee.id);
        } else if (selectedEmployees.length == 0) {
            setSelectedEmployees([employee])
            updatedEmployees = [employee]
        } else {
            updatedEmployees = [...selectedEmployees, employee]
            setSelectedEmployees(updatedEmployees);
        }
        if (handleAssignEmployeeToApi) {
            handleAssignEmployeeToApi(updatedEmployees)
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className={"flex gap-400 items-center"}>
                    <div className={"flex gap-200 items-center"}>
                        {
                            selectedEmployees.length > 0 && selectedEmployees.map((selectedEmployee) => (
                                <Link to={`/employees/${selectedEmployee.id}`} key={selectedEmployee.id}>
                                    {
                                        selectedEmployee.profile_picture_url ? (
                                            <img
                                                key={selectedEmployee.id}
                                                className="w-12 h-12 border-radius-full object-cover"
                                                src={selectedEmployee.profile_picture_url}
                                                alt=""
                                            />
                                        ) : (
                                            <div
                                                key={selectedEmployee.id}
                                                className="w-12 h-12 border-radius-full bg-grey-400"
                                            ></div>
                                        )
                                    }
                                </Link>
                                )
                            )
                        }
                    </div>
                    <MainButton type={"button"}>
                        {
                            selectedEmployees.length > 0 ? <PlusIcon></PlusIcon> : "Select Employees"
                        }
                    </MainButton>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-400">
                    {
                        employees && employees.map((employee) => (
                            <div style={{backgroundColor: selectedEmployees.find((selectedEmployee) => selectedEmployee.id == employee.id) ? "lightgrey" : ""}} onClick={() => handleSelectEmployee(employee)} className={"flex hover-bg-grey-100 transition padding-300 border-radius-200 cursor-pointer items-center gap-300"} key={employee.id}>
                                {
                                    employee.profile_picture_url ? (
                                        <img className={"w-12 h-12 border-radius-full object-cover"} src={employee.profile_picture_url} alt=""/>
                                    ) : (
                                        <div className={"w-12 h-12 border-radius-full bg-grey-400"}></div>
                                    )
                                }
                                <p className="p-xs">{employee.firstname + "" + employee.lastname}</p>
                            </div>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}