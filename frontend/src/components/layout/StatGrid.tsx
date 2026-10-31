import React from 'react';
import { QueueSummary } from '../../types';
import { StatCard } from '../StatCard';
import { StatCardSkeleton } from '../common/LoadingSkeleton';
import { FileText, Clock, Package, Truck, CheckCircle2 } from 'lucide-react';

interface StatGridProps {
  summary: QueueSummary;
  isLoading: boolean;
}

export const StatGrid: React.FC<StatGridProps> = ({ summary, isLoading }) => {
  if (isLoading && summary.totalToday === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard
        label="Bugungi Jami"
        value={summary.totalToday}
        subtext="Arizalar soni"
        trendText="Bugun"
        progressPercent={85}
        accentColor="blue"
        icon={<FileText className="w-4 h-4" />}
      />
      <StatCard
        label="Omborda Kutish"
        value={summary.waitingInWarehouse}
        subtext="Navbatdagi mijozlar"
        trendText="Kutish zali"
        progressPercent={Math.min(100, summary.waitingInWarehouse * 10)}
        accentColor="amber"
        icon={<Clock className="w-4 h-4" />}
      />
      <StatCard
        label="Sklad Yig'moqda"
        value={summary.preparingInWarehouse}
        subtext="Tayyorlanayotgan yuk"
        trendText="Yacheyka"
        progressPercent={Math.min(100, summary.preparingInWarehouse * 15)}
        accentColor="indigo"
        icon={<Package className="w-4 h-4" />}
      />
      <StatCard
        label="Dokda Berilmoqda"
        value={summary.atDocks}
        subtext="Rampa 1-6"
        trendText="Xizmatda"
        progressPercent={Math.min(100, (summary.atDocks / 6) * 100)}
        accentColor="blue"
        icon={<Truck className="w-4 h-4" />}
      />
      <StatCard
        label="KPP Chiqib Ketdi"
        value={summary.completedAtKpp}
        subtext="Muvaffaqiyatli yakun"
        trendText="Tugatildi"
        progressPercent={95}
        accentColor="emerald"
        icon={<CheckCircle2 className="w-4 h-4" />}
      />
    </div>
  );
};
