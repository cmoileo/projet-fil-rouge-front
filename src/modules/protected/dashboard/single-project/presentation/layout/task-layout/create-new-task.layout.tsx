import {SecondaryButton} from "../../../../../../../ui/components/secondaryButton.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../../../../ui/components/Popup"
import {Calendar as CalendarIcon} from "lucide-react"
import { Calendar } from "../../../../../../../ui/components/calendar.tsx"
import {useRef, useState} from "react";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {cn} from "../../../../../../../services/shadcn/utils.ts";
import {format} from "date-fns";
import {TaskCategoryLayout} from "../task-category/task-category.layout.tsx";
import {EmployeesLayout} from "../employees/employees.layout.tsx";
import {EmployeeDto} from "../../../../emloyees/domain/dto/employee.dto.ts";
import {useCreateNewTask} from "./creat-new-task.viewModel.tsx";
import {ProjectType} from "../../../../../../../types/project/projet.type.ts";

export const CreateNewTaskLayout = (
    {
        setProject,
        projectId
    }: {
        setProject: React.Dispatch<React.SetStateAction<ProjectType>>,
        projectId: string | undefined
    }
) => {
    const [beginDate, setBeginDateDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [isBeginOpen, setIsBeginOpen] = useState(false)
    const [isEndOpen, setIsEndOpen] = useState(false)
    const [selectedEmployees, setSelectedEmployees] = useState<EmployeeDto[] | []>([])
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
    const taskNameRef = useRef<HTMLInputElement>(null)
    const {handleCreateTask, formRef} = useCreateNewTask({beginDate, endDate, selectedEmployees, categoryId, taskNameRef, setProject, projectId, setCategoryId, setSelectedEmployees})

    return (
        <form ref={formRef} className={'w-full flex flex-col gap-500'} onSubmit={handleCreateTask}>
            <div className={"flex gap-400"}>
                <Input ref={taskNameRef} className={"w-fit"} required type={"text"} placeholder={"Task name"}></Input>
                <Popover open={isBeginOpen} onOpenChange={setIsBeginOpen}>
                    <PopoverTrigger asChild>
                        <MainButton
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal p-xs",
                                !beginDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {beginDate ? format(beginDate, "PPP") : <span>Pick a beginning date</span>}
                        </MainButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={beginDate}
                            onSelect={setBeginDateDate}
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
                                "w-[280px] justify-start text-left font-normal p-xs",
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
                            onSelect={setEndDate}
                            initialFocus
                            onDayClick={() => setIsEndOpen(false)}
                        />
                    </PopoverContent>
                </Popover>

                <EmployeesLayout selectedEmployees={selectedEmployees} setSelectedEmployees={setSelectedEmployees} />

                <TaskCategoryLayout setCategoryId={setCategoryId} taskId={undefined} categoryId={categoryId} />
            </div>
            <SecondaryButton type={"submit"} className={"w-full"}>Add new Task</SecondaryButton>
        </form>
    )
}