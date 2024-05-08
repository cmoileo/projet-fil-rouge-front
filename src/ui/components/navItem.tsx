import {Link} from "react-router-dom";
import {cn} from "../../services/shadcn/utils.ts";
import {PlusIcon} from "lucide-react";


interface NavItemProps {
    name: string;
    path: string | undefined;
    className: string;
    isPlusIcon: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ name, path, className, isPlusIcon }) => {
    const baseStyle = "grow p-m transition blue-1000 border-radius-100 padding-200-x cursor-pointer padding-100-y flex justify-between hover-bg-grey-200 items-center relative group";

    const linkElement = path ? (
        <Link to={path} className={cn(baseStyle, className)}>
            {name}
            {isPlusIcon && <PlusIcon className="hidden group-hover:block text-200" />}
        </Link>
    ) : (
        <li className={cn(baseStyle, className)}>
            {name}
            {isPlusIcon && <PlusIcon className="hidden group-hover:block text-200" />}
        </li>
    );

    return linkElement;
};
