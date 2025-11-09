"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Camera, Check, UserRound, FileSpreadsheet } from "lucide-react";

type Props = {
  activeStep: number;
  type: "excel" | "avatar";
  size?: "sm" | "md" | "lg";
  accent?: "emerald" | "violet" | "sky" | "rose" | "zinc";
  labels?: [string, string, string];
  className?: string;
};

const ACCENTS = {
  emerald: {
    bg: "bg-emerald-500",
    text: "text-emerald-600",
    ring: "ring-emerald-300/60",
    grad: "from-emerald-400 via-emerald-500 to-emerald-600",
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-violet-600",
    ring: "ring-violet-300/60",
    grad: "from-violet-400 via-violet-500 to-violet-600",
  },
  sky: {
    bg: "bg-sky-500",
    text: "text-sky-600",
    ring: "ring-sky-300/60",
    grad: "from-sky-400 via-sky-500 to-sky-600",
  },
  rose: {
    bg: "bg-rose-500",
    text: "text-rose-600",
    ring: "ring-rose-300/60",
    grad: "from-rose-400 via-rose-500 to-rose-600",
  },
  zinc: {
    bg: "bg-zinc-900",
    text: "text-zinc-900",
    ring: "ring-zinc-300/60",
    grad: "from-zinc-700 via-zinc-800 to-zinc-900",
  },
};

const SIZES = {
  sm: {
    node: "h-8 w-8",
    icon: "h-4 w-4",
    label: "text-xs",
    pad: "p-1.5",
    y: "top-[50%]",
    trackH: "h-1",
  },
  md: {
    node: "h-12 w-12",
    icon: "h-6 w-6",
    label: "text-sm",
    pad: "p-2.5",
    y: "top-[42%]",
    trackH: "h-1.5",
  },
  lg: {
    node: "h-14 w-14",
    icon: "h-7 w-7",
    label: "text-base",
    pad: "p-3",
    y: "top-[40%]",
    trackH: "h-[7px]",
  },
};

const ProgressBar: React.FC<Props> = ({
  activeStep,
  type,
  size = "md",
  accent = "emerald",
  labels = ["Tải lên", "Phân tích", "Kết quả"],
  className,
}) => {
  const a = ACCENTS[accent];
  const s = SIZES[size];

  const percent = activeStep <= 1 ? 0 : activeStep === 2 ? 50 : 100;

  const StepIcon1 = type === "excel" ? FileSpreadsheet : Camera;

  return (
    <div
      className={cn(
        "relative w-full select-none",
        "rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-zinc-200/60 backdrop-blur",
        className
      )}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={3}
      aria-valuenow={activeStep}
      aria-label="Progress steps"
    >
      <div className={cn("relative mt-4")}>
        <div
          className={cn(
            "absolute inset-x-0",
            s.y,
            "-translate-y-1/2 rounded-full bg-zinc-200/70",
            s.trackH
          )}
        />

        <div
          className={cn(
            "absolute left-0",
            s.y,
            "-translate-y-1/2 rounded-full",
            s.trackH,
            "bg-gradient-to-r",
            a.grad,
            "transition-[width] duration-500 ease-out"
          )}
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />

        <div className="relative z-10 grid grid-cols-3 items-center">
          <StepNode
            active={activeStep >= 1}
            current={activeStep === 1}
            done={activeStep > 1}
            label={labels[0]}
            size={size}
            accent={accent}
          >
            {activeStep > 1 ? (
              <Check className={cn("text-white", s.icon)} />
            ) : (
              <StepIcon1 className={cn("text-white", s.icon)} />
            )}
          </StepNode>

          <StepNode
            active={activeStep >= 2}
            current={activeStep === 2}
            done={activeStep > 2}
            label={labels[1]}
            size={size}
            accent={accent}
          >
            {activeStep > 2 ? (
              <Check className={cn("text-white", s.icon)} />
            ) : (
              <UserRound className={cn("text-white", s.icon)} />
            )}
          </StepNode>

          <StepNode
            active={activeStep >= 3}
            current={activeStep === 3}
            done={activeStep > 3}
            label={labels[2]}
            size={size}
            accent={accent}
          >
            <Check className={cn("text-white", s.icon)} />
          </StepNode>
        </div>
      </div>
    </div>
  );
};

function StepNode({
  active,
  current,
  done,
  label,
  size,
  accent,
  children,
}: {
  active: boolean;
  current: boolean;
  done: boolean;
  label: string;
  size: keyof typeof SIZES;
  accent: keyof typeof ACCENTS;
  children: React.ReactNode;
}) {
  const a = ACCENTS[accent];
  const s = SIZES[size];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {current && (
          <span
            className={cn(
              "absolute inset-0 -z-10 animate-ping rounded-full",
              "ring-8",
              a.ring
            )}
          />
        )}
        <div
          className={cn(
            "grid place-items-center rounded-full shadow-md transition-all duration-300",
            s.node,
            active ? a.bg : "bg-zinc-300",
            current && "scale-[1.03]"
          )}
        >
          {children}
        </div>
      </div>
      <div
        className={cn(
          "mt-2 font-medium transition-colors",
          s.label,
          active ? a.text : "text-zinc-400"
        )}
      >
        {label}
      </div>
    </div>
  );
}

export default ProgressBar;
