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
import {Calendar as CalendarIcon, LinkIcon, TrashIcon} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../../../../../../../ui/components/calendar";
import {AlertDialog, AlertDialogContent, AlertDialogTrigger} from "../../../../../../../ui/components/altertDialog.tsx";
import {deleteTaskData} from "../../../../../../../repository/task/delete-task.data.ts";
import {TaskDetailsLayout} from "./task-details.layout.tsx";
import {Link} from "react-router-dom";

export const TaskLayout = (
    {
        task,
        fetchProject,
        isLink
    }: {
        task: TaskType,
        fetchProject: () => void,
        isLink?: boolean
    }
) => {
    const [categoryId, setCategoryId] = useState<string | undefined>(task?.task_category_id);
    const [selectedEmployees, setSelectedEmployees] = useState<EmployeeDto[] | []>([]);
    const [beginDate, setBeginDate] = useState<Date>(task?.starting_date ? new Date(task.starting_date) : new Date());
    const [endDate, setEndDate] = useState<Date>(task?.finishing_date ? new Date(task.finishing_date) : new Date());
    const [isBeginOpen, setIsBeginOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    let typingTimer: any;
    const handleAssignEmployeeToApi = async (updatedEmployees: EmployeeDto[]) => {
        if (!task.id) return;
        const data: TaskType = {
            assigned_users_id: updatedEmployees.map((employee) => employee.id)
        }
        await updateTaskData(data, task.id);
    };

    const handleEditStartingDate = async (value: Date) => {
        if (!task.id) return;
        const data: TaskType = {
            starting_date: value,
        }
        await updateTaskData(data, task.id);
    }

    const handleEditEndDate = async (value: Date) => {
        if (!task.id) return;
        const data: TaskType = {
            finishing_date: value,
        }
        await updateTaskData(data, task.id);
    }

    const handleDeleteTask = async () => {
        if (!task.id) return;
        setIsDeleteOpen(false)
        await deleteTaskData(task.id);
        fetchProject();
    }

    const handleChangeTaskName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(async () => {
            if (!task.id) return;
            const data: TaskType = {
                name: e.target.value
            };
            await updateTaskData(data, task.id);
            fetchProject();
        }, 3000);
    };

    useEffect(() => {
        setCategoryId(task?.task_category_id);
        if (!task?.task_users) return;
        const users = task?.task_users.map((taskUser) => taskUser.employe);
        setSelectedEmployees(users as EmployeeDto[]);
    }, [task]);

    return (
        <>
            <form id={task.id} className={"flex items-center justify-between"}>
                <Input defaultValue={task.name} onChange={handleChangeTaskName} className={"bg-transparent p-m w-fit"}/>
                <EmployeesLayout isLink={isLink} handleAssignEmployeeToApi={handleAssignEmployeeToApi}
                                 selectedEmployees={selectedEmployees} setSelectedEmployees={setSelectedEmployees}/>
                {
                    isLink ? (
                        <p className={"p-s"}>{format(endDate, "P")}</p>
                    ) : (
                        <>
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
                                    {beginDate ? format(beginDate, "P") : <span>Pick a beginning date</span>}
                                </MainButton>
                            </PopoverTrigger>
                            <PopoverContent className="w-fit p-0">
                                <Calendar
                                    className={"w-fit"}
                                    mode="single"
                                    selected={beginDate}
                                    onSelect={(value) => {
                                        if (value) {
                                            setBeginDate(value);
                                            handleEditStartingDate(value);
                                        }
                                    }}
                                    initialFocus
                                    onDayClick={() => setIsBeginOpen(false)}/>
                            </PopoverContent>
                        </Popover><Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
                            <PopoverTrigger asChild>
                                <MainButton
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] w-fit justify-start text-left font-normal p-xs",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {endDate ? format(endDate, "P") : <span>Pick an ending date</span>}
                                </MainButton>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={(value) => {
                                        if (value) {
                                            setEndDate(value);
                                            handleEditEndDate(value);
                                        }
                                    }}
                                    initialFocus
                                    onDayClick={() => setIsEndOpen(false)}/>
                            </PopoverContent>
                        </Popover>
                        </>
                    )
                }
                {
                    !isLink && <TaskPercentageLayout defaultValue={task.progress_percentage || 0} taskId={task.id}/>
                }
                <TaskCategoryLayout setCategoryId={setCategoryId} taskId={task.id} categoryId={categoryId}/>
                <TaskDetailsLayout task={task} fetchProject={fetchProject}/>
                {
                    !isLink && <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                        <AlertDialogTrigger>
                            <TrashIcon className={"w-6 h-6 cursor-pointer"}/>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <p className={"p-m"}>Are you sure you want to delete this task?</p>
                            <div className="flex gap-4 justify-end">
                                <MainButton onClick={() => setIsDeleteOpen(false)} variant="outline">Cancel</MainButton>
                                <MainButton variant={"danger"} onClick={handleDeleteTask}>Delete</MainButton>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                }
                {
                    isLink && <Link to={`/dashboard/project/${task.project_id}`}><LinkIcon className={"w-6 h-6 cursor-pointer"}/></Link>
                }
            </form>
        </>
    );
};
