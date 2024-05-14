import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {AddEmployeeViewModel} from "./AddEmployee.viewModel.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
export const AddEmployeeLayout = () => {
    const {handleSubmit, isOpen, setIsOpen} = AddEmployeeViewModel();
    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <MainButton children={"Add an employee"} />
                </PopoverTrigger>
                <PopoverContent align={"start"} className="w-80 bg-white">
                    <form onSubmit={handleSubmit} className={"w-full flex flex-col gap-400 padding-400 border-radius-300 z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_0px_50px_0px]"}>
                        <Input id={"email"} type={"email"} placeholder={"Email"}/>
                        <Input id={"employeeRole"} type={"text"} placeholder={"Role"}/>
                        <MainButton type={"submit"} children={"Add"}/>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
}