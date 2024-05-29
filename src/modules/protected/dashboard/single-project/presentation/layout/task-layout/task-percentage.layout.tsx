import {Slider} from "../../../../../../../ui/components/range.tsx";

export const TaskPercentageLayout = () => {
    return (
        <div>
            <Slider
                max={100}
                step={1}
                defaultValue={[0]}
                className={"min-w-52"}
                onChange={(value) => console.log(value)}
            />
        </div>
    )
}