import {Slider} from "../../../../../../../ui/components/range.tsx";
import {useTaskPercentage} from "./task-percentage.viewModel.tsx";

export const TaskPercentageLayout = (
    {
        taskId
    } : {
        taskId: string | undefined
    }
) => {
    const {handleChangePercentage} = useTaskPercentage();

    return (
        <div>
            <Slider
                max={100}
                step={1}
                defaultValue={[0]}
                className={"min-w-52"}
                onValueCommit={(value) => handleChangePercentage(value, taskId)}
            />
        </div>
    )
}