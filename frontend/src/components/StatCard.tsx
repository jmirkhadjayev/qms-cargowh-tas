import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  subtext: string;
  trendText?: string;
  progressPercent?: number;
  icon: React.ReactNode;
  accentColor?: "blue" | "amber" | "indigo" | "emerald" | "slate";
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  trendText = "Bugun",
  progressPercent = 65,
  icon,
  accentColor = "blue",
}) => {
  const colorMap = {
    blue: {
      bar: "bg-blue-600",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
      topBorder: "border-t-blue-600",
    },
    amber: {
      bar: "bg-amber-600",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      topBorder: "border-t-amber-500",
    },
    indigo: {
      bar: "bg-indigo-600",
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
      topBorder: "border-t-indigo-600",
    },
    emerald: {
      bar: "bg-emerald-600",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      topBorder: "border-t-emerald-600",
    },
    slate: {
      bar: "bg-slate-700",
      iconBg: "bg-slate-100 text-slate-700 border-slate-200",
      topBorder: "border-t-slate-700",
    },
  };

  const style = colorMap[accentColor] || colorMap.blue;

  return (
    <Card className={cn("p-5 border-t-[3px]", style.topBorder)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
          {label}
        </span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border", style.iconBg)}>
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <div className="text-3xl font-extrabold font-mono tracking-tight text-slate-900">
          {value}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
          <span className="font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
            {trendText}
          </span>
          <span>{subtext}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3.5">
        <div
          className={cn("h-full transition-all duration-500 rounded-full", style.bar)}
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>
    </Card>
  );
};

