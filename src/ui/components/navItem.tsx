import {Link} from "react-router-dom";
import {cn} from "../../services/shadcn/utils.ts";
import {PlusIcon} from "lucide-react";


export const NavItem = (props: { name: string, path: string, className: string; isPlusIcon: boolean }) => {
    const basestyle = "grow p-m transition blue-1000 border-radius-100 padding-200-x cursor-pointer padding-100-y flex justify-between hover-bg-grey-200 items-center relative group"
    return (
        <Link to={props.path}>
            <li className={cn(
                basestyle,
                props.className
            )}>
               {props.name}
                {
                    props.isPlusIcon && (
                        <PlusIcon className="hidden group-hover:block text-200"/>
                    )
                }
            </li>
        </Link>
    );
}
