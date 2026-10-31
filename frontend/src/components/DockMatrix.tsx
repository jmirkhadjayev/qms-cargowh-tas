import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Truck } from "lucide-react";

export interface DockDto {
  id: number;
  dockNumber: number;
  name: string;
  status: "AVAILABLE" | "OCCUPIED" | "OUT_OF_SERVICE";
  currentTicketNumber?: string;
  currentVehiclePlate?: string;
}

interface DockMatrixProps {
  docks: DockDto[];
}

export const DockMatrix: React.FC<DockMatrixProps> = ({ docks }) => {
  return (
    <Card>
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="w-4 h-4 text-primary" />
            Universal Doklar va Rampa Holati (Rampa 1 - 6)
          </CardTitle>
          <p className="text-xs text-slate-500 mt-1">
            Barcha 6 ta dok universal bo'lib, har qanday toifadagi yuklarni qabul qilishga tayyor.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Bo'sh
          </span>
          <span className="flex items-center gap-1 text-amber-700 ml-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Band
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {docks.map((dock) => {
            const isOccupied = dock.status === "OCCUPIED";
            return (
              <div
                key={dock.dockNumber}
                className={`p-3.5 rounded-lg border transition-all ${
                  isOccupied
                    ? "bg-amber-50/60 border-amber-300 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Dock #{dock.dockNumber}
                  </span>
                  <Badge
                    variant={isOccupied ? "warning" : "success"}
                    className="text-[10px] px-1.5 py-0.2"
                  >
                    {isOccupied ? "BAND" : "BO'SH"}
                  </Badge>
                </div>

                <div className="min-h-[50px] flex flex-col justify-center">
                  {dock.currentTicketNumber ? (
                    <div>
                      <div className="text-lg font-mono font-extrabold text-blue-700 leading-tight">
                        {dock.currentTicketNumber}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-slate-800 truncate mt-0.5">
                        {dock.currentVehiclePlate || "Piyoda"}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs font-medium text-slate-400 italic">
                      Navbat kutilmoqda
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

