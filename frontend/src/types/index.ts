/**
 * TAS Cargo QMS — Enterprise Domain Types & Data Contracts
 * Clean Architecture Model Layer
 */

export type CargoCategory =
  | 'GENERAL'
  | 'PERISHABLE'
  | 'VALUABLE'
  | 'DANGEROUS'
  | 'HEAVY'
  | 'DIPLOMATIC';

export type TicketStatus =
  | 'REGISTERED'
  | 'WAITING'
  | 'PREPARATION_PENDING'
  | 'PREPARATION_IN_PROGRESS'
  | 'PREPARED'
  | 'CALLED_TO_DOCK'
  | 'AT_DOCK'
  | 'COMPLETED'
  | 'CANCELLED';

export type DockStatus = 'AVAILABLE' | 'OCCUPIED' | 'OUT_OF_SERVICE';

export interface Ticket {
  readonly id: number;
  readonly ticketNumber: string;
  readonly awbNumber: string;
  readonly consigneeName: string;
  readonly representativeName?: string;
  readonly vehiclePlate: string;
  readonly driverPhone?: string;
  readonly totalPieces: number;
  readonly totalWeightKg: number;
  readonly issuedPieces?: number;
  readonly category: CargoCategory;
  readonly status: TicketStatus;
  readonly isPriority: boolean;
  readonly storageLocation?: string;
  readonly assignedDockNumber?: number;
  readonly releasePermitNumber?: string;
  readonly registeredAt: string;
  readonly calledAt?: string;
  readonly completedAt?: string;
}

export interface Dock {
  readonly id: number;
  readonly dockNumber: number;
  readonly name: string;
  readonly status: DockStatus;
  readonly currentTicketNumber?: string;
  readonly currentVehiclePlate?: string;
  readonly lastStatusChange?: string;
}

export interface QueueSummary {
  readonly totalToday: number;
  readonly waitingInWarehouse: number;
  readonly preparingInWarehouse: number;
  readonly atDocks: number;
  readonly completedAtKpp: number;
  readonly activeDocksCount: number;
  readonly averageWaitMinutes: number;
}

export interface RegisterTicketPayload {
  readonly awbNumber: string;
  readonly vehiclePlate: string;
  readonly consigneeName: string;
  readonly representativeName?: string;
  readonly driverPhone?: string;
  readonly pieces: number;
  readonly weightKg: number;
  readonly category: CargoCategory;
  readonly isPriority: boolean;
  readonly storageLocation?: string;
}

export interface CallTicketPayload {
  readonly dockNumber: number;
  readonly ticketNumber?: string;
  readonly operatorName?: string;
}

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly timestamp?: string;
}
