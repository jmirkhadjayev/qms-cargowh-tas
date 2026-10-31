import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { StatCard } from "./components/StatCard";
import { DockMatrix, DockDto } from "./components/DockMatrix";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./components/ui/dialog";
import { wsService } from "./lib/websocket";
import {
  FileText,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  Search,
  ShieldCheck,
  Monitor,
  Database,
  ArrowRight,
  PlusCircle,
  Radio,
  Sparkles,
} from "lucide-react";

interface QueueSummary {
  totalToday: number;
  waitingInWarehouse: number;
  preparingInWarehouse: number;
  atDocks: number;
  completedAtKpp: number;
  activeDocksCount: number;
  averageWaitMinutes: number;
}

interface TicketDto {
  id: number;
  ticketNumber: string;
  awbNumber: string;
  consigneeName: string;
  vehiclePlate: string;
  totalPieces: number;
  totalWeightKg: number;
  category: string;
  status: string;
  isPriority: boolean;
  assignedDockNumber?: number;
  registeredAt: string;
}

export function App() {
  const [summary, setSummary] = useState<QueueSummary>({
    totalToday: 0,
    waitingInWarehouse: 0,
    preparingInWarehouse: 0,
    atDocks: 0,
    completedAtKpp: 0,
    activeDocksCount: 6,
    averageWaitMinutes: 0,
  });

  const [docks, setDocks] = useState<DockDto[]>([]);
  const [tickets, setTickets] = useState<TicketDto[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [lastNotification, setLastNotification] = useState<string | null>(null);

  // New ticket modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newAwb, setNewAwb] = useState("250-98765432");
  const [newPlate, setNewPlate] = useState("01 777 AAA");
  const [newConsignee, setNewConsignee] = useState("TOSHKENT LOGISTICS MCHJ");
  const [isPriority, setIsPriority] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const [sumRes, docksRes, ticketsRes] = await Promise.all([
        fetch("/api/queue/summary"),
        fetch("/api/docks"),
        fetch("/api/queue/recent"),
      ]);

      if (sumRes.ok) setSummary(await sumRes.json());
      if (docksRes.ok) setDocks(await docksRes.json());
      if (ticketsRes.ok) setTickets(await ticketsRes.json());
    } catch (err) {
      console.warn("API aloqasida xatolik:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Connect to Spring Boot WebSocket STOMP for live pushes
    wsService.connect(
      (update) => {
        setIsWsConnected(true);
        fetchData();
      },
      (dockUpdate) => {
        setIsWsConnected(true);
        fetchData();
      },
      (callMsg) => {
        setIsWsConnected(true);
        if (callMsg?.ticketNumber && callMsg?.dockNumber) {
          setLastNotification(
            `Talon ${callMsg.ticketNumber} -> Dok #${callMsg.dockNumber} ga chaqirildi!`
          );
          setTimeout(() => setLastNotification(null), 8000);
        }
        fetchData();
      }
    );

    const interval = setInterval(fetchData, 4000);
    return () => {
      clearInterval(interval);
      wsService.disconnect();
    };
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/queue/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          awbNumber: newAwb,
          vehiclePlate: newPlate,
          consigneeName: newConsignee,
          isPriority: isPriority,
          pieces: 12,
          weightKg: 250,
          category: "GENERAL",
        }),
      });

      if (res.ok) {
        setIsCreateOpen(false);
        fetchData();
        setLastNotification(`Yangi talon muvaffaqiyatli ro'yxatga olindi! (AWB: ${newAwb})`);
        setTimeout(() => setLastNotification(null), 5000);
      }
    } catch (err) {
      alert("Xatolik yuz berdi");
    }
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.ticketNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.awbNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.consigneeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vehiclePlate?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header onRefresh={fetchData} isRefreshing={isRefreshing} />

      {/* Live Audio / Call Banner */}
      {lastNotification && (
        <div className="bg-primary text-white text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
          <Radio className="w-4 h-4 animate-pulse text-amber-300" />
          <span>{lastNotification}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                TAS / UTTT CARGO RUNWAY 08L
              </span>
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Real-time WebSocket Ulangan
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Toshkent Xalqaro Aeroporti — Elektron Navbat Boshqaruv Markazi
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Import yuklarini qabul qilish, Awery ERP bojxona ruxsatnomalari, ombor yig'uvi, universal 6 ta rampa doklari va KPP nazorat portali.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* Create Ticket Modal */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="text-xs gap-1.5 bg-primary hover:bg-primary-hover shadow-sm">
                  <PlusCircle className="w-3.5 h-3.5" />
                  Yangi Talon Yaratish
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateTicket}>
                  <DialogHeader>
                    <DialogTitle>Yangi Mijozni Ro'yxatdan O'tkazish</DialogTitle>
                    <DialogDescription>
                      AWB raqami Awery ERP bilan tekshiriladi va avtomatik elektron talon chop etiladi.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Avianakladnoy (AWB) Raqami
                      </label>
                      <Input
                        value={newAwb}
                        onChange={(e) => setNewAwb(e.target.value)}
                        placeholder="Masalan: 250-98765432"
                        className="font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Avtomobil Davlat Raqami (UZB / Xalqaro)
                      </label>
                      <Input
                        value={newPlate}
                        onChange={(e) => setNewPlate(e.target.value)}
                        placeholder="01 777 AAA"
                        className="font-mono uppercase font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Yuk Egasi / Tashkilot Nomi
                      </label>
                      <Input
                        value={newConsignee}
                        onChange={(e) => setNewConsignee(e.target.value)}
                        placeholder="Kompaniya nomi"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="priorityCheck"
                        checked={isPriority}
                        onChange={(e) => setIsPriority(e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor="priorityCheck" className="text-xs font-bold text-amber-800 cursor-pointer">
                        Imtiyozli navbat (Priority / Tez buziluvchi PER yuklar)
                      </label>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Bekor Qilish
                    </Button>
                    <Button type="submit">
                      Talon Berish &rarr;
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button asChild variant="outline" size="sm" className="text-xs">
              <a href="http://localhost:8085/dock.html" target="_blank" rel="noreferrer">
                Dok Operatori &rarr;
              </a>
            </Button>
          </div>
        </div>

        {/* KPI Stats Grid */}
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
            progressPercent={40}
            accentColor="amber"
            icon={<Clock className="w-4 h-4" />}
          />
          <StatCard
            label="Sklad Yig'moqda"
            value={summary.preparingInWarehouse}
            subtext="Tayyorlanayotgan yuk"
            trendText="Yacheyka"
            progressPercent={60}
            accentColor="indigo"
            icon={<Package className="w-4 h-4" />}
          />
          <StatCard
            label="Dokda Berilmoqda"
            value={summary.atDocks}
            subtext="Rampa 1-6"
            trendText="Xizmatda"
            progressPercent={50}
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

        {/* 6 Docks Matrix */}
        <DockMatrix docks={docks} />

        {/* Quick Functional Modules Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { title: "Registratsiya", desc: "AWB va chek berish", url: "registration.html", icon: FileText },
            { title: "Omborchi", desc: "Yuklarni yig'ish", url: "warehouse.html", icon: Package },
            { title: "Dok Operatori", desc: "Yukni mashinaga yuklash", url: "dock.html", icon: Truck },
            { title: "Dispetcherlik", desc: "Audit va Excel hisobot", url: "dispatcher.html", icon: ShieldCheck },
            { title: "LED Tablo", desc: "Kutish zali monitori", url: "led-board.html", icon: Monitor },
            { title: "Awery ERP", desc: "Bojxona relizlari", url: "awery-sim.html", icon: Database },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <a
                key={m.title}
                href={`http://localhost:8085/${m.url}`}
                target="_blank"
                rel="noreferrer"
                className="group p-3.5 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center mb-2.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">
                    {m.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {m.desc}
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-primary flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ochish <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Live Active Queue Table */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                Jonli Navbat va Arizalar Holati
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  {filteredTickets.length} ta ariza
                </span>
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Terminaldagi barcha faol navbat talonlari va ularning hozirgi bosqichi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Talon, AWB yoki mashina..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-48 sm:w-60"
                />
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
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-8 text-slate-400">
                        Hozircha navbatda arizalar mavjud emas
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <span
                            className={`font-mono font-extrabold text-sm ${
                              t.isPriority ? "text-amber-700" : "text-blue-700"
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
                          {t.vehiclePlate || "Piyoda"}
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
                          <Badge
                            variant={
                              t.status === "COMPLETED"
                                ? "success"
                                : t.status === "AT_DOCK"
                                ? "warning"
                                : t.status === "PREPARATION_IN_PROGRESS"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-[10px]"
                          >
                            {t.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-500">
                          {t.registeredAt ? new Date(t.registeredAt).toLocaleTimeString("uz-UZ") : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-slate-200 bg-white py-3 px-6 text-center text-xs text-slate-500">
        TAS Cargo QMS · Tashkent International Airport Cargo Terminal · React 18 + Vite + Tailwind CSS + Lucide Icons + shadcn/ui
      </footer>
    </div>
  );
}
export default App;
