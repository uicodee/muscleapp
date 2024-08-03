import {HTMLAttributes, ReactNode} from "react";
import {cn} from "@/shared/ui/utils.ts";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}
export const Heading = ({children, className}: HeadingProps) => {
    return <h1 className={cn("text-2xl font-semibold text-primary-text", className)}>{children}</h1>
}