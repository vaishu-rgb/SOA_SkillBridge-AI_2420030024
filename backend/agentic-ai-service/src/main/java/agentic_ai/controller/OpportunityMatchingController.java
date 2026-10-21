package agentic_ai.controller;

import agentic_ai.dto.OpportunityMatchingRequest;
import agentic_ai.service.OpportunityMatchingAgent;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class OpportunityMatchingController {

    private final OpportunityMatchingAgent opportunityMatchingAgent;

    public OpportunityMatchingController(
            OpportunityMatchingAgent opportunityMatchingAgent) {
        this.opportunityMatchingAgent = opportunityMatchingAgent;
    }

    @PostMapping("/opportunity-matching")
    public String matchOpportunities(
            @RequestBody OpportunityMatchingRequest request) {

        return opportunityMatchingAgent.matchOpportunities(request);
    }
}