package plan_service.controller;

import plan_service.entity.Plan;
import plan_service.service.PlanService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    // Create a new plan
    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        Plan createdPlan = planService.createPlan(plan);
        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
    }

    // Get all plans
    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        List<Plan> plans = planService.getAllPlans();
        return ResponseEntity.ok(plans);
    }

    // Get plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Long id) {
        Plan plan = planService.getPlanById(id);
        return ResponseEntity.ok(plan);
    }

    // Get plans by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Plan>> getPlansByUserId(
            @PathVariable Long userId) {

        List<Plan> plans = planService.getPlansByUserId(userId);
        return ResponseEntity.ok(plans);
    }

    // Get plans by career ID
    @GetMapping("/career/{careerId}")
    public ResponseEntity<List<Plan>> getPlansByCareerId(
            @PathVariable Long careerId) {

        List<Plan> plans = planService.getPlansByCareerId(careerId);
        return ResponseEntity.ok(plans);
    }
}
