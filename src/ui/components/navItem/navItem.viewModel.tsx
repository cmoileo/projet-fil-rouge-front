import {useDrag, useDrop} from "react-dnd";

export const useNavitem = ({chevronIconRef, id }: {chevronIconRef:  React.RefObject<HTMLDivElement>, id: string}) => {
    const chevronClickHandler = () => {
        if (!chevronIconRef || !chevronIconRef.current) return;
        const parentUl = chevronIconRef.current.parentElement?.parentElement?.parentElement;
        if (!parentUl) return;
        const el = chevronIconRef.current.children[0]
        if (el.classList.contains("-rotate-90")) {
            el.classList.remove("-rotate-90");
            parentUl.classList.remove("h-10");
        } else {
            el.classList.add("-rotate-90");
            parentUl.classList.add("h-10");
        }
    }

    const ItemType = 'LI';
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { name, type: ItemType },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [{ isOver }, drop] = useDrop({
        accept: 'LI',
        drop: () => {
            const itemId = id;
            console.log(itemId, isDragging);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const style = {
        backgroundColor: isOver ? '#c7cbd1' : 'transparent',
    };

    return {
        chevronClickHandler,
        drag,
        drop,
        style
    }
}