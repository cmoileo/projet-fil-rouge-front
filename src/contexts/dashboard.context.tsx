import {createContext, useEffect, useState} from "react";
import {JobDto} from "../modules/protected/dashboard/emloyees/domain/dto/job.dto.ts";
import {AccountType} from "../types/account/account.type.ts";
import {getUserByIdData} from "../repository/account/get-user-by-id.data.ts";
import {ProjectType} from "../types/project/projet.type.ts";
import {getProjectsData} from "../repository/project/get-projects.data.ts";

export const DashboardContext =
    createContext<{
        jobs: JobDto[];
        setJobs: React.Dispatch<React.SetStateAction<JobDto[]>>;
        account: AccountType | null;
        setAccount: React.Dispatch<React.SetStateAction<AccountType | null>>;
        projects: ProjectType[] | null;
        setProjects: React.Dispatch<React.SetStateAction<ProjectType[] | null>>;
    }>(
        {
            jobs: [],
            setJobs: () => {},
            account: null,
            setAccount: () => {},
            projects: null,
            setProjects: () => {},
        });

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<JobDto[]>([]);
    const [account, setAccount] = useState<AccountType | null>(null);
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

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
        fetchProjects();
        getAccount();
    }, []);

    return (
        <DashboardContext.Provider value={{ jobs, setJobs, account, setAccount, projects, setProjects }}>
            {children}
        </DashboardContext.Provider>
    );
};
