import React, {Ref} from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../services/shadcn/utils.ts';
import { PlusIcon, ChevronDownIcon } from 'lucide-react';
import {useNavitem} from "./navItem.viewModel.tsx"
import {useDrag} from 'react-dnd';

interface NavItemProps {
    name: string;
    path?: string;
    className: string;
    isPlusIcon: boolean;
    parentUl?: Ref<HTMLDivElement>;
}

export const NavItem: React.FC<NavItemProps> = ({ name, path, className, isPlusIcon }) => {
    const baseStyle = "select-none grow p-m transition blue-1000 border-radius-100 padding-200-x cursor-pointer padding-100-y flex justify-between hover-bg-grey-200 items-center relative group";
    const iconStyle = "text-200 transition hover-bg-grey-300 border-radius-200";
    const chevronIconRef = React.useRef<HTMLDivElement>(null);
    const { chevronClickHandler } = useNavitem({ chevronIconRef });

    const ItemType = 'LI';
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { name, type: ItemType },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const linkElement = path ? (
        <Link to={path} className={cn(baseStyle, className)}>
            <div className={"flex gap-200 items-center"}>
                {name}
            </div>
            {isPlusIcon && <PlusIcon className="hidden group-hover:block text-200 transition hover-bg-grey-300 border-radius-200" />}
        </Link>
    ) : (
        <li ref={drag} className={cn(baseStyle, className)} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div className={"flex gap-200 items-center"}>
                <div ref={chevronIconRef} onClick={chevronClickHandler} className={iconStyle}>
                    <ChevronDownIcon className={"transition -rotate-90"} />
                </div>
                {name}
            </div>
            {isPlusIcon && <PlusIcon className="hidden group-hover:block text-200 transition hover-bg-grey-300 border-radius-200"/>}
        </li>
    );

    return linkElement;
};
