import {NavItem} from "../components/navItem.tsx";

export const Navbar = () => {
    const navItems1 = [
        {name: "Signin", path: "/dashboard/", className: ""},
        {name: "Signup", path: "/dashboard/", className: ""},
        {name: "Dashboard", path: "/dashboard/", className: ""},
    ]
    const navItems2 = [
        {name: "Projects", path: "/dashboard/", className: ""},
        {name: "Signup", path: "/dashboard/", className: ""},
        {name: "Dashboard", path: "/dashboard/", className: ""},
    ]
    return (
        <nav className={"bg-grey-100 h-screen w-fit padding-200 flex flex-col gap-1000"}>
            <ul className={"flex flex-col w-60 gap-300"}>
                {navItems1.map((item, index) => (
                    <NavItem key={index} name={item.name} path={item.path} className={item.className}/>
                ))}
            </ul>
            <ul className={"flex flex-col w-60 gap-300"}>
                {navItems2.map((item, index) => (
                    <NavItem key={index} name={item.name} path={item.path} className={item.className}/>
                ))}
            </ul>
        </nav>
    )
}