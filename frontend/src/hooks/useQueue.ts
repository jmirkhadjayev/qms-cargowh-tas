import { useState, useEffect, useCallback, useMemo } from 'react';
import { queueApi } from '../api/queue.api';
import { QueueSummary, Ticket, RegisterTicketPayload } from '../types';
import { APP_CONFIG } from '../constants';
import { useDebounce } from './useDebounce';

const initialSummary: QueueSummary = {
  totalToday: 0,
  waitingInWarehouse: 0,
  preparingInWarehouse: 0,
  atDocks: 0,
  completedAtKpp: 0,
  activeDocksCount: APP_CONFIG.DEFAULT_TOTAL_DOCKS,
  averageWaitMinutes: 0,
};

export function useQueue() {
  const [summary, setSummary] = useState<QueueSummary>(initialSummary);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedSearch = useDebounce(searchQuery, 250);

  const fetchQueueData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsRefreshing(true);
    setError(null);

    try {
      const [summaryRes, ticketsRes] = await Promise.all([
        queueApi.getSummary(),
        queueApi.getRecentTickets(),
      ]);
      setSummary(summaryRes);
      setTickets(ticketsRes);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Navbat yuklanishida xatolik';
      setError(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchQueueData();
    const interval = setInterval(() => {
      fetchQueueData(true);
    }, APP_CONFIG.POLLING_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fetchQueueData]);

  const filteredTickets = useMemo(() => {
    if (!debouncedSearch.trim()) return tickets;
    const query = debouncedSearch.toLowerCase().trim();

    return tickets.filter(
      (t) =>
        t.ticketNumber.toLowerCase().includes(query) ||
        t.awbNumber.toLowerCase().includes(query) ||
        t.consigneeName.toLowerCase().includes(query) ||
        t.vehiclePlate.toLowerCase().includes(query)
    );
  }, [tickets, debouncedSearch]);

  const registerTicket = useCallback(
    async (payload: RegisterTicketPayload) => {
      const created = await queueApi.registerTicket(payload);
      await fetchQueueData(true);
      return created;
    },
    [fetchQueueData]
  );

  return {
    summary,
    tickets,
    filteredTickets,
    isLoading,
    isRefreshing,
    error,
    searchQuery,
    setSearchQuery,
    refetch: fetchQueueData,
    registerTicket,
  };
}
