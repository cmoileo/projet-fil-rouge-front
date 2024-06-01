import { TaskCategoryLayout } from "../task-category/task-category.layout";
import { TaskType } from "../../../../../../../types/task/task.type";
import { useEffect, useState } from "react";
import { Input } from "../../../../../../../ui/components/input";
import { EmployeesLayout } from "../employees/employees.layout";
import { EmployeeDto } from "../../../../emloyees/domain/dto/employee.dto";
import { TaskPercentageLayout } from "./task-percentage.layout";
import { updateTaskData } from "../../../../../../../repository/task/updateTask.data";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../../ui/components/Popup";
import { MainButton } from "../../../../../../../ui/components/mainButton";
import { cn } from "../../../../../../../services/shadcn/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../../../../../../../ui/components/calendar";

export const TaskLayout = (
    {
        task
    }: {
        task: TaskType
    }
) => {
    const [categoryId, setCategoryId] = useState<string | undefined>(task?.task_category_id);
    const [selectedEmployees, setSelectedEmployees] = useState<EmployeeDto[] | []>([]);
    const [beginDate, setBeginDate] = useState<Date>(task?.starting_date ? new Date(task.starting_date) : new Date());
    const [endDate, setEndDate] = useState<Date>(task?.finishing_date ? new Date(task.finishing_date) : new Date());
    const [isBeginOpen, setIsBeginOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);

    const handleAssignEmployeeToApi = async (updatedEmployees: EmployeeDto[]) => {
        if (!task.id) return;
        const data: TaskType = {
            assigned_users_id: updatedEmployees.map((employee) => employee.id)
        }
        await updateTaskData(data, task.id);
    };

    useEffect(() => {
        setCategoryId(task?.task_category_id);
        if (!task?.task_users) return;
        const users = task?.task_users.map((taskUser) => taskUser.employe);
        setSelectedEmployees(users as EmployeeDto[]);
    }, [task]);

    const handleBeginDateSelect = (date: Date | undefined) => {
        if (date) setBeginDate(date);
    };

    const handleEndDateSelect = (date: Date | undefined) => {
        if (date) setEndDate(date);
    };

    return (
        <form id={task.id} className={"flex items-center justify-between"}>
            <Input defaultValue={task.name} className={"bg-transparent p-m w-fit"} />
            <EmployeesLayout handleAssignEmployeeToApi={handleAssignEmployeeToApi} selectedEmployees={selectedEmployees} setSelectedEmployees={setSelectedEmployees} />
            <Popover open={isBeginOpen} onOpenChange={setIsBeginOpen}>
                <PopoverTrigger asChild>
                    <MainButton
                        variant={"outline"}
                        className={cn(
                            "w-[280px] w-fit justify-start text-left font-normal p-xs",
                            !beginDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {beginDate ? format(beginDate, "PPP") : <span>Pick a beginning date</span>}
                    </MainButton>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-0">
                    <Calendar
                        className={"w-fit"}
                        mode="single"
                        selected={beginDate}
                        onSelect={handleBeginDateSelect}
                        initialFocus
                        onDayClick={() => setIsBeginOpen(false)}
                    />
                </PopoverContent>
            </Popover>

            <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
                <PopoverTrigger asChild>
                    <MainButton
                        variant={"outline"}
                        className={cn(
                            "w-[280px] w-fit justify-start text-left font-normal p-xs",
                            !endDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {endDate ? format(endDate, "PPP") : <span>Pick an ending date</span>}
                    </MainButton>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={handleEndDateSelect}
                        initialFocus
                        onDayClick={() => setIsEndOpen(false)}
                    />
                </PopoverContent>
            </Popover>
            <TaskPercentageLayout defaultValue={task.progress_percentage || 0} taskId={task.id} />
            <TaskCategoryLayout setCategoryId={setCategoryId} taskId={task.id} categoryId={categoryId} />
        </form>
    );
};
