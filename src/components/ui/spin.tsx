import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SpinProps {
  className?: string;
  duration?: number;
}

const SPIN_CONFIG = {
  className: "w-64 h-2 bg-gray-200 rounded-full overflow-hidden relative",
  barClassName: "h-full bg-green-700 transition-all duration-200 ease-linear",
  overlayClassName:
    "absolute inset-0 bg-green-700/20 animate-pulse rounded-full",
  textClassName: "text-green-700 font-medium text-sm",
  spinConfig: "text-base",
  duration: 2000,
};

const Spin = ({ className, duration }: SpinProps) => {
  const [progress, setProgress] = useState(0);
  const spinDuration = duration ?? SPIN_CONFIG.duration;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, spinDuration / 100);

    return () => clearInterval(interval);
  }, [spinDuration]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      <div className={SPIN_CONFIG.className}>
        <div
          className={SPIN_CONFIG.barClassName}
          style={{ width: `${progress}%` }}
        />
        <div className={SPIN_CONFIG.overlayClassName} />
      </div>
      <span className={SPIN_CONFIG.textClassName}>{progress}%</span>
      <span className={SPIN_CONFIG.spinConfig}>Đang tải dữ liệu</span>
    </div>
  );
};

export { Spin };
