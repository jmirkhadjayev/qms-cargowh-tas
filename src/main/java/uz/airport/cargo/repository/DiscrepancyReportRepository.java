package uz.airport.cargo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.airport.cargo.model.DiscrepancyReport;

import java.util.List;

@Repository
public interface DiscrepancyReportRepository extends JpaRepository<DiscrepancyReport, Long> {

    List<DiscrepancyReport> findByTicketId(Long ticketId);

    List<DiscrepancyReport> findByResolvedFalseOrderByReportedAtDesc();

    List<DiscrepancyReport> findAllByOrderByReportedAtDesc();
}
