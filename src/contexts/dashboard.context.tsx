import {createContext, useState} from "react";
import {JobDto} from "../modules/protected/dashboard/emloyees/domain/dto/job.dto.ts";

export const DashboardContext = createContext<{ jobs: JobDto[]; setJobs: React.Dispatch<React.SetStateAction<JobDto[]>> }>({ jobs: [], setJobs: () => {} });

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<JobDto[]>([]);

    return (
        <DashboardContext.Provider value={{ jobs, setJobs }}>
            {children}
        </DashboardContext.Provider>
    );
};
