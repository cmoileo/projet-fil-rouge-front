import {useEffect, useState} from "react";
import {getMostUrgentTasks} from "../../../../../../repository/task/get-most-urgent-tasks.data.ts";

export const useMostUrgentTasksViewModel = () => {
    const [mostUrgentTasks, setMostUrgentTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getMostUrgentTasks();
            setMostUrgentTasks(tasks);
        }
        fetchTasks();
    }, []);

    return {
        mostUrgentTasks
    }
}