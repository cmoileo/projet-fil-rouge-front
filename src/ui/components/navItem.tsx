import {Link} from "react-router-dom";
import {cn} from "../../services/shadcn/utils.ts";
import {PlusIcon} from "lucide-react";


export const NavItem = (props: { name: string, path: string, className: string; isPlusIcon: boolean }) => (
    <li className={cn(
        "p-m transition blue-1000 border-radius-100 padding-200-x cursor-pointer padding-100-y flex justify-between hover-bg-grey-200 items-center relative group",
        props.className
    )}>
        <Link to={props.path}>{props.name}</Link>
        {
        props.isPlusIcon && (
            <PlusIcon className="hidden group-hover:block text-200" />
        )
    }
    </li>
);
