package uz.airport.cargo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.airport.cargo.model.Dock;
import uz.airport.cargo.model.DockStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface DockRepository extends JpaRepository<Dock, Long> {

    Optional<Dock> findByDockNumber(Integer dockNumber);

    List<Dock> findByStatus(DockStatus status);

    List<Dock> findAllByOrderByDockNumberAsc();
}
