import React from 'react';
import { Card } from '../ui/card';

export const StatCardSkeleton: React.FC = () => (
  <Card className="p-5 border-t-[3px] border-t-slate-200 animate-pulse">
    <div className="flex justify-between items-center mb-3">
      <div className="h-3 w-20 bg-slate-200 rounded" />
      <div className="w-8 h-8 rounded-lg bg-slate-200" />
    </div>
    <div className="h-8 w-16 bg-slate-200 rounded mb-2" />
    <div className="h-3 w-28 bg-slate-100 rounded" />
    <div className="h-1.5 w-full bg-slate-100 rounded mt-4" />
  </Card>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 9 }).map((_, i) => (
      <td key={i} className="py-3.5 px-4">
        <div className="h-3.5 bg-slate-200 rounded w-full max-w-[80px]" />
      </td>
    ))}
  </tr>
);

