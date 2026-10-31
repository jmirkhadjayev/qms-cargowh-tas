import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dock, Ticket } from '../../types';
import { Truck, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';

interface DockOperatorViewProps {
  docks: Dock[];
  tickets: Ticket[];
  onCallNext: (dockNumber: number) => Promise<unknown>;
  onRefresh: () => void;
}

export const DockOperatorView: React.FC<DockOperatorViewProps> = ({
  docks,
  tickets,
  onCallNext,
  onRefresh,
}) => {
  const atDockTickets = tickets.filter(
    (t) => t.status === 'CALLED_TO_DOCK' || t.status === 'AT_DOCK' || t.status === 'PREPARED'
  );

  const handleFinishIssue = async (ticketId: number, dockNumber: number) => {
    try {
      await fetch('/api/queue/dock/complete-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          dockNumber,
          operatorName: 'Dock_Agent_React',
          remarks: 'Yuk to‘liq topshirildi',
        }),
      });
      onRefresh();
      alert('Yuk berish muvaffaqiyatli yakunlandi! Mijoz KPP chiqishiga yo‘naltirildi.');
    } catch {
      alert('Xatolik');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-amber-950">
              Dok Operatori Ish Stoli (Rampa 1 - 6 / 3-Bosqich)
            </h2>
            <p className="text-xs text-amber-800">
              Sizga faqat universal doklarga mijoz chaqirish va yuk berishni tasdiqlash huquqi berilgan.
            </p>
          </div>
        </div>
        <Badge variant="default" className="bg-amber-700 text-white">
          DOK OPERATORI PORTALI
        </Badge>
      </div>

      {/* 6 Docks Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docks.map((dock) => {
          const isOccupied = dock.status === 'OCCUPIED';

          return (
            <Card key={dock.dockNumber} className="border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
                  Universal Dock #{dock.dockNumber}
                </span>
                <Badge variant={isOccupied ? 'warning' : 'success'} className="text-[10px]">
                  {isOccupied ? 'BAND' : 'BO‘SH'}
                </Badge>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 min-h-[70px] flex flex-col justify-center mb-3">
                {dock.currentTicketNumber ? (
                  <div>
                    <div className="text-xl font-mono font-extrabold text-blue-700">
                      {dock.currentTicketNumber}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">
                      Avto: {dock.currentVehiclePlate || 'Piyoda'}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic">Mijoz kutilmoqda</div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCallNext(dock.dockNumber)}
                  className="flex-1 text-xs gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-primary" />
                  {isOccupied ? 'Qayta Chaqir' : 'Navbatdagi Mijoz'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Active Loading Operations Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base">Hozirgi Dok Operatsiyalari</CardTitle>
          <CardDescription className="text-xs">
            Dokka chaqirilgan va yuk berilayotgan barcha arizalar
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                  <th className="py-2.5 px-4">Talon #</th>
                  <th className="py-2.5 px-4">AWB</th>
                  <th className="py-2.5 px-4">Yuk Egasi</th>
                  <th className="py-2.5 px-4">Avtomobil</th>
                  <th className="py-2.5 px-4">Dok #</th>
                  <th className="py-2.5 px-4 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {atDockTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Doklarda faol operatsiyalar mavjud emas
                    </td>
                  </tr>
                ) : (
                  atDockTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-extrabold text-blue-700">{t.ticketNumber}</td>
                      <td className="py-3 px-4 font-mono font-bold">{t.awbNumber}</td>
                      <td className="py-3 px-4 font-semibold">{t.consigneeName}</td>
                      <td className="py-3 px-4 font-mono text-slate-800">{t.vehiclePlate}</td>
                      <td className="py-3 px-4 font-bold text-amber-700">Dock #{t.assignedDockNumber || '1'}</td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          size="sm"
                          onClick={() => handleFinishIssue(t.id, t.assignedDockNumber || 1)}
                          className="text-xs bg-emerald-600 hover:bg-emerald-700 gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Berishni Yakunlash
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
