import {NavItem} from "../components/navItem/navItem.tsx";
import {ReactElement, useContext, useEffect, useRef, useState} from "react";
import {FolderType} from "../../types/folder/folder.type.ts";
import {getFolders} from "../../repository/folder/getAll.data.ts";
import {CircleUserRound, FolderIcon, HomeIcon, LogOutIcon, LucideProps, PlusIcon, UserIcon} from "lucide-react";
import {DashboardContext} from "../../contexts/dashboard.context.tsx";
import {Link} from "react-router-dom";
import {Popover, PopoverContent, PopoverTrigger} from "../components/Popup.tsx";
import {Input} from "../components/input.tsx";
import {MainButton} from "../components/mainButton.tsx";
import {useNavLayout} from "./navbar.viewModel";

type NavItemType = {
    name: string;
    path?: string;
    className: string;
    isPlusIcon: boolean;
    icon: ReactElement<LucideProps>;
}

export const Navbar = () => {
    const [folders, setFolders] = useState<FolderType[]>([]);
    const navbarRef = useRef<HTMLDivElement>(null);
    const {account} = useContext(DashboardContext);
    const { handleCreateFolder, isPopoverOpen, setIsPopoverOpen, handleLogout } = useNavLayout({setFolders});

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
        {name: "Home", path: "/dashboard/", className: "", isPlusIcon: false, icon: <HomeIcon color={"lightgrey"} />},
        {name: "Employees", path: "/dashboard/employees/", className: "", isPlusIcon: false, icon: <UserIcon color={"lightgrey"} />},
    ]

    const renderFolderItems = (folder: FolderType): JSX.Element => {
        return (
            <ul className={"flex lg:flex-col gap-100 select-none h-[40px] lg:overflow-hidden"}>
                <NavItem folders={folders} setFolders={setFolders} navbarRef={navbarRef} id={folder.id} key={folder.id} name={folder.name} className={`padding-400-left p-m`} isPlusIcon={true}/>
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
        <nav ref={navbarRef} className={"sticky z-10 lg:overflow-y-hidden max-lg:overflow-x-auto max-lg:min-w-full max-lg:flex-row top-0 bg-grey-800 lg:h-screen min-w-fit lg:padding-1000-bottom padding-200 flex flex-col justify-between lg:overflow-x-hidden scrollbar-hide"}>
            <div className="flex max-lg:flex-row max-lg:h-fit flex-col lg:gap-16">
                <ul className={"flex max-lg:h-fit flex-col max-lg:flex-row w-60 gap-300 lg:mt-8 max-lg:mt-4 max-lg:ml-2 lg:overflow-x-hidden scrollbar-hide"}>
                    {
                        navItems1.map((item, index) => (
                            <NavItem icon={item.icon} id={`nav-item-${index}`} key={index} name={item.name} path={item.path}
                                     className={item.className} isPlusIcon={false}/>
                        ))}
                </ul>
                <div>
                </div>
                <ul className={"flex max-lg:mt-3 lg:max-h-[70vh] max-lg:flex-row max-lg:h-fit lg:overflow-y-auto lg:padding-1000-bottom scrollbar-hide flex-col lg:w-60 max-lg:w-fit gap-300"}>
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger>
                            <div
                                className={"transition padding-200-x padding-300-left max-lg:mt-2 hover-bg-grey-700 border-radius-200 cursor-pointer flex justify-between items-center"}>
                                <div className={"flex gap-300 items-center"}>
                                    <FolderIcon color={"lightgrey"} />
                                    <p className="p-l grey-200">Folders</p>
                                </div>
                                <PlusIcon color={"lightgrey"} className={"transition hover-bg-grey-700 border-radius-200"}></PlusIcon>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className={"active bg-grey-600 border-bg-500"} align={"end"}>
                            <form onSubmit={handleCreateFolder} className={"flex flex-col gap-300"}>
                                <Input name={"folderTitle"} type={"text"} className={"grey-200"} placeholder={"Folder name"} />
                                <MainButton type={"submit"}>Create folder</MainButton>
                            </form>
                        </PopoverContent>
                    </Popover>
                    {folders?.map((folder) => (
                        <li key={folder.id}>
                            {renderFolderItems(folder)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"lg:absolute flex lg:flex-col gap-300 max-lg:mt-2 max-lg:h-fit bottom-0 left-0 w-full"}>
                <div onClick={handleLogout} className={"flex cursor-pointer gap-200 padding-400-left"}>
                    <LogOutIcon color={'white'}></LogOutIcon>
                    <p className={'p-xs grey-300'}>Logout</p>
                </div>
                <Link
                    className={"transition hover-bg-grey-700 w-full bg-grey-800 padding-200-top"} to={"/dashboard/account"}>
                    <div className="flex items-center gap-400 padding-300-bottom padding-300-left">
                        <CircleUserRound color={"lightgrey"} className={"cursor-pointer w-8 h-8"} />
                        <p className="p-xs grey-300">{account?.firstname} {account?.lastname}</p>
                    </div>
                </Link>
            </div>
        </nav>
    );
};