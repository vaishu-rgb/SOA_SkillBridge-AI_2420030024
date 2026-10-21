package agentic_ai.controller;

import agentic_ai.dto.RecoveryRequest;
import agentic_ai.service.RecoveryAgent;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class RecoveryController {

    private final RecoveryAgent recoveryAgent;

    public RecoveryController(RecoveryAgent recoveryAgent) {
        this.recoveryAgent = recoveryAgent;
    }

    @PostMapping("/recovery")
    public String recoverPlan(@RequestBody RecoveryRequest request) {

        return recoveryAgent.recoverPlan(request);
    }
}