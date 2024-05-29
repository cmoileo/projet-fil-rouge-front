import {Slider} from "../../../../../../../ui/components/range.tsx";
import {useTaskPercentage} from "./task-percentage.viewModel.tsx";

export const TaskPercentageLayout = () => {
    const {handleChangePercentage} = useTaskPercentage();

    return (
        <div>
            <Slider
                max={100}
                step={1}
                defaultValue={[0]}
                className={"min-w-52"}
                onValueCommit={handleChangePercentage}
            />
        </div>
    )
}