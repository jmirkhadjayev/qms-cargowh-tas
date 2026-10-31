import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Ticket } from '../../types';
import { ShieldCheck, QrCode, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface KppViewProps {
  tickets: Ticket[];
  onRefresh: () => void;
}

export const KppView: React.FC<KppViewProps> = ({ tickets, onRefresh }) => {
  const [tokenInput, setTokenInput] = useState('A-001');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    try {
      setIsScanning(true);
      const res = await fetch(`/api/kpp/scan?token=${encodeURIComponent(tokenInput.trim())}`);
      const data = await res.json();
      setScanResult(data);
    } catch {
      alert('Skanerlashda xatolik');
    } finally {
      setIsScanning(false);
    }
  };

  const handleConfirmExit = async () => {
    if (!scanResult?.ticket) return;
    try {
      const res = await fetch('/api/kpp/confirm-exit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barcodeOrTicket: scanResult.ticket.ticketNumber,
          officerName: 'KPP_Post_1',
          remarks: 'Hujjatlar va yuk tekshirildi',
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Talon ${scanResult.ticket.ticketNumber} chiqishi tasdiqlandi! Shlagbaum ochildi.`);
        setScanResult(null);
        setTokenInput('');
        onRefresh();
      } else {
        alert(data.error || 'Xatolik');
      }
    } catch {
      alert('Xatolik');
    }
  };

  const completedTickets = tickets.filter((t) => t.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-emerald-950">
              KPP Qo'riqlash Punkti (Nazorat-o'tkazish / 4-Bosqich)
            </h2>
            <p className="text-xs text-emerald-800">
              Sizga faqat darvoza chiqishida talon QR-kodini tekshirish va transport chiqishini tasdiqlash huquqi berilgan.
            </p>
          </div>
        </div>
        <Badge variant="default" className="bg-emerald-700 text-white">
          KPP OFITSERI PORTALI
        </Badge>
      </div>

      {/* QR Scanner Box */}
      <Card className="border-slate-200 shadow-sm p-6 max-w-2xl mx-auto text-center border-t-4 border-t-emerald-600">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">
          Talon QR-kodini Skanerlang yoki Raqamni Kiriting
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Yuk terminalidan chiqayotgan mashinaning chekini skanerga tuting yoki talon raqamini kiriting.
        </p>

        <form onSubmit={handleScan} className="flex gap-2 max-w-md mx-auto mb-4">
          <Input
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="A-001"
            className="text-center font-mono font-bold text-base h-11"
            required
          />
          <Button type="submit" disabled={isScanning} className="h-11 px-6">
            {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Tekshirish'}
          </Button>
        </form>

        {/* Scan Result */}
        {scanResult && (
          <div className="mt-4 text-left">
            {!scanResult.success ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-semibold flex items-center gap-2">
                <XCircle className="w-5 h-5 flex-shrink-0" />
                <span>Bunday talon topilmadi. Raqamni qayta tekshiring.</span>
              </div>
            ) : scanResult.canExit ? (
              <div className="p-5 bg-emerald-50 border-2 border-emerald-400 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Chiqishga Ruxsat Beriladi (Approved)
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-emerald-700">
                    {scanResult.ticket?.ticketNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-lg border border-emerald-100">
                  <div>
                    <span className="text-slate-500 block text-[11px]">AWB Raqami</span>
                    <strong className="font-mono text-slate-800">{scanResult.ticket?.awbNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Avtomobil Raqami</span>
                    <strong className="font-mono text-slate-800">{scanResult.ticket?.vehiclePlate || 'Piyoda'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Yuk Egasi</span>
                    <strong className="text-slate-800">{scanResult.ticket?.consigneeName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Berilgan Joy</span>
                    <strong className="text-emerald-700">{scanResult.ticket?.totalPieces} dona</strong>
                  </div>
                </div>

                <Button onClick={handleConfirmExit} className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2 h-10">
                  <CheckCircle2 className="w-4 h-4" />
                  Avtomobil Chiqishini Tasdiqlash (Shlagbaum Ochildi)
                </Button>
              </div>
            ) : (
              <div className="p-5 bg-red-50 border-2 border-red-300 rounded-xl space-y-2">
                <div className="text-sm font-bold text-red-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  Taqiqlanadi: Ushbu yuk hali dokdan to‘liq berilmagan!
                </div>
                <div className="text-xs text-red-700">
                  Talon: <strong>{scanResult.ticket?.ticketNumber}</strong> &bull; Holati:{' '}
                  <strong>{scanResult.ticket?.status}</strong>
                </div>
                <p className="text-[11px] text-slate-600">
                  TZ talabi bo‘yicha, dokda berish jarayoni yakunlanmagan transport vositalarini KPP dan chiqarish qat'iyan taqiqlanadi.
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* History Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base">Bugun KPP Orqali Chiqib Ketganlar</CardTitle>
          <CardDescription className="text-xs">
            Darvozada QR-kod tekshirilib, chiqishi tasdiqlangan avtomobillar
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
                  <th className="py-2.5 px-4">Holati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {completedTickets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      Hozircha KPP dan chiqib ketgan avtomobillar qayd etilmagan
                    </td>
                  </tr>
                ) : (
                  completedTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{t.ticketNumber}</td>
                      <td className="py-2.5 px-4 font-mono">{t.awbNumber}</td>
                      <td className="py-2.5 px-4 font-semibold">{t.consigneeName}</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{t.vehiclePlate}</td>
                      <td className="py-2.5 px-4">
                        <Badge variant="success" className="text-[10px]">CHIQIB KETDI</Badge>
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
