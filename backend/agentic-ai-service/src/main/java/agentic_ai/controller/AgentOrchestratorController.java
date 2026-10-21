package agentic_ai.controller;

import agentic_ai.dto.OrchestratorRequest;
import agentic_ai.dto.OrchestratorResponse;
import agentic_ai.service.AgentOrchestrator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AgentOrchestratorController {

    private final AgentOrchestrator agentOrchestrator;

    public AgentOrchestratorController(
            AgentOrchestrator agentOrchestrator) {

        this.agentOrchestrator = agentOrchestrator;
    }

    @PostMapping("/orchestrate")
    public OrchestratorResponse orchestrate(
            @RequestBody OrchestratorRequest request,
            HttpServletRequest httpRequest) {

        String authorization =
                httpRequest.getHeader("Authorization");

        if (authorization == null ||
                !authorization.startsWith("Bearer ")) {

            throw new RuntimeException(
                    "Authorization token is missing");
        }

        String token = authorization.substring(7);

        return agentOrchestrator.runWorkflow(request, token);
    }
}