import {ProjectType} from "../../types/project/projet.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const createProject = async (data: ProjectType) => {
    try {
        const res = await fetch(ApiUrl.Projects.Create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie()}`
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        return json;
    } catch (error) {
        console.error("Error creating project:", error);
    }
}