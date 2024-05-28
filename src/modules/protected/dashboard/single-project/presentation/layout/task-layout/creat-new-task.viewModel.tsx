import {EmployeeDto} from "../../../../emloyees/domain/dto/employee.dto.ts";
import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {createTaskData} from "../../../../../../../repository/task/create-task.data.ts";
import {ProjectType} from "../../../../../../../types/project/projet.type.ts";
import {getProjectByIdData} from "../../../../../../../repository/project/get-project-by-id.data.ts";

export const useCreateNewTask = (
    {
        beginDate,
        endDate,
        selectedEmployees,
        categoryId,
        taskNameRef,
        setProject,
        projectId
    } : {
        beginDate: Date | undefined,
        endDate: Date | undefined,
        selectedEmployees: EmployeeDto[],
        categoryId: string | undefined,
        taskNameRef: React.RefObject<HTMLInputElement>;
        setProject: React.Dispatch<React.SetStateAction<ProjectType>>,
        projectId: string | undefined
    }
) => {
    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!taskNameRef.current?.value) return
        const data: TaskType = {
            name: taskNameRef.current?.value,
            task_category_id: categoryId,
            starting_date: beginDate!,
            finishing_date: endDate!,
            progress_percentage: 0,
            assigned_users_id: selectedEmployees.map(employee => employee.id),
        }
        await createTaskData(data)
        if (!projectId) return
        const project: ProjectType | undefined = await getProjectByIdData(projectId);
        if (project) setProject(project)
    }

    return {
        handleCreateTask
    }
}