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

export const CreateNewTaskLayout = (
    {
        handleCreateTask
    }: {
        handleCreateTask: (e: any) => Promise<void>
    }
    ) => {
    const [date, setDate] = useState<Date>()

    return (
        <form className={'w-full flex flex-col gap-500'} onSubmit={handleCreateTask}>
            <div className={"flex gap-400"}>
                <Input type={"text"} placeholder={"Task name"}></Input>
                <Popover>
                    <PopoverTrigger asChild>
                        <MainButton
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </MainButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <SecondaryButton className={"w-full"}>Add new Task</SecondaryButton>
        </form>
    )
}