import { Client } from "@stomp/stompjs";

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

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const brokerURL = `${protocol}//${window.location.host}/ws-queue-raw`;

    this.client = new Client({
      brokerURL: brokerURL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: () => {},
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

    try {
      this.client.activate();
    } catch (err) {
      console.warn("WebSocket activate warning:", err);
    }
  }

  public disconnect() {
    if (this.client) {
      try {
        this.client.deactivate();
      } catch (err) {}
      this.client = null;
      this.isConnected = false;
    }
  }
}

export const wsService = new WebSocketService();
