import {useJobs} from "./jobs-view.viewModel.tsx";
import {JobDto} from "../../../domain/dto/job.dto.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";

export const JobsViewLayout = () => {
    const {jobs, handleSubmit, isOpen, setIsOpen} = useJobs();
    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger>
                    <MainButton children={"Add an employee"} />
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
            {
                jobs && jobs.map((job: JobDto) => (
                    <div style={{backgroundColor: job.color}} key={job.id}>
                        <h1>{job.name}</h1>
                    </div>
                ))
            }
        </div>
    );
}