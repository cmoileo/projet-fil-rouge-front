import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProjectByIdData} from "../../../../../../repository/project/get-project-by-id.data.ts";
import {ProjectType} from "../../../../../../types/project/projet.type.ts";

export const useSingleProject = () => {
    const id = useParams().id;
    const [project, setProject] = useState<ProjectType | null>(null);

    const fetchProject = async () => {
        if (!id) return;
        const project = await getProjectByIdData(id);
        if(!project) return;
        setProject(project);
    }

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            const project = await getProjectByIdData(id);
            if(!project) return;
            setProject(project);
        }

        fetchProject();
    }, [id]);


    return {
        project,
        setProject,
        fetchProject
    }
}