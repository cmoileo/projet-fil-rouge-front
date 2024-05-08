
export const useNavitem = ({chevronIconRef }: {chevronIconRef:  React.RefObject<HTMLDivElement>}) => {
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

    return {
        chevronClickHandler,
    }
}