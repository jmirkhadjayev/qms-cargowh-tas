package uz.airport.cargo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.airport.cargo.model.AuditEvent;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditEventRepository extends JpaRepository<AuditEvent, Long> {

    List<AuditEvent> findByTicketIdOrderByTimestampAsc(Long ticketId);

    List<AuditEvent> findByAwbNumberOrderByTimestampAsc(String awbNumber);

    List<AuditEvent> findTop100ByOrderByTimestampDesc();

    List<AuditEvent> findByTimestampBetweenOrderByTimestampDesc(LocalDateTime start, LocalDateTime end);
}
