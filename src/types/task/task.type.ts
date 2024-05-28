import {EmployeeDto} from "../../modules/protected/dashboard/emloyees/domain/dto/employee.dto.ts";

export type TaskType = {
    id?: string;
    name: string;
    description?: string;
    task_category_id?: string;
    starting_date?: Date;
    finishing_date?: Date;
    progress_percentage?: number;
    is_priority?: 'low' | 'medium' | 'hard';
    project_id?: string;
    kanban_state_id?: number;
    agencyId?: string;
    userId?: string;
    task_state_id?: string;
    assigned_users_id?: string[];
    task_users?: EmployeeDto[];
};
