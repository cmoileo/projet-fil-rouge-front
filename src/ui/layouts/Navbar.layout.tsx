import {NavItem} from "../components/navItem.tsx";
import {useEffect, useState} from "react";
import {FolderType} from "../../types/folder/folder.type.ts";
import {getFolders} from "../../repository/folder/getAll.data.ts";

type NavItemType = {
    name: string;
    path: string;
    className: string;
    isPlusIcon: boolean;
}

export const Navbar = () => {
    const [folders, setFolders] = useState<FolderType[] | undefined>([]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const fetchedFolders = await getFolders();
                setFolders(fetchedFolders);
            } catch (error) {
                console.error("Error fetching folders:", error);
            }
        };

        fetchFolders();
    }, []);

    const navItems1: NavItemType[] = [
        {name: "Home", path: "/dashboard/", className: "", isPlusIcon: false},
        {name: "Employees", path: "/dashboard/employees/", className: "", isPlusIcon: false},
    ]

    const renderFolderItems = (folder: FolderType): JSX.Element => {
        return (
            <>
                <NavItem key={folder.id} name={folder.name} path={`/dashboard/folder/${folder.id}`} className={"padding-400-left p-m"} isPlusIcon={false} />
                {folder.children && folder.children.map(child => (
                    <ul className={"flex flex-col w-60 gap-300 padding-400-left"} key={child.id}>
                        {renderFolderItems(child)}
                    </ul>
                ))}
            </>
        );
    };

    return (
        <nav className={"bg-grey-100 h-screen w-fit padding-200 flex flex-col gap-1000"}>
            <ul className={"flex flex-col w-60 gap-300"}>
                {
                    navItems1.map((item, index) => (
                        <NavItem key={index} name={item.name} path={item.path} className={item.className} isPlusIcon={false} />
                    ))}
            </ul>
            <ul className={"flex flex-col w-60 gap-300"}>
                <NavItem name={"Projects"} path={"/dashboard/projects/"} className={""} isPlusIcon={true} />
                {folders?.map(folder => (
                    <li key={folder.id}>
                        {renderFolderItems(folder)}
                    </li>
                ))}
            </ul>
        </nav>
    );
};