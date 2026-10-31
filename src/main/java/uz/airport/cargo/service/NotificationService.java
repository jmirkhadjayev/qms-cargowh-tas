package uz.airport.cargo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@SuppressWarnings("null")
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void broadcastQueueUpdate(@NonNull Object payload) {
        try {
            messagingTemplate.convertAndSend("/topic/queue-updates", Objects.requireNonNull(payload));
        } catch (Exception e) {
            log.warn("WebSocket broadcast queue-updates failed: {}", e.getMessage());
        }
    }

    public void broadcastLedCall(String ticketNumber, Integer dockNumber, String vehiclePlate, String category) {
        Map<String, Object> message = new HashMap<>();
        message.put("type", "CALL");
        message.put("ticketNumber", ticketNumber);
        message.put("dockNumber", dockNumber);
        message.put("vehiclePlate", vehiclePlate != null ? vehiclePlate : "");
        message.put("category", category);
        message.put("timestamp", System.currentTimeMillis());

        try {
            messagingTemplate.convertAndSend("/topic/led-board", message);
            messagingTemplate.convertAndSend("/topic/dock-updates", message);
        } catch (Exception e) {
            log.warn("WebSocket broadcast led-board failed: {}", e.getMessage());
        }
    }

    public void broadcastDockStatus(@NonNull Object payload) {
        try {
            messagingTemplate.convertAndSend("/topic/dock-updates", Objects.requireNonNull(payload));
        } catch (Exception e) {
            log.warn("WebSocket broadcast dock-updates failed: {}", e.getMessage());
        }
    }

    public void sendSmsNotification(String phone, String text) {
        // SMS Gateway simulation (integrates with PlayMobile, Eskiz, or Twilio)
        log.info("[SMS-GATEWAY] To: {} | Message: '{}'", phone, text);
    }
}
