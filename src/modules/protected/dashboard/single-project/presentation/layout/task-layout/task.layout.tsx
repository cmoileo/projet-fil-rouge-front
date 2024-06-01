import {TaskCategoryLayout} from "../task-category/task-category.layout.tsx";
import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {useEffect, useState} from "react";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {EmployeesLayout} from "../employees/employees.layout.tsx";
import {EmployeeDto} from "../../../../emloyees/domain/dto/employee.dto.ts";
import {TaskPercentageLayout} from "./task-percentage.layout.tsx";
import {updateTaskData} from "../../../../../../../repository/task/updateTask.data.ts";

export const TaskLayout = (
    {
        task
    } : {
        task: TaskType
    }
) => {
    const [categoryId, setCategoryId] = useState<string | undefined>(task?.task_category_id);
    const [selectedEmployees, setSelectedEmployees] = useState<EmployeeDto[] | []>([])

    const handleAssignEmployeeToApi = async (updatedEmployees: EmployeeDto[]) => {
        if (!task.id) return;
        const data: TaskType = {
            assigned_users_id: updatedEmployees.map((employee) => employee.id)
        }
        await updateTaskData(data, task.id)
    }

    useEffect(() => {
        setCategoryId(task?.task_category_id)
        if (!task?.task_users) return;
        const users = task?.task_users.map((taskUser) => taskUser.employe);
        setSelectedEmployees(users as EmployeeDto[])
    }, []);
    return (
        <form id={task.id} className={"flex items-center justify-between"}>
            <Input defaultValue={task.name} className={"bg-transparent p-m w-fit"} />
            <EmployeesLayout handleAssignEmployeeToApi={handleAssignEmployeeToApi} selectedEmployees={selectedEmployees} setSelectedEmployees={setSelectedEmployees} />
            <TaskPercentageLayout taskId={task.id} />
            <TaskCategoryLayout setCategoryId={setCategoryId} taskId={task.id} categoryId={categoryId}/>
        </form>
    );
}