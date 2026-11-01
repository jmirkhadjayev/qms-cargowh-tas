package uz.airport.cargo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.airport.cargo.model.ActivityLog;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    @Query("SELECT a FROM ActivityLog a WHERE " +
           "(:entityName IS NULL OR :entityName = '' OR LOWER(a.entityName) LIKE LOWER(CONCAT('%', :entityName, '%'))) AND " +
           "(:actionCode IS NULL OR :actionCode = '' OR a.actionCode = :actionCode OR LOWER(a.action) LIKE LOWER(CONCAT('%', :actionCode, '%'))) AND " +
           "(:entityId IS NULL OR :entityId = '' OR LOWER(a.entityId) LIKE LOWER(CONCAT('%', :entityId, '%'))) AND " +
           "(:startDate IS NULL OR a.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR a.timestamp <= :endDate) " +
           "ORDER BY a.timestamp DESC")
    Page<ActivityLog> searchLogs(@Param("entityName") String entityName,
                                 @Param("actionCode") String actionCode,
                                 @Param("entityId") String entityId,
                                 @Param("startDate") LocalDateTime startDate,
                                 @Param("endDate") LocalDateTime endDate,
                                 Pageable pageable);

    @Query("SELECT DISTINCT a.entityName FROM ActivityLog a ORDER BY a.entityName")
    List<String> findDistinctEntityNames();

    @Query("SELECT DISTINCT a.action FROM ActivityLog a ORDER BY a.action")
    List<String> findDistinctActions();

    long countByTimestampAfter(LocalDateTime timestamp);
}
