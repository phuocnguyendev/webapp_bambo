import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & { className?: string };

const PageContent: FC<Props> = ({ children, className }) => {
  return <div className={cn("p-5", className)}>{children}</div>;
};

export default PageContent;
