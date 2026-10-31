import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { RegisterTicketPayload, CargoCategory, Ticket } from '../../types';
import { CATEGORY_LABELS } from '../../constants';
import { FileText, Search, PlusCircle, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';

interface RegistrationViewProps {
  tickets: Ticket[];
  onRegisterTicket: (payload: RegisterTicketPayload) => Promise<unknown>;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  tickets,
  onRegisterTicket,
}) => {
  const [awbNumber, setAwbNumber] = useState('250-84920183');
  const [vehiclePlate, setVehiclePlate] = useState('01 777 AAA');
  const [consigneeName, setConsigneeName] = useState("OOO 'Silk Road Logistics'");
  const [pieces, setPieces] = useState(18);
  const [weightKg, setWeightKg] = useState(420.5);
  const [category, setCategory] = useState<CargoCategory>('GENERAL');
  const [isPriority, setIsPriority] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastIssuedTicket, setLastIssuedTicket] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await onRegisterTicket({
        awbNumber: awbNumber.trim(),
        vehiclePlate: vehiclePlate.trim().toUpperCase(),
        consigneeName: consigneeName.trim(),
        pieces: Number(pieces) || 1,
        weightKg: Number(weightKg) || 10,
        category,
        isPriority,
      });
      setLastIssuedTicket(res);
      alert(`Talon muvaffaqiyatli shakllantirildi! AWB: ${awbNumber}`);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const registeredTickets = tickets.filter(
    (t) => t.status === 'REGISTERED' || t.status === 'PREPARATION_PENDING' || t.status === 'WAITING'
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-sky-950">
              Registratsiya Xodimi Ish Stoli (1-Bosqich)
            </h2>
            <p className="text-xs text-sky-700">
              Sizga faqat mijozlarni ro'yxatga olish va elektron navbat taloni chop etish huquqi berilgan.
            </p>
          </div>
        </div>
        <Badge variant="default" className="bg-sky-700 text-white">
          REGISTRATSIYA PORTALI
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-5">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-primary" />
                Yangi Talon Berish va Ro'yxatga Olish
              </CardTitle>
              <CardDescription className="text-xs">
                Mijoz AWB raqami va avtomobil davlat raqamini kiritib talon bering.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Avianakladnoy (AWB) Raqami *
                  </label>
                  <Input
                    value={awbNumber}
                    onChange={(e) => setAwbNumber(e.target.value)}
                    placeholder="250-XXXXXXXX"
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
                    className="font-mono text-sm font-bold uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Yuk Egasi (Consignee) *
                  </label>
                  <Input
                    value={consigneeName}
                    onChange={(e) => setConsigneeName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Joylar Soni
                    </label>
                    <Input
                      type="number"
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
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CargoCategory)}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
                      <option key={k} value={k}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="prioCheck"
                    checked={isPriority}
                    onChange={(e) => setIsPriority(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="prioCheck" className="text-xs font-bold text-amber-800 cursor-pointer">
                    Imtiyozli navbat (Priority / PER tez buziluvchi)
                  </label>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full gap-2 mt-2">
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Talonni Chop Etish &rarr;
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Live Registrations Table */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Bugungi Ro'yxatdan O'tganlar</CardTitle>
                <CardDescription className="text-xs">
                  Siz ro'yxatga olgan mijozlarning hozirgi kutish va ombor holati
                </CardDescription>
              </div>
              <Badge variant="default">{registeredTickets.length} ta navbatda</Badge>
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
                      <th className="py-2.5 px-4">Holati</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registeredTickets.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          Hozircha navbatda turgan arizalar yo'q
                        </td>
                      </tr>
                    ) : (
                      registeredTickets.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-mono font-extrabold text-blue-700">
                            {t.ticketNumber}
                          </td>
                          <td className="py-2.5 px-4 font-mono font-bold">{t.awbNumber}</td>
                          <td className="py-2.5 px-4 font-semibold text-slate-800">{t.consigneeName}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-700">{t.vehiclePlate}</td>
                          <td className="py-2.5 px-4">
                            <Badge variant="secondary" className="text-[10px]">
                              {t.status}
                            </Badge>
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
      </div>
    </div>
  );
};

