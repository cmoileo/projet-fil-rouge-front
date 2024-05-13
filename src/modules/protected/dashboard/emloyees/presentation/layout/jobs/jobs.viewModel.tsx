import {useEffect, useState} from "react";
import {getJobsData} from "../../../../../../../repository/jobs/get-jobs.data.ts";
import {JobDto} from "../../../domain/dto/job.dto.ts";

export const useJobs = () => {
    const [jobs, setJobs] = useState<JobDto[] | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            const jobs = await getJobsData();
            if (!jobs) return
            setJobs(jobs);
        }
        fetchJobs();
    }, []);

    return {
        jobs
    }
}