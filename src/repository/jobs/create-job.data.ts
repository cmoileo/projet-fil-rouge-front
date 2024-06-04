import {AddJobDto} from "../../modules/protected/dashboard/emloyees/domain/dto/add-job.dto.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {toast} from "react-toastify";

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
            toast("❌ An error occurred while creating the job");
            throw new Error("Error while creating job");
        }
        toast("✅ Job created successfully");
        return res.json();
    } catch (error) {
        console.log(error)
        return false
    }
}