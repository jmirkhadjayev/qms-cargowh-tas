import { useEffect, useState, useCallback } from 'react';
import { wsService, WebSocketCallback } from '../lib/websocket';

export interface WebSocketNotification {
  id: string;
  message: string;
  type: 'CALL' | 'UPDATE' | 'INFO';
  timestamp: number;
}

export function useWebSocket(
  onQueueUpdate?: () => void,
  onDockUpdate?: () => void
) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const handleQueueUpdate: WebSocketCallback = useCallback(() => {
    setIsConnected(true);
    onQueueUpdate?.();
  }, [onQueueUpdate]);

  const handleDockUpdate: WebSocketCallback = useCallback(() => {
    setIsConnected(true);
    onDockUpdate?.();
  }, [onDockUpdate]);

  const handleLedCall: WebSocketCallback = useCallback((msg: any) => {
    setIsConnected(true);
    if (msg?.ticketNumber && msg?.dockNumber) {
      setActiveAlert(
        `🚨 Talon ${msg.ticketNumber} -> Dok #${msg.dockNumber} ga chaqirildi (${msg.vehiclePlate || 'Piyoda'})`
      );
      setTimeout(() => {
        setActiveAlert(null);
      }, 7000);
    }
    onQueueUpdate?.();
    onDockUpdate?.();
  }, [onQueueUpdate, onDockUpdate]);

  useEffect(() => {
    wsService.connect(handleQueueUpdate, handleDockUpdate, handleLedCall);

    return () => {
      wsService.disconnect();
    };
  }, [handleQueueUpdate, handleDockUpdate, handleLedCall]);

  return {
    isConnected,
    activeAlert,
    dismissAlert: () => setActiveAlert(null),
  };
}
