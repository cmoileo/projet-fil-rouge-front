import {useJobs} from "./jobs-view.viewModel.tsx";
import {JobDto} from "../../../domain/dto/job.dto.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {TrashIcon} from "lucide-react";

export const JobsViewLayout = () => {
    const {jobs, handleSubmit, isOpen, setIsOpen} = useJobs();
    return (
        <div className={"margin-700-top"}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <MainButton children={"Add a job"} />
                </PopoverTrigger>
                <PopoverContent>
                    <form onSubmit={handleSubmit}
                          className={"w-full flex flex-col gap-400 padding-400 border-radius-300 z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_0px_50px_0px]"}>
                        <Input name={"color"} id={"color"} type={"color"} placeholder={"Color"}/>
                        <Input name={"jobTitle"} id={"jobTitle"} type={"text"} placeholder={"Job title"}/>
                        <MainButton type={"submit"} children={"Add"}/>
                    </form>
                </PopoverContent>
            </Popover>
            <div className={"grid grid-cols-6 gap-500 margin-500-top"}>
                {
                    jobs && jobs.map((job: JobDto) => (
                        <div className={"flex items-center gap-400"} key={job.id}>
                            <p style={{backgroundColor: job.color}} className={"border-radius-full flex justify-center padding-500-x padding-200-y white p-xs w-fit"}>{job.name}</p>
                            <TrashIcon className={"cursor-pointer"}></TrashIcon>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}