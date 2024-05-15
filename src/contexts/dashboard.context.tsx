import {createContext, useEffect, useState} from "react";
import {JobDto} from "../modules/protected/dashboard/emloyees/domain/dto/job.dto.ts";
import {AccountType} from "../types/account/account.type.ts";
import {getUserByIdData} from "../repository/account/get-user-by-id.data.ts";

export const DashboardContext =
    createContext<{
        jobs: JobDto[];
        setJobs: React.Dispatch<React.SetStateAction<JobDto[]>>;
        account: AccountType | null;
    }>(
        {
            jobs: [],
            setJobs: () => {},
            account: null,
        });

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<JobDto[]>([]);
    const [account, setAccount] = useState<AccountType | null>(null);

    useEffect(() => {
        const getAccount = async(): Promise<void> => {
            const account = await getUserByIdData();
            if (account) {
                setAccount(account);
            }
        }
        getAccount();
    }, []);

    return (
        <DashboardContext.Provider value={{ jobs, setJobs, account }}>
            {children}
        </DashboardContext.Provider>
    );
};
