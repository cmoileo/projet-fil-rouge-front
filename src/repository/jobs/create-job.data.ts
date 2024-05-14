import {AddJobDto} from "../../modules/protected/dashboard/emloyees/domain/dto/add-job.dto.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";

export const createJobData = async (data: AddJobDto) => {
    try {
        const res = await fetch(ApiUrl.Jobs.Create, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookieManager.getCookie("token")}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error("Error while creating job");
        }
        return res.json();
    } catch (error) {
        console.log(error)
        return false
    }
}