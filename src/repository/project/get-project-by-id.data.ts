import {ProjectType} from "../../types/project/projet.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const getProjectByIdData = async (id: string): Promise<ProjectType | undefined> => {
    try {
        const res = await fetch(ApiUrl.Projects.Get + "/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookieManager.getCookie("token")}`
            },
        });
        if (res) {
            return await res.json();
        } else {
            return undefined;
        }
    } catch (error) {
        console.log(error)
    }
}