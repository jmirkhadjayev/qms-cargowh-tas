package uz.airport.cargo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.airport.cargo.model.Ticket;
import uz.airport.cargo.model.TicketStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Optional<Ticket> findByTicketNumber(String ticketNumber);

    Optional<Ticket> findByBarcodeHash(String barcodeHash);

    List<Ticket> findByStatus(TicketStatus status);

    List<Ticket> findByStatusInOrderByRegisteredAtAsc(List<TicketStatus> statuses);

    @Query("SELECT t FROM Ticket t WHERE t.status IN :statuses ORDER BY t.isPriority DESC, t.registeredAt ASC")
    List<Ticket> findActiveQueue(@Param("statuses") List<TicketStatus> statuses);

    List<Ticket> findByAwbNumberContainingIgnoreCase(String awbNumber);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.registeredAt >= :startOfDay")
    Long countTodayTickets(@Param("startOfDay") LocalDateTime startOfDay);

    @Query("SELECT t FROM Ticket t WHERE t.registeredAt BETWEEN :start AND :end ORDER BY t.registeredAt DESC")
    List<Ticket> findByPeriod(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    List<Ticket> findTop50ByOrderByRegisteredAtDesc();
}
