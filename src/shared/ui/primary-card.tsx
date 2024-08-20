import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/ui/utils.ts";

interface TaskCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  onClick?: () => void;
}

export const PrimaryCard = ({
  children,
  className,
  onClick,
}: TaskCardProps) => {
  return (
    <div
      className={cn(
        "flex bg-white justify-between w-full rounded-3xl border border-primary-blue px-4 py-3 text-primary-text",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
