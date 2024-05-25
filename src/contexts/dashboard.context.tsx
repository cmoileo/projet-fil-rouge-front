import {createContext, useEffect, useState} from "react";
import {JobDto} from "../modules/protected/dashboard/emloyees/domain/dto/job.dto.ts";
import {AccountType} from "../types/account/account.type.ts";
import {getUserByIdData} from "../repository/account/get-user-by-id.data.ts";
import {ProjectType} from "../types/project/projet.type.ts";
import {getProjectsData} from "../repository/project/get-projects.data.ts";
import {TaskCategoryType} from "../types/task-categories/task-category.type.ts";
import {getTaskCategoriesData} from "../repository/task/get-task-categories.data.ts";

export const DashboardContext =
    createContext<{
        jobs: JobDto[];
        setJobs: React.Dispatch<React.SetStateAction<JobDto[]>>;
        account: AccountType | null;
        setAccount: React.Dispatch<React.SetStateAction<AccountType | null>>;
        projects: ProjectType[] | null;
        setProjects: React.Dispatch<React.SetStateAction<ProjectType[] | null>>;
        taskCategories: TaskCategoryType[] | null;
        setTaskCategories: React.Dispatch<React.SetStateAction<TaskCategoryType[] | null>>;
    }>(
        {
            jobs: [],
            setJobs: () => {},
            account: null,
            setAccount: () => {},
            projects: null,
            setProjects: () => {},
            taskCategories: null,
            setTaskCategories: () => {},
        });

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<JobDto[]>([]);
    const [account, setAccount] = useState<AccountType | null>(null);
    const [projects, setProjects] = useState<ProjectType[] | null>(null);
    const [taskCategories, setTaskCategories] = useState<TaskCategoryType[] | null>(null);

    useEffect(() => {
        const getAccount = async(): Promise<void> => {
            const account = await getUserByIdData();
            if (account) {
                setAccount(account);
            }
        }
        const fetchProjects = async () => {
            const projects = await getProjectsData()
            if (projects) {
                setProjects(projects)
            }
        }
        const fetchTaskCategories = async () => {
            const taskCategories = await getTaskCategoriesData();
            if (taskCategories) {
                setTaskCategories(taskCategories);
            }
        }
        fetchProjects();
        getAccount();
        fetchTaskCategories()
    }, []);

    return (
        <DashboardContext.Provider value={{ jobs, setJobs, account, setAccount, projects, setProjects, taskCategories, setTaskCategories }}>
            {children}
        </DashboardContext.Provider>
    );
};
