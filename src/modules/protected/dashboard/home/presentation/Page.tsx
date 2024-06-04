import {MostUrgentTasksLayout} from "./layout/most-urgent-tasks/most-urgent-tasks.layout.tsx";
import {EmployeesOverviewLayout} from "./layout/employees-overview/employees-overview.layout.tsx";

export const HomePage = () => {
    return (
        <div className={'flex justify-between'}>
            <MostUrgentTasksLayout/>
            <EmployeesOverviewLayout/>
        </div>
    )
}