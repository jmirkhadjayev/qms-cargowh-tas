import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export type WebSocketCallback = (message: any) => void;

class WebSocketService {
  private client: Client | null = null;
  private isConnected = false;

  public connect(
    onQueueUpdate?: WebSocketCallback,
    onDockUpdate?: WebSocketCallback,
    onLedCall?: WebSocketCallback
  ) {
    if (this.client && this.isConnected) return;

    this.client = new Client({
      webSocketFactory: () => new SockJS("/ws-queue") as any,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        // debug logging can be muted
      },
    });

    this.client.onConnect = () => {
      this.isConnected = true;

      if (onQueueUpdate) {
        this.client?.subscribe("/topic/queue-updates", (msg) => {
          try {
            onQueueUpdate(JSON.parse(msg.body));
          } catch (e) {
            console.error("WebSocket queue update parse error:", e);
          }
        });
      }

      if (onDockUpdate) {
        this.client?.subscribe("/topic/dock-updates", (msg) => {
          try {
            onDockUpdate(JSON.parse(msg.body));
          } catch (e) {
            console.error("WebSocket dock update parse error:", e);
          }
        });
      }

      if (onLedCall) {
        this.client?.subscribe("/topic/led-board", (msg) => {
          try {
            onLedCall(JSON.parse(msg.body));
          } catch (e) {
            console.error("WebSocket LED call parse error:", e);
          }
        });
      }
    };

    this.client.onDisconnect = () => {
      this.isConnected = false;
    };

    this.client.activate();
  }

  public disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.isConnected = false;
    }
  }
}

export const wsService = new WebSocketService();
