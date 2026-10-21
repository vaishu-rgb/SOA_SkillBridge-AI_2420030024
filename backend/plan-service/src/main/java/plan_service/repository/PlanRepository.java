package plan_service.repository;
import plan_service.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {

    List<Plan> findByUserId(Long userId);

    List<Plan> findByCareerId(Long careerId);
}