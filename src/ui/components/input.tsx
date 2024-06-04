import * as React from "react"

import { cn } from "../../services/shadcn/utils.ts"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex p-s focus:outline-none placeholder-grey-500 w-full padding-200-x padding-100-y border-radius-200 bg-grey-700",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
