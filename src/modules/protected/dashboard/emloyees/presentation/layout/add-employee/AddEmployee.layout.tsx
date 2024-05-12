import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {AddEmployeeViewModel} from "./AddEmployee.viewModel.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";

export const AddEmployeeLayout = () => {
    const {handleClick} = AddEmployeeViewModel();
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <MainButton onClick={handleClick} children={"Add an empoloyee"} />
                </PopoverTrigger>
                <PopoverContent align={"start"} className="w-80 margin-400-top">
                    <form className={"w-full flex flex-col gap-400 padding-400 border-radius-300 z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_0px_50px_0px]"}>
                        <label htmlFor="email"></label>
                        <Input id={"email"} type={"email"} placeholder={"Email"}/>
                        <MainButton children={"Add"}/>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
}