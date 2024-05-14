import {deleteJobData} from "../../../../../../../repository/jobs/delete-job.data.ts";
import {JobDto} from "../../../domain/dto/job.dto.ts";
import {Dispatch, SetStateAction} from "react";
import {editJobData} from "../../../../../../../repository/jobs/edit-job.data.ts";

export const useJobPillViewModel = (
    {
        setIsEdit,
        jobId,
        jobs,
        setJobs,
        inputRef
    }: {
        setIsEdit: (isOpen: boolean) => void;
        jobId: string;
        jobs: JobDto[] | null;
        setJobs: Dispatch<SetStateAction<JobDto[] | null>>;
        inputRef: React.RefObject<HTMLInputElement>;
    }
) => {
    const handleEdit = async () => {
        setIsEdit(true)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 10)
    }
    const handleValidateEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsEdit(false)
        const job = jobs?.find(job => job.id === jobId)
        if (!job) return
        const color = job.color
        const name = inputRef.current?.value
        if (!name) return
        await editJobData(jobId, name, color)
        const updatedJobs: JobDto[] | undefined = jobs?.map(job => {
            if (job.id === jobId) {
                return {
                    ...job,
                    name: name
                }
            }
            return job
        })
        if (updatedJobs) {
            setJobs(updatedJobs)
        }
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