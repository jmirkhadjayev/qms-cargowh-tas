import React, { useState } from 'react';
import { Dock } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Truck, Volume2, Loader2 } from 'lucide-react';

interface DockMatrixProps {
  docks: Dock[];
  isLoading: boolean;
  onCallNext?: (dockNumber: number) => Promise<unknown>;
}

export const DockMatrix: React.FC<DockMatrixProps> = ({
  docks,
  isLoading,
  onCallNext,
}) => {
  const [callingDock, setCallingDock] = useState<number | null>(null);

  const handleCall = async (dockNumber: number) => {
    if (!onCallNext) return;
    try {
      setCallingDock(dockNumber);
      await onCallNext(dockNumber);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Dokka chaqirishda xatolik');
    } finally {
      setCallingDock(null);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="w-4 h-4 text-primary" />
            Universal Doklar va Rampa Holati (Rampa 1 - 6)
          </CardTitle>
          <p className="text-xs text-slate-500 mt-1">
            Barcha 6 ta dok universal bo‘lib, har qanday toifadagi yuklarni qabul qilishga tayyor.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Bo'sh doklar
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Yuklanmoqda
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {docks.map((dock) => {
            const isOccupied = dock.status === 'OCCUPIED';
            const isCallingThis = callingDock === dock.dockNumber;

            return (
              <div
                key={dock.dockNumber}
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  isOccupied
                    ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Dock #{dock.dockNumber}
                    </span>
                    <Badge
                      variant={isOccupied ? 'warning' : 'success'}
                      className="text-[10px] px-1.5 py-0.5"
                    >
                      {isOccupied ? 'BAND' : 'BO‘SH'}
                    </Badge>
                  </div>

                  <div className="min-h-[52px] flex flex-col justify-center">
                    {dock.currentTicketNumber ? (
                      <div>
                        <div className="text-lg font-mono font-extrabold text-blue-700 leading-tight">
                          {dock.currentTicketNumber}
                        </div>
                        <div className="text-[11px] font-mono font-bold text-slate-800 truncate mt-0.5">
                          {dock.currentVehiclePlate || 'Piyoda'}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs font-medium text-slate-400 italic">
                        Navbat kutilmoqda
                      </div>
                    )}
                  </div>
                </div>

                {onCallNext && (
                  <Button
                    size="sm"
                    variant={isOccupied ? 'secondary' : 'outline'}
                    disabled={isCallingThis}
                    onClick={() => handleCall(dock.dockNumber)}
                    className="w-full mt-3 h-7 text-[11px] font-semibold gap-1"
                  >
                    {isCallingThis ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Volume2 className="w-3 h-3 text-primary" />
                    )}
                    {isOccupied ? 'Qayta Chaqir' : 'Mijoz Chaqirish'}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
