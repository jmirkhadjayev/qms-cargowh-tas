import { apiClient } from './client';
import {
  QueueSummary,
  Ticket,
  Dock,
  RegisterTicketPayload,
  CallTicketPayload,
} from '../types';

export const queueApi = {
  getSummary: (): Promise<QueueSummary> =>
    apiClient<QueueSummary>('/api/queue/summary'),

  getRecentTickets: (): Promise<Ticket[]> =>
    apiClient<Ticket[]>('/api/queue/recent'),

  getDocks: (): Promise<Dock[]> =>
    apiClient<Dock[]>('/api/docks'),

  registerTicket: (payload: RegisterTicketPayload): Promise<Ticket> =>
    apiClient<Ticket>('/api/queue/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  callNextToDock: (payload: CallTicketPayload): Promise<any> =>
    apiClient('/api/dock/call-next', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  searchAwb: (awb: string): Promise<any> =>
    apiClient(`/api/awery/awb/${encodeURIComponent(awb)}`),
};
