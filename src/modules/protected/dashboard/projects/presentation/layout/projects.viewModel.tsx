import {useEffect, useState} from "react";
import {getProjectsData} from "../../../../../../repository/project/get-projects.data.ts";
import {ProjectType} from "../../../../../../types/project/projet.type.ts";

export const useProjects = () => {
    const [projects, setProjects] = useState<ProjectType[] | null>(null)
    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getProjectsData()
            if (projects) {
                setProjects(projects)
            }
        }

        fetchProjects()
    }, []);

    return {
        projects
    }
}