import {NavItem} from "../components/navItem.tsx";
import {getFolders} from "../../repository/folder/getAll.data.ts";

type NavItemType = {
    name: string;
    path: string;
    className: string;
    isPlusIcon: boolean;
}

export const Navbar = () => {
    const navItems1: NavItemType[] = [
        {name: "Home", path: "/dashboard/", className: "", isPlusIcon: false},
        {name: "Employees", path: "/dashboard/employees/", className: "", isPlusIcon: false},
    ]
    const navItems2: NavItemType[] = [
        {name: "Projects", path: "/dashboard/projects/", className: "", isPlusIcon: true},
    ]
    getFolders();
    return (
        <nav className={"bg-grey-100 h-screen w-fit padding-200 flex flex-col gap-1000"}>
            <ul className={"flex flex-col w-60 gap-300"}>
                {navItems1.map((item, index) => (
                    <NavItem key={index} name={item.name} path={item.path} className={item.className} isPlusIcon={false}/>
                ))}
            </ul>
            <ul className={"flex flex-col w-60 gap-300"}>
                {navItems2.map((item, index) => (
                    <NavItem key={index} name={item.name} path={item.path} className={item.className} isPlusIcon={item.isPlusIcon}/>
                ))}
            </ul>
        </nav>
    )
}