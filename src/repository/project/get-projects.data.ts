import {ProjectType} from "../../types/project/projet.type.ts";
import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const getProjectsData = async (): Promise<ProjectType[] | undefined> => {
    try {
        const res = await fetch(ApiUrl.Projects.Get, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieManager.getCookie('token')}`,
            },
        })
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}