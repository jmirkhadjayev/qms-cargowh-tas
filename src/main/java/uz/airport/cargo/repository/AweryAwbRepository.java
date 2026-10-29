package uz.airport.cargo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.airport.cargo.model.AweryAwb;

import java.util.List;
import java.util.Optional;

@Repository
public interface AweryAwbRepository extends JpaRepository<AweryAwb, Long> {

    Optional<AweryAwb> findByAwbNumber(String awbNumber);

    List<AweryAwb> findByAwbNumberContainingIgnoreCase(String awbNumber);

    List<AweryAwb> findAllByOrderByAwbNumberAsc();
}
