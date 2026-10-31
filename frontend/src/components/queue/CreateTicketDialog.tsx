import React, { useState } from 'react';
import { RegisterTicketPayload, CargoCategory } from '../../types';
import { CATEGORY_LABELS } from '../../constants';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '../ui/dialog';
import { PlusCircle, Loader2 } from 'lucide-react';

interface CreateTicketDialogProps {
  onSuccess: (payload: RegisterTicketPayload) => Promise<unknown>;
}

export const CreateTicketDialog: React.FC<CreateTicketDialogProps> = ({
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [awbNumber, setAwbNumber] = useState('250-98765432');
  const [vehiclePlate, setVehiclePlate] = useState('01 777 AAA');
  const [consigneeName, setConsigneeName] = useState('TOSHKENT LOGISTICS MCHJ');
  const [pieces, setPieces] = useState(12);
  const [weightKg, setWeightKg] = useState(250);
  const [category, setCategory] = useState<CargoCategory>('GENERAL');
  const [isPriority, setIsPriority] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!awbNumber.trim() || !vehiclePlate.trim() || !consigneeName.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSuccess({
        awbNumber: awbNumber.trim(),
        vehiclePlate: vehiclePlate.trim().toUpperCase(),
        consigneeName: consigneeName.trim(),
        pieces: Number(pieces) || 1,
        weightKg: Number(weightKg) || 10,
        category,
        isPriority,
      });
      setIsOpen(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Talon berishda xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs gap-1.5 shadow-sm">
          <PlusCircle className="w-3.5 h-3.5" />
          Yangi Talon Yaratish
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yangi Mijozni Ro'yxatdan O'tkazish</DialogTitle>
            <DialogDescription>
              AWB raqami Awery ERP bilan tekshiriladi va avtomatik elektron talon shakllanadi.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3.5 py-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Avianakladnoy (AWB) Raqami *
              </label>
              <Input
                value={awbNumber}
                onChange={(e) => setAwbNumber(e.target.value)}
                placeholder="250-98765432"
                className="font-mono text-sm font-bold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Avtomobil Davlat Raqami (UZB / Xalqaro) *
              </label>
              <Input
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                placeholder="01 777 AAA"
                className="font-mono text-sm uppercase font-bold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Yuk Egasi / Tashkilot Nomi *
              </label>
              <Input
                value={consigneeName}
                onChange={(e) => setConsigneeName(e.target.value)}
                placeholder="Kompaniya nomi"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Joy Soni (Dona)
                </label>
                <Input
                  type="number"
                  min="1"
                  value={pieces}
                  onChange={(e) => setPieces(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Og'irligi (kg)
                </label>
                <Input
                  type="number"
                  min="1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Yuk Kategoriyasi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CargoCategory)}
                className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => (
                  <option key={catKey} value={catKey}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="priorityCheck"
                checked={isPriority}
                onChange={(e) => setIsPriority(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <label
                htmlFor="priorityCheck"
                className="text-xs font-bold text-amber-800 cursor-pointer"
              >
                Imtiyozli navbat (Priority / Tez buziluvchi PER yuklar)
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setIsOpen(false)}
            >
              Bekor Qilish
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Talon Berish &rarr;
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
