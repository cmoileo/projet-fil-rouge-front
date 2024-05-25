import {useContext, useEffect} from "react";
import {DashboardContext} from "../../../../../../../contexts/dashboard.context.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "../../../../../../../ui/components/Popup.tsx";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {EmployeeDto} from "../../../../emloyees/domain/dto/employee.dto.ts";

export const EmployeesLayout = (
    {
        selectedEmployees,
        setSelectedEmployees
    }: {
        selectedEmployees: EmployeeDto[],
        setSelectedEmployees: React.Dispatch<EmployeeDto[]>
    }
) => {
    const {employees} = useContext(DashboardContext)

    const handleSelectEmployee = (employee: EmployeeDto) => {
        const isSelected = selectedEmployees.some(selectedEmployee => selectedEmployee.id === employee.id);
        if (isSelected) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee.id !== employee.id));
        } else if (selectedEmployees.length == 0) {
            setSelectedEmployees([employee])
        } else {
            const updatedEmployees: EmployeeDto[] = [...selectedEmployees, employee]
            setSelectedEmployees(updatedEmployees);
        }
    };

    useEffect(() => {
        console.log(selectedEmployees);
    }, [selectedEmployees]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <MainButton>
                    Select Employees
                </MainButton>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-400">
                    {
                        employees && employees.map((employee) => (
                            <div onClick={() => handleSelectEmployee(employee)} className={"flex hover-bg-grey-100 transition padding-300 border-radius-200 cursor-pointer items-center gap-300"} key={employee.id}>
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