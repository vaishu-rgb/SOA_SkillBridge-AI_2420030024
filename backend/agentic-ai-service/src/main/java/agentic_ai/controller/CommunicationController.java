package agentic_ai.controller;

import agentic_ai.dto.CommunicationRequest;
import agentic_ai.service.CommunicationAgent;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class CommunicationController {

    private final CommunicationAgent communicationAgent;

    public CommunicationController(CommunicationAgent communicationAgent) {
        this.communicationAgent = communicationAgent;
    }

    @PostMapping("/communication")
    public String generateCommunication(
            @RequestBody CommunicationRequest request) {

        return communicationAgent.generateCommunication(request);
    }
}