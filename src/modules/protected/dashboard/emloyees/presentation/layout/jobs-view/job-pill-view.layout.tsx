import {JobDto} from "../../../domain/dto/job.dto.ts";
import {CheckIcon, PenIcon, TrashIcon} from "lucide-react";
import {useJobPillViewModel} from "./use-job-pill.viewModel.tsx";
import {Dispatch, SetStateAction, useState} from "react";

export const JobPillViewLayout = (
    {
        jobs,
        setJobs,
        job
    } : {
        jobs: JobDto[] | null;
        setJobs: Dispatch<SetStateAction<JobDto[] | null>>;
        job: JobDto
    }
    ) => {
    const [isEdit, setIsEdit] = useState(false)
    const jobId = job.id
    const {handleEdit, handleValidateEdit, handleDelete} = useJobPillViewModel({isEdit, setIsEdit, jobId, setJobs, jobs})
  return (
      <form>
          <div className={"flex items-center gap-400 w-fit"} key={job.id}>
              {
                  isEdit ? (
                      <input style={{backgroundColor: job.color}}
                             className={"border-radius-full flex justify-center padding-500-x padding-200-y white p-xs w-28 text-center"}
                             type={"text"} defaultValue={job.name}/>
                  ) : (
                      <p style={{backgroundColor: job.color}}
                         className={"border-radius-full flex justify-center padding-500-x padding-200-y white p-xs w-28"}>{job.name}</p>
                  )
              }
              {
                  isEdit ? (
                      <CheckIcon onClick={handleValidateEdit} className={"cursor-pointer max-w-10"}></CheckIcon>
                  ) : (
                      <PenIcon onClick={handleEdit} className={"cursor-pointer max-w-10"}></PenIcon>
                  )
              }
              <TrashIcon onClick={() => handleDelete(job.id)} className={"cursor-pointer"}></TrashIcon>
          </div>
      </form>
  );
}