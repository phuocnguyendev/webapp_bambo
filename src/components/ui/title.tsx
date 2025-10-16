import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";

type Props = {
  title: string;
  className?: string;
  removeBorder?: boolean;
};

const Title = (props: Props) => {
  const { title, className, removeBorder = false } = props;

  const trimmed = title.trim().replace(/\s+/g, " ");
  const isLong = trimmed.length > 75;
  const truncated = isLong ? `${trimmed.slice(0, 75)}...` : trimmed;

  const content = (
    <div
      className={`${
        !removeBorder ? "w-full border-b-2 border-green-700 " : ""
      }text-[28px] font-bold uppercase text-green-700 ${className}`}
    >
      {truncated}
    </div>
  );

  if (!isLong) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="top" className="text-sm max-w-xs">
          {trimmed}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Title;
