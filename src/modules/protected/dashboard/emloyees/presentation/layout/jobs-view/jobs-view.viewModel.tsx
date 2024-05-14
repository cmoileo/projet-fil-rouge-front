import {FormEvent, useEffect, useState} from "react";
import {getJobsData} from "../../../../../../../repository/jobs/get-jobs.data.ts";
import {JobDto} from "../../../domain/dto/job.dto.ts";
import {AddJobDto} from "../../../domain/dto/add-job.dto.ts";
import {createJobData} from "../../../../../../../repository/jobs/create-job.data.ts";

export const useJobs = () => {
    const [jobs, setJobs] = useState<JobDto[] | null>(null);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchJobs = async () => {
            const jobs = await getJobsData();
            if (!jobs) return
            setJobs(jobs);
        }
        fetchJobs();
    }, []);

    const handleSubmit = async (e: FormEvent )=> {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        if (!target) return
        const data: AddJobDto = {
            color: target.color.value,
            name: target.jobTitle.value
        }
        const createdJob: JobDto | false = await createJobData(data)
        if (!createdJob) return
        target.reset()
        setIsOpen(false)
        if (jobs) {
            setJobs([...jobs, createdJob])
        } else {
            setJobs([createdJob])
        }
    }

    return {
        jobs,
        handleSubmit,
        isOpen,
        setIsOpen
    }
}
