import {NavItem} from "../components/navItem/navItem.tsx";
import {useEffect, useRef, useState} from "react";
import {FolderType} from "../../types/folder/folder.type.ts";
import {getFolders} from "../../repository/folder/getAll.data.ts";

type NavItemType = {
    name: string;
    path?: string;
    className: string;
    isPlusIcon: boolean;
}

export const Navbar = () => {
    const [folders, setFolders] = useState<FolderType[]>([]);
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const fetchedFolders = await getFolders();
                if (!fetchedFolders) return;
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
        {name: "Projects", path: "/dashboard/projects/", className: "", isPlusIcon: false},
    ]

    const renderFolderItems = (folder: FolderType): JSX.Element => {
        return (
            <ul className={"flex flex-col gap-100 select-none h-10 overflow-hidden"}>
                <NavItem navbarRef={navbarRef} id={folder.id} key={folder.id} name={folder.name} className={`padding-400-left p-m`} isPlusIcon={true}/>
                {folder.projects && folder.projects.map(project => (
                    <NavItem folders={folders} setFolders={setFolders} project={project} id={folder.id} key={project.id} name={project.name} path={`/dashboard/project/${project.id}`}
                             className={`padding-600-left p-s`} isPlusIcon={false}/>
                ))}
                {folder.children && folder.children.map((child) => (
                    <ul className={"flex flex-col w-full gap-100 padding-400-left margin-200-top"} key={child.id}>
                        {renderFolderItems(child)}
                    </ul>
                ))}
            </ul>
        );
    };


    return (
        <nav ref={navbarRef} className={"bg-grey-100 h-screen w-fit padding-200 flex flex-col gap-1000 overflow-y-auto overflow-x-hidden scrollbar-hide"}>
            <ul className={"flex flex-col w-60 gap-300 margin-600-top"}>
                {
                    navItems1.map((item, index) => (
                        <NavItem id={`nav-item-${index}`} key={index} name={item.name} path={item.path} className={item.className} isPlusIcon={false} />
                    ))}
            </ul>
            <ul className={"flex flex-col w-60 gap-300"}>
                {folders?.map((folder) => (
                    <li key={folder.id}>
                        {renderFolderItems(folder)}
                    </li>
                ))}
            </ul>
        </nav>
    );
};