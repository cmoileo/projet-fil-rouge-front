import {NavItem} from "../components/navItem/navItem.tsx";
import {useContext, useEffect, useRef, useState} from "react";
import {FolderType} from "../../types/folder/folder.type.ts";
import {getFolders} from "../../repository/folder/getAll.data.ts";
import {CircleUserRound} from "lucide-react";
import {DashboardContext} from "../../contexts/dashboard.context.tsx";
import {Link} from "react-router-dom";

type NavItemType = {
    name: string;
    path?: string;
    className: string;
    isPlusIcon: boolean;
}

export const Navbar = () => {
    const [folders, setFolders] = useState<FolderType[]>([]);
    const navbarRef = useRef<HTMLDivElement>(null);
    const {account} = useContext(DashboardContext);

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
                <NavItem setFolders={setFolders} navbarRef={navbarRef} id={folder.id} key={folder.id} name={folder.name} className={`padding-400-left p-m`} isPlusIcon={true}/>
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
        <nav ref={navbarRef} className={"sticky top-0 bg-grey-100 h-screen min-w-fit padding-200 flex flex-col justify-between overflow-y-auto overflow-x-hidden scrollbar-hide"}>
            <div className="flex flex-col gap-1000">
                <ul className={"flex flex-col w-60 gap-300 margin-600-top overflow-y-auto overflow-x-hidden scrollbar-hide"}>
                    {
                        navItems1.map((item, index) => (
                            <NavItem id={`nav-item-${index}`} key={index} name={item.name} path={item.path}
                                     className={item.className} isPlusIcon={false}/>
                        ))}
                </ul>
                <ul className={"flex flex-col w-60 gap-300"}>
                    {folders?.map((folder) => (
                        <li key={folder.id}>
                            {renderFolderItems(folder)}
                        </li>
                    ))}
                </ul>
            </div>
            <Link to={"/dashboard/account"}>
                <div className="flex items-center gap-400 padding-300-bottom padding-300-left">
                         <CircleUserRound className={"cursor-pointer w-8 h-8"} />
                         <p className="p-xs">{account?.email}</p>
                </div>
            </Link>
        </nav>
    );
};