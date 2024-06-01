import {Slider} from "../../../../../../../ui/components/range.tsx";
import {useTaskPercentage} from "./task-percentage.viewModel.tsx";

export const TaskPercentageLayout = (
    {
        taskId,
        defaultValue
    } : {
        taskId: string | undefined,
        defaultValue: number
    }
) => {
    const {handleChangePercentage} = useTaskPercentage();

    return (
        <div>
            <Slider
                max={100}
                step={1}
                defaultValue={[defaultValue]}
                className={"min-w-52"}
                onValueCommit={(value) => handleChangePercentage(value, taskId)}
            />
        </div>
    )
}