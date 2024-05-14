import {MainButton} from "../../../../../../../ui/components/mainButton.tsx";
import {AddEmployeeViewModel} from "./AddEmployee.viewModel.tsx";
import {Input} from "../../../../../../../ui/components/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {RolesEnum} from "../../../../../../../const/roles.enum"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../../../../ui/components/select";
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
                        <Input required id={"email"} type={"email"} placeholder={"Email"}/>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent id={"role"}>
                                  <SelectItem key={RolesEnum.EMPLOYEE} value={RolesEnum.EMPLOYEE}>Employee</SelectItem>
                                <SelectItem key={RolesEnum.ADMIN} value={RolesEnum.ADMIN}>Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        <MainButton type={"submit"} children={"Add"}/>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
}