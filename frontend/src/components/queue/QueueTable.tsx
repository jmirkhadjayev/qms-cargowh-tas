import React from 'react';
import { Ticket } from '../../types';
import { STATUS_CONFIG } from '../../constants';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { TableRowSkeleton } from '../common/LoadingSkeleton';
import { EmptyState } from '../common/EmptyState';
import { Search, X } from 'lucide-react';

interface QueueTableProps {
  tickets: Ticket[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

export const QueueTable: React.FC<QueueTableProps> = React.memo(
  ({ tickets, isLoading, searchQuery, onSearchChange, onClearSearch }) => {
    return (
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              Jonli Navbat va Arizalar Holati
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                {tickets.length} ta ariza
              </span>
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Terminaldagi barcha faol navbat talonlari va ularning hozirgi bosqichi
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Talon, AWB yoki mashina..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-7 py-1.5 text-xs bg-slate-50 w-48 sm:w-64"
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-4">Talon #</th>
                  <th className="py-2.5 px-4">AWB Raqami</th>
                  <th className="py-2.5 px-4">Yuk Egasi</th>
                  <th className="py-2.5 px-4">Avtomobil</th>
                  <th className="py-2.5 px-4">Joy / Vazn</th>
                  <th className="py-2.5 px-4">Kategoriya</th>
                  <th className="py-2.5 px-4">Dok</th>
                  <th className="py-2.5 px-4">Holati</th>
                  <th className="py-2.5 px-4 text-right">Vaqt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading && tickets.length === 0 ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} />)
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan={9}>
                      <EmptyState
                        title="Arizalar topilmadi"
                        description={
                          searchQuery
                            ? `"${searchQuery}" so'rovi bo'yicha talon mavjud emas`
                            : "Hozircha navbatda turgan arizalar yo'q"
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  tickets.map((t) => {
                    const statusMeta = STATUS_CONFIG[t.status] || {
                      label: t.status,
                      variant: 'outline',
                    };

                    return (
                      <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <span
                            className={`font-mono font-extrabold text-sm ${
                              t.isPriority ? 'text-amber-700' : 'text-blue-700'
                            }`}
                          >
                            {t.ticketNumber}
                          </span>
                          {t.isPriority && (
                            <Badge variant="priority" className="ml-1.5 text-[10px]">
                              PRIORITY
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">
                          {t.awbNumber}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {t.consigneeName}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {t.vehiclePlate || 'Piyoda'}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {t.totalPieces} dona · {t.totalWeightKg} kg
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="text-[10px]">
                            {t.category}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          {t.assignedDockNumber ? (
                            <span className="text-blue-700 font-bold">
                              Dock #{t.assignedDockNumber}
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={statusMeta.variant} className="text-[10px]">
                            {statusMeta.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-500">
                          {t.registeredAt
                            ? new Date(t.registeredAt).toLocaleTimeString('uz-UZ', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                              })
                            : '—'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }
);

QueueTable.displayName = 'QueueTable';

