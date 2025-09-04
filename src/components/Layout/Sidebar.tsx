import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  return (
    <ScrollArea
      type="hover"
      className={cn("h-full lg:h-[calc(100vh-60px)]", className)}
    >
      <aside className="p-4">Hi</aside>
    </ScrollArea>
  );
}
