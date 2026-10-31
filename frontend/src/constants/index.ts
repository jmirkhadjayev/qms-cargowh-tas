import { TicketStatus, CargoCategory, DockStatus } from '../types';

export const APP_CONFIG = {
  TITLE: 'Tashkent International Airport — Cargo QMS',
  SUBTITLE: 'Import yuklarini berish va elektron navbat boshqaruv markazi',
  AIRPORT_CODE: 'TAS / UTTT',
  POLLING_INTERVAL_MS: 4000,
  TIMEZONE: 'Asia/Tashkent',
  DEFAULT_TOTAL_DOCKS: 6,
} as const;

export const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' | 'priority' }
> = {
  REGISTERED: { label: "Ro'yxatga olindi", variant: 'default' },
  WAITING: { label: 'Kutmoqda', variant: 'outline' },
  PREPARATION_PENDING: { label: 'Yig‘uv kutilmoqda', variant: 'secondary' },
  PREPARATION_IN_PROGRESS: { label: 'Sklad yig‘moqda', variant: 'warning' },
  PREPARED: { label: 'Dokka tayyor', variant: 'success' },
  CALLED_TO_DOCK: { label: 'Dokka chaqirildi', variant: 'warning' },
  AT_DOCK: { label: 'Yuklanmoqda', variant: 'warning' },
  COMPLETED: { label: 'Chiqib ketdi', variant: 'success' },
  CANCELLED: { label: 'Bekor qilindi', variant: 'destructive' },
};

export const CATEGORY_LABELS: Record<CargoCategory, string> = {
  GENERAL: 'Oddiy yuk (GEN)',
  PERISHABLE: 'Tez buziluvchi (PER)',
  VALUABLE: 'Qimmatbaho (VAL)',
  DANGEROUS: 'Xavfli yuk (DGR)',
  HEAVY: 'Og‘ir yuk (HEA)',
  DIPLOMATIC: 'Diplomatik (DIP)',
};

