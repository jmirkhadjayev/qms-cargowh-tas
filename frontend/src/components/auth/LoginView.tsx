import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  errorMessage: string | null;
}

const QUICK_ACCOUNTS = [
  {
    role: 'SUPER ADMIN',
    email: 'supperadmin@uzairports.com',
    pass: 'admin123',
    desc: 'Barcha oynalar, to‘liq tizim boshqaruvi',
    badgeVariant: 'priority' as const,
    color: 'border-blue-300 bg-blue-50/70',
  },
  {
    role: 'ADMIN',
    email: 'admin@uzairports.com',
    pass: 'admin123',
    desc: 'Dispetcherlik paneli va smena hisoboti',
    badgeVariant: 'default' as const,
    color: 'border-slate-200 bg-slate-50/70',
  },
  {
    role: 'REGISTRATSIYA',
    email: 'registration@uzairports.com',
    pass: 'tas123',
    desc: 'Faqat mijozlarni ro‘yxatga olish oynasi',
    badgeVariant: 'secondary' as const,
    color: 'border-sky-200 bg-sky-50/70',
  },
  {
    role: 'OMBOR (SKLAD)',
    email: 'warehouse@uzairports.com',
    pass: 'tas123',
    desc: 'Faqat skladda yuk yig‘ish oynasi',
    badgeVariant: 'secondary' as const,
    color: 'border-indigo-200 bg-indigo-50/70',
  },
  {
    role: 'DOK OPERATORI',
    email: 'dock@uzairports.com',
    pass: 'tas123',
    desc: 'Faqat yuklash va doklar boshqaruvi',
    badgeVariant: 'warning' as const,
    color: 'border-amber-200 bg-amber-50/70',
  },
  {
    role: 'KPP XAVFSIZLIK',
    email: 'kpp@uzairports.com',
    pass: 'tas123',
    desc: 'Faqat darvoza QR skaner va chiqish',
    badgeVariant: 'success' as const,
    color: 'border-emerald-200 bg-emerald-50/70',
  },
];

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  isLoading,
  errorMessage,
}) => {
  const [email, setEmail] = useState('supperadmin@uzairports.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    await onLogin(email, password);
  };

  const handleQuickFill = (accEmail: string, accPass: string) => {
    setEmail(accEmail);
    setPassword(accPass);
    onLogin(accEmail, accPass);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md space-y-4">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-xl shadow-md mb-1">
            TAS
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Toshkent Xalqaro Aeroporti
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Yuk Terminali (TAS Cargo) · Avtorizatsiya va Rolga Asoslangan Kirish (RBAC)
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Tizimga Kirish</CardTitle>
            <CardDescription className="text-xs">
              Xizmat emailingiz va parolingizni kiriting. Tizim avtomatik ravishda faqat sizning vazifangizga mos oynani ochadi.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Xizmat Emaili
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="supperadmin@uzairports.com"
                    className="pl-9 text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Parol
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 text-xs"
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full gap-2 mt-2">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Kirish <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          {/* 1-Click Fast Roles Selection */}
          <CardFooter className="flex-col items-start pt-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl space-y-2.5">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              1-Bosishda Tezkor Sinov Rollari
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              {QUICK_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleQuickFill(acc.email, acc.pass)}
                  className={`p-2 rounded-lg border text-left hover:shadow-sm transition-all ${acc.color}`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-extrabold text-slate-900 truncate">
                      {acc.role}
                    </span>
                    <Badge variant={acc.badgeVariant} className="text-[9px] px-1 py-0 font-bold">
                      {acc.pass}
                    </Badge>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 truncate">
                    {acc.email}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {acc.desc}
                  </div>
                </button>
              ))}
            </div>
          </CardFooter>
        </Card>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-400">
          Toshkent Xalqaro Aeroporti · TAS UTTT · Xavfsiz RBAC Tizimi
        </div>
      </div>
    </div>
  );
};
