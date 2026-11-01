package uz.airport.cargo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.airport.cargo.model.ActivityLog;
import uz.airport.cargo.service.ActivityLogService;

import java.util.Map;

@RestController
@RequestMapping("/api/activity-logs")
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    public ActivityLogController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    /**
     * Amallar jurnalini qidirish va filtrlash (Faqat o'qish uchun)
     * Hech qanday POST, PUT yoki DELETE orqali yozuvlarni o'zgartirib bo'lmaydi!
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getLogs(
            @RequestParam(required = false) String entityName,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String entityId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Map<String, Object> data = activityLogService.getFilteredLogs(
                entityName, action, entityId, startDate, endDate, page, size
        );
        return ResponseEntity.ok(data);
    }

    /**
     * Muayyan amal tafsilotlarini ko'rish
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getLogById(@PathVariable Long id) {
        return activityLogService.getById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("message", "Amal yozuvi topilmadi")));
    }

    /**
     * Jurnal statistikasi
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(activityLogService.getStats());
    }
}
