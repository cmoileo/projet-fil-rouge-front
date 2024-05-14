import {deleteJobData} from "../../../../../../../repository/jobs/delete-job.data.ts";
import {JobDto} from "../../../domain/dto/job.dto.ts";
import {Dispatch, SetStateAction} from "react";

export const useJobPillViewModel = (
    {
        isEdit,
        setIsEdit,
        jobId,
        jobs,
        setJobs
    }: {
        isEdit: boolean;
        setIsEdit: (isOpen: boolean) => void;
        jobId: string;
        jobs: JobDto[] | null;
        setJobs: Dispatch<SetStateAction<JobDto[] | null>>;
    }
) => {
    const handleEdit = async () => {
        setIsEdit(true)
    }
    const handleValidateEdit = async () => {
        setIsEdit(false)
    }

    const handleDelete = async (id: string) => {
        await deleteJobData(id)
        const updatedJobs: JobDto[] | undefined = jobs?.filter(job => job.id !== id)
        if (updatedJobs) {
            setJobs(updatedJobs)
        }
    }

    return {
        handleEdit,
        handleValidateEdit,
        handleDelete
    }
}