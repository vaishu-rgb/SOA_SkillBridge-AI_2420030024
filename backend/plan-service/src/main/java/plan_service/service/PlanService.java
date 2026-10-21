package plan_service.service;
import plan_service.entity.Plan;
import plan_service.repository.PlanRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    // Create a new plan
    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    // Get all plans
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    // Get plan by ID
    public Plan getPlanById(Long id) {
        return planRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Plan not found with id: " + id));
    }

    // Get plans by user ID
    public List<Plan> getPlansByUserId(Long userId) {
        return planRepository.findByUserId(userId);
    }

    // Get plans by career ID
    public List<Plan> getPlansByCareerId(Long careerId) {
        return planRepository.findByCareerId(careerId);
    }
}