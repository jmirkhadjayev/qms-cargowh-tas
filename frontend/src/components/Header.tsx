import React, { useState, useEffect } from "react";
import { Plane, Clock, RefreshCw, BarChart3, ExternalLink } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, isRefreshing }) => {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("uz-UZ", { hour12: false }) + " (Toshkent)");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold tracking-wider text-base shadow-sm">
            TAS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                TAS CARGO LOGISTICS HUB
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                FAOL
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Toshkent Xalqaro Aeroporti · Elektron Navbat va Dispetcherlik
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {timeStr}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="text-xs gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
            Yangilash
          </Button>

          <a
            href="http://localhost:5555/dispatcher.html"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "sm", className: "text-xs gap-1.5" })}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Dispetcher Paneli
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </header>
  );
};

