package uz.airport.cargo.service;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.airport.cargo.model.ActivityLog;
import uz.airport.cargo.repository.ActivityLogRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ActivityLogService {

    private static final Logger log = LoggerFactory.getLogger(ActivityLogService.class);
    private final ActivityLogRepository repository;

    public ActivityLogService(ActivityLogRepository repository) {
        this.repository = repository;
    }

    /**
     * Tizim amallari jurnaliga yangi yozuv qo'shish (Append-only).
     */
    @Transactional
    public ActivityLog record(String userName, String userEmail, String action, String actionCode,
                              String entityName, String entityId, String changedFields,
                              String ipAddress, String details) {
        ActivityLog entry = new ActivityLog(
                LocalDateTime.now(),
                userName != null && !userName.isBlank() ? userName : "Tizim Foydalanuvchisi",
                userEmail != null && !userEmail.isBlank() ? userEmail : "system@uzairports.com",
                action != null && !action.isBlank() ? action : "Amal",
                actionCode != null && !actionCode.isBlank() ? actionCode.toUpperCase() : "GENERAL",
                entityName != null && !entityName.isBlank() ? entityName : "Tizim",
                entityId != null && !entityId.isBlank() ? entityId : "—",
                changedFields != null && !changedFields.isBlank() ? changedFields : "—",
                ipAddress != null && !ipAddress.isBlank() ? ipAddress : "127.0.0.1",
                details
        );
        ActivityLog saved = repository.save(entry);
        log.info("[ACTIVITY_LOG] {} | {} ({}) | {} [{}] | ID: {} | IP: {}",
                saved.getAction(), saved.getUserName(), saved.getUserEmail(),
                saved.getEntityName(), saved.getChangedFields(), saved.getEntityId(), saved.getIpAddress());
        return saved;
    }

    /**
     * Qisqa qulay yozish metodi
     */
    @Transactional
    public ActivityLog logAction(String userName, String userEmail, String action, String entityName,
                                 String entityId, String changedFields, String ipAddress, String details) {
        String actionCode = mapActionToCode(action);
        return record(userName, userEmail, action, actionCode, entityName, entityId, changedFields, ipAddress, details);
    }

    /**
     * Filtrlangan va sahifalangan amallar jurnali ro'yxati (Faqat o'qish uchun)
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getFilteredLogs(String entityName, String actionCode, String entityId,
                                               String startDateStr, String endDateStr,
                                               int page, int size) {
        LocalDateTime start = parseDateStart(startDateStr);
        LocalDateTime end = parseDateEnd(endDateStr);

        Pageable pageable = PageRequest.of(Math.max(0, page), Math.min(100, Math.max(1, size)));
        Page<ActivityLog> resultPage = repository.searchLogs(entityName, actionCode, entityId, start, end, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", resultPage.getContent());
        response.put("totalElements", resultPage.getTotalElements());
        response.put("totalPages", resultPage.getTotalPages());
        response.put("currentPage", resultPage.getNumber());
        response.put("pageSize", resultPage.getSize());
        response.put("isFirst", resultPage.isFirst());
        response.put("isLast", resultPage.isLast());
        response.put("entityOptions", getEntityOptions());
        response.put("actionOptions", getActionOptions());
        return response;
    }

    @Transactional(readOnly = true)
    public Optional<ActivityLog> getById(Long id) {
        return repository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<String> getEntityOptions() {
        return repository.findDistinctEntityNames();
    }

    @Transactional(readOnly = true)
    public List<String> getActionOptions() {
        return repository.findDistinctActions();
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getStats() {
        long total = repository.count();
        long today = repository.countByTimestampAfter(LocalDate.now().atStartOfDay());

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalLogs", total);
        stats.put("todayLogs", today);
        stats.put("distinctEntities", getEntityOptions().size());
        stats.put("readOnlyNotice", "Jurnal faqat o'qish uchun — yozuvlarni na interfeys, na API orqali o'zgartirib yoki o'chirib bo'lmaydi.");
        return stats;
    }

    public static String extractClientIp(HttpServletRequest request) {
        if (request == null) return "127.0.0.1";
        String header = request.getHeader("X-Forwarded-For");
        if (header != null && !header.isBlank()) {
            return header.split(",")[0].trim();
        }
        header = request.getHeader("X-Real-IP");
        if (header != null && !header.isBlank()) {
            return header.trim();
        }
        String addr = request.getRemoteAddr();
        if ("0:0:0:0:0:0:0:1".equals(addr) || "::1".equals(addr)) {
            return "127.0.0.1";
        }
        return addr != null ? addr : "127.0.0.1";
    }

    private String mapActionToCode(String action) {
        if (action == null) return "GENERAL";
        String lower = action.toLowerCase();
        if (lower.contains("yarat")) return "CREATE";
        if (lower.contains("o'zgar") || lower.contains("ozgar")) return "UPDATE";
        if (lower.contains("yuklab")) return "DOWNLOAD";
        if (lower.contains("o'chir") || lower.contains("ochir")) return "DELETE";
        if (lower.contains("kirish") || lower.contains("login")) return "LOGIN";
        return "GENERAL";
    }

    private LocalDateTime parseDateStart(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return null;
        try {
            return LocalDate.parse(dateStr.trim()).atStartOfDay();
        } catch (Exception e) {
            try {
                return LocalDateTime.parse(dateStr.trim());
            } catch (Exception e2) {
                return null;
            }
        }
    }

    private LocalDateTime parseDateEnd(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return null;
        try {
            return LocalDate.parse(dateStr.trim()).atTime(LocalTime.MAX);
        } catch (Exception e) {
            try {
                return LocalDateTime.parse(dateStr.trim());
            } catch (Exception e2) {
                return null;
            }
        }
    }
}
