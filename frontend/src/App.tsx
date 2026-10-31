import React from 'react';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/layout/Header';
import { StatGrid } from './components/layout/StatGrid';
import { DockMatrix } from './components/docks/DockMatrix';
import { QueueTable } from './components/queue/QueueTable';
import { CreateTicketDialog } from './components/queue/CreateTicketDialog';
import { LoginView } from './components/auth/LoginView';
import { RegistrationView } from './components/views/RegistrationView';
import { WarehouseView } from './components/views/WarehouseView';
import { DockOperatorView } from './components/views/DockOperatorView';
import { KppView } from './components/views/KppView';
import { buttonVariants } from './components/ui/button';
import { useAuth } from './hooks/useAuth';
import { useQueue } from './hooks/useQueue';
import { useDocks } from './hooks/useDocks';
import { useWebSocket } from './hooks/useWebSocket';
import {
  FileText,
  Package,
  Truck,
  ShieldCheck,
  Monitor,
  Database,
  ArrowRight,
  Radio,
  X,
  Sparkles,
} from 'lucide-react';

const QUICK_MODULES = [
  { title: 'Registratsiya', desc: 'AWB va chek berish', url: 'registration.html', icon: FileText },
  { title: 'Omborchi', desc: 'Yuklarni yig‘ish', url: 'warehouse.html', icon: Package },
  { title: 'Dok Operatori', desc: 'Yukni mashinaga ortish', url: 'dock.html', icon: Truck },
  { title: 'Dispetcherlik', desc: 'Audit va Excel hisobot', url: 'dispatcher.html', icon: ShieldCheck },
  { title: 'LED Tablo', desc: 'Kutish zali monitori', url: 'led-board.html', icon: Monitor },
  { title: 'Awery ERP', desc: 'Bojxona relizlari', url: 'awery-sim.html', icon: Database },
];

function CargoDashboard() {
  const {
    user,
    effectiveRole,
    simulatedRole,
    setSimulatedRole,
    isAuthenticated,
    isLoading: isAuthLoading,
    authError,
    login,
    logout,
  } = useAuth();

  const {
    summary,
    tickets,
    filteredTickets,
    isLoading: isQueueLoading,
    isRefreshing,
    searchQuery,
    setSearchQuery,
    refetch: refetchQueue,
    registerTicket,
  } = useQueue();

  const {
    docks,
    isLoading: isDocksLoading,
    callNextClient,
    refetchDocks,
  } = useDocks();

  const handleGlobalRefresh = () => {
    refetchQueue();
    refetchDocks();
  };

  const { isConnected, activeAlert, dismissAlert } = useWebSocket(
    refetchQueue,
    refetchDocks
  );

  // 1. If not authenticated, render corporate login view
  if (!isAuthenticated) {
    return (
      <LoginView
        onLogin={login}
        isLoading={isAuthLoading}
        errorMessage={authError}
      />
    );
  }

  // 2. Role-based view routing: Operators ONLY see their dedicated workspace
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header
        onRefresh={handleGlobalRefresh}
        isRefreshing={isRefreshing}
        isWsConnected={isConnected}
        user={user}
        simulatedRole={simulatedRole}
        onSimulateRole={setSimulatedRole}
        onLogout={logout}
      />

      {/* Real-time Push Call Alert Banner */}
      {activeAlert && (
        <div className="bg-primary text-white text-xs py-2 px-4 font-bold flex items-center justify-between shadow-sm animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 mx-auto">
            <Radio className="w-4 h-4 animate-pulse text-amber-300" />
            <span>{activeAlert}</span>
          </div>
          <button
            onClick={dismissAlert}
            className="text-white/80 hover:text-white"
            aria-label="Yopish"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* If Operator: ONLY render their dedicated workspace */}
        {effectiveRole === 'OPERATOR_REGISTRATION' && (
          <RegistrationView tickets={tickets} onRegisterTicket={registerTicket} />
        )}

        {effectiveRole === 'OPERATOR_WAREHOUSE' && (
          <WarehouseView tickets={tickets} onRefresh={handleGlobalRefresh} />
        )}

        {effectiveRole === 'OPERATOR_DOCK' && (
          <DockOperatorView
            docks={docks}
            tickets={tickets}
            onCallNext={callNextClient}
            onRefresh={handleGlobalRefresh}
          />
        )}

        {effectiveRole === 'OPERATOR_KPP' && (
          <KppView tickets={tickets} onRefresh={handleGlobalRefresh} />
        )}

        {/* If SuperAdmin or Admin: Render the Master Control Hub */}
        {(effectiveRole === 'SUPER_ADMIN' || effectiveRole === 'ADMIN' || !effectiveRole) && (
          <>
            {/* Top Control Banner */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                    TAS / UTTT RUNWAY 08L CARGO
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Elektron navbat tizimi faol
                  </span>
                  {isSuperAdmin && (
                    <span className="text-[11px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      SUPER ADMIN REJIMI
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Toshkent Xalqaro Aeroporti — Elektron Navbat Boshqaruv Markazi
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Import yuklarini qabul qilish, Awery ERP bojxona ruxsatnomalari, sklad yig‘uvi, universal 6 ta rampa doklari va KPP nazorati integratsiyasi.
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
                <CreateTicketDialog onSuccess={registerTicket} />

                <a
                  href="http://localhost:8085/dock.html"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'text-xs gap-1.5',
                  })}
                >
                  Dok Operatori
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* 5 KPI Stat Metrics Grid */}
            <StatGrid summary={summary} isLoading={isQueueLoading} />

            {/* Universal 6 Docks Matrix */}
            <DockMatrix
              docks={docks}
              isLoading={isDocksLoading}
              onCallNext={callNextClient}
            />

            {/* Quick Navigation Modules (For SuperAdmin / Admin) */}
            <nav
              aria-label="Tezkor modullar"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
            >
              {QUICK_MODULES.map((module) => {
                const Icon = module.icon;
                return (
                  <a
                    key={module.title}
                    href={`http://localhost:8085/${module.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-3.5 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center mb-2.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {module.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {module.desc}
                      </div>
                    </div>
                    <div className="text-[11px] font-semibold text-primary flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ochish <ArrowRight className="w-3 h-3" />
                    </div>
                  </a>
                );
              })}
            </nav>

            {/* Live Active Queue Table */}
            <QueueTable
              tickets={filteredTickets}
              isLoading={isQueueLoading}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        TAS Cargo QMS · Tashkent International Airport Cargo Terminal · SuperAdmin & RBAC Access Control
      </footer>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <CargoDashboard />
    </ErrorBoundary>
  );
}

export default App;
