import {useParams} from "react-router-dom";

export const useSingleProject = () => {
    const id = useParams().id;

    return {
        id
    }
}