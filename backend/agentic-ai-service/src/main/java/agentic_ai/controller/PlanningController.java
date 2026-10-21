package agentic_ai.controller;

import agentic_ai.dto.PlanningRequest;
import agentic_ai.service.PlanningAgent;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class PlanningController {

    private final PlanningAgent planningAgent;

    public PlanningController(PlanningAgent planningAgent) {
        this.planningAgent = planningAgent;
    }

    @PostMapping("/planning")
    public String generatePlan(@RequestBody PlanningRequest request) {

        return planningAgent.generatePlan(request);
    }
}