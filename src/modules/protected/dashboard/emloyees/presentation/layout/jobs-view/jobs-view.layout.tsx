import {useJobs} from "./jobs-view.viewModel.tsx";
import {JobDto} from "../../../domain/dto/job.dto.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {JobPillViewLayout} from "./job-pill-view.layout.tsx";

export const JobsViewLayout = () => {
    const {jobs, handleSubmit, isOpen, setIsOpen, setJobs} = useJobs();
    return (
        <div className={"margin-700-top"}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <MainButton children={"Add a job"} />
                </PopoverTrigger>
                <PopoverContent align={"start"} className={"margin-400-top"}>
                    <form onSubmit={handleSubmit}
                          className={"w-full bg-white flex flex-col gap-400 padding-400 border-radius-300 z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_0px_50px_0px]"}>
                        <div className="flex justify-around">
                            <label className={"p-s"} htmlFor="color">Color</label>
                            <Input className={"w-1/2"} name={"color"} id={"color"} type={"color"} placeholder={"Color"}/>
                        </div>
                        <Input name={"jobTitle"} id={"jobTitle"} type={"text"} placeholder={"Job title"}/>
                        <MainButton type={"submit"} children={"Add"}/>
                    </form>
                </PopoverContent>
            </Popover>
            <div className={"grid grid-cols-4 gap-500 margin-500-top"}>
                {
                    jobs && jobs.map((job: JobDto) => (
                        <JobPillViewLayout key={job.id} jobs={jobs} job={job} setJobs={setJobs}/>
                    ))
                }
            </div>
        </div>
    );
}