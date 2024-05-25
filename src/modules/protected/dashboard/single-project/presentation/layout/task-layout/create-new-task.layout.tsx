import {SecondaryButton} from "../../../../../../../ui/components/secondaryButton.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../../../../ui/components/Popup"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "../../../../../../../ui/components/calendar.tsx"
import {useState} from "react";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {cn} from "../../../../../../../services/shadcn/utils.ts";
import {format} from "date-fns";
import {TaskCategoryLayout} from "../task-category/task-category.layout.tsx";

export const CreateNewTaskLayout = (
    {
        handleCreateTask,
    }: {
        handleCreateTask: (e: any) => Promise<void>
    }
    ) => {
    const [beginDate, setBeginDateDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [isBeginOpen, setIsBeginOpen] = useState(false)
    const [isEndOpen, setIsEndOpen] = useState(false)


    return (
        <form className={'w-full flex flex-col gap-500'} onSubmit={handleCreateTask}>
            <div className={"flex gap-400"}>
                <Input type={"text"} placeholder={"Task name"}></Input>
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

                <TaskCategoryLayout taskId={undefined} categoryId={undefined} />
            </div>
            <SecondaryButton className={"w-full"}>Add new Task</SecondaryButton>
        </form>
    )
}