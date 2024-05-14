import {JobDto} from "../../modules/protected/dashboard/emloyees/domain/dto/job.dto.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const getJobsData = async (): Promise<JobDto[] | undefined> => {
    try {
        const res = await fetch(ApiUrl.Jobs.Get, ({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie()
            },
        }))
        const data: JobDto[] = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}