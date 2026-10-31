import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Ticket } from '../../types';
import { Package, MapPin, CheckCircle, Clock } from 'lucide-react';

interface WarehouseViewProps {
  tickets: Ticket[];
  onRefresh: () => void;
}

export const WarehouseView: React.FC<WarehouseViewProps> = ({ tickets, onRefresh }) => {
  const warehouseTasks = tickets.filter(
    (t) =>
      t.status === 'REGISTERED' ||
      t.status === 'PREPARATION_PENDING' ||
      t.status === 'PREPARATION_IN_PROGRESS' ||
      t.status === 'PREPARED'
  );

  const handleStartPrep = async (ticketId: number) => {
    try {
      await fetch(`/api/warehouse/start-prep?ticketId=${ticketId}`, { method: 'POST' });
      onRefresh();
    } catch {
      alert('Xatolik');
    }
  };

  const handleCompletePrep = async (ticketId: number) => {
    try {
      await fetch(`/api/warehouse/complete-prep?ticketId=${ticketId}`, { method: 'POST' });
      onRefresh();
    } catch {
      alert('Xatolik');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-indigo-950">
              Ombor Xodimi Ish Stoli (Sklad / 2-Bosqich)
            </h2>
            <p className="text-xs text-indigo-700">
              Sizga faqat omborda yuklarni yig'ish va ularni dokka yetkazilgan deb tasdiqlash huquqi berilgan.
            </p>
          </div>
        </div>
        <Badge variant="default" className="bg-indigo-700 text-white">
          SKLAD PORTALI
        </Badge>
      </div>

      <div className="space-y-3">
        {warehouseTasks.length === 0 ? (
          <Card className="p-8 text-center text-slate-400 text-xs">
            Hozircha omborda yig'ilishi kerak bo'lgan vazifalar mavjud emas
          </Card>
        ) : (
          warehouseTasks.map((t) => {
            const isPreparing = t.status === 'PREPARATION_IN_PROGRESS';
            const isPrepared = t.status === 'PREPARED';

            return (
              <Card key={t.id} className="p-4 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-base text-blue-700">
                      {t.ticketNumber}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      AWB: {t.awbNumber}
                    </span>
                    {t.isPriority && (
                      <Badge variant="priority" className="text-[10px]">
                        PRIORITY
                      </Badge>
                    )}
                    <Badge variant={isPrepared ? 'success' : isPreparing ? 'warning' : 'secondary'} className="text-[10px]">
                      {t.status}
                    </Badge>
                  </div>

                  <div className="text-xs text-slate-600">
                    Yuk egasi: <strong className="text-slate-900">{t.consigneeName}</strong> &bull; Joy:{' '}
                    <strong>{t.totalPieces} dona</strong> &bull; Vazn: <strong>{t.totalWeightKg} kg</strong>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-mono font-bold mt-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-fit">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    Ombordagi Yacheyka: {t.storageLocation || 'Sklad 1, Rampa A, Yacheyka 14-B'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isPreparing && !isPrepared && (
                    <Button size="sm" variant="outline" onClick={() => handleStartPrep(t.id)} className="text-xs">
                      Yig'ishni Boshlash
                    </Button>
                  )}
                  {isPreparing && (
                    <Button size="sm" onClick={() => handleCompletePrep(t.id)} className="text-xs bg-emerald-600 hover:bg-emerald-700">
                      Dokka Yetkazildi &rarr;
                    </Button>
                  )}
                  {isPrepared && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Dokka Tayyor
                    </span>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

