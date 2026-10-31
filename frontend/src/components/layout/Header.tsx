import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../../constants';
import { AuthUser, UserRole } from '../../types/auth';
import { Button, buttonVariants } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, RefreshCw, BarChart3, ExternalLink, LogOut, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  isWsConnected: boolean;
  user: AuthUser | null;
  simulatedRole: UserRole | null;
  onSimulateRole: (role: UserRole | null) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  isRefreshing,
  isWsConnected,
  user,
  simulatedRole,
  onSimulateRole,
  onLogout,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('uz-UZ', {
          timeZone: APP_CONFIG.TIMEZONE,
          hour12: false,
        }) + ' (Toshkent)'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold tracking-wider text-base shadow-sm">
            TAS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                TAS CARGO LOGISTICS HUB
              </h1>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isWsConnected
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isWsConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                {isWsConnected ? 'JONLI WEBSOCKET' : 'POLLING REJIMI'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {APP_CONFIG.SUBTITLE}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* SuperAdmin Role Simulator Dropdown */}
          {isSuperAdmin && (
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sinov ko'rinishi:</span>
              <select
                value={simulatedRole || ''}
                onChange={(e) => onSimulateRole((e.target.value as UserRole) || null)}
                className="bg-white border border-amber-300 rounded px-1.5 py-0.5 text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="">★ Hamma Oynalar (SuperAdmin)</option>
                <option value="OPERATOR_REGISTRATION">Registratsiya Xodimi</option>
                <option value="OPERATOR_WAREHOUSE">Omborchi (Sklad)</option>
                <option value="OPERATOR_DOCK">Dok Operatori</option>
                <option value="OPERATOR_KPP">KPP Xodimi</option>
                <option value="ADMIN">Bosh Dispetcher (Admin)</option>
              </select>
            </div>
          )}

          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
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
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-primary' : ''}`}
            />
            Yangilash
          </Button>

          {/* User Profile Pill & Logout */}
          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 truncate max-w-[140px]">
                  {user.fullName || user.email}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">
                  {user.email}
                </div>
              </div>
              <Badge
                variant={isSuperAdmin ? 'priority' : 'default'}
                className="text-[10px] font-extrabold uppercase"
              >
                {user.role}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                title="Tizimdan chiqish"
                className="text-slate-500 hover:text-red-600 p-1.5 h-8 w-8"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
