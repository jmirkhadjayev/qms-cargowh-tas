import { useState, useEffect, useCallback } from 'react';
import { queueApi } from '../api/queue.api';
import { Dock } from '../types';
import { APP_CONFIG } from '../constants';

export function useDocks() {
  const [docks, setDocks] = useState<Dock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocks = useCallback(async () => {
    try {
      const data = await queueApi.getDocks();
      setDocks(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Doklar maʼlumotida xatolik');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocks();
    const interval = setInterval(fetchDocks, APP_CONFIG.POLLING_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchDocks]);

  const callNextClient = useCallback(
    async (dockNumber: number, operatorName = 'Operator_React') => {
      const result = await queueApi.callNextToDock({ dockNumber, operatorName });
      await fetchDocks();
      return result;
    },
    [fetchDocks]
  );

  return {
    docks,
    isLoading,
    error,
    refetchDocks: fetchDocks,
    callNextClient,
  };
}
