import {EmployeeDto} from "../../../emloyees/domain/dto/employee.dto.ts";

export const getEmployeeOccupationPtUseCase = (employee: EmployeeDto): number => {
    const nexMonthDays = 30
    const today = new Date().getTime()
    const assignedTasks = employee.assigned_tasks
    if (assignedTasks.length < 1) return 0
    const tasksTime = assignedTasks.map(assignedTask => {
        if (!assignedTask.task.starting_date || !assignedTask.task.finishing_date) return 0
        const taskTime = new Date(assignedTask.task.finishing_date).getTime() - (new Date(assignedTask.task.starting_date).getTime() > today ? new Date(assignedTask.task.starting_date).getTime() : today)
        return taskTime
    })
    const totalDurationInDays = tasksTime.map(taskTime => taskTime / (1000 * 60 * 60 * 24)).reduce((acc, duration) => acc + duration, 0)
    const occupationPt = totalDurationInDays / nexMonthDays * 100
    console.log(assignedTasks)
    return occupationPt < 100 ? occupationPt : 100
}