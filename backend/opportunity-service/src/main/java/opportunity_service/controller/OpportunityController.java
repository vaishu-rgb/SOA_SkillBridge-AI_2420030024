package opportunity_service.controller;

import opportunity_service.entity.Opportunity;
import opportunity_service.service.OpportunityService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityService opportunityService;

    public OpportunityController(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    // Create a new opportunity
    @PostMapping
    public ResponseEntity<Opportunity> createOpportunity(
            @RequestBody Opportunity opportunity) {

        Opportunity createdOpportunity =
                opportunityService.createOpportunity(opportunity);

        return new ResponseEntity<>(
                createdOpportunity,
                HttpStatus.CREATED
        );
    }

    // Get all opportunities
    @GetMapping
    public ResponseEntity<List<Opportunity>> getAllOpportunities() {

        List<Opportunity> opportunities =
                opportunityService.getAllOpportunities();

        return ResponseEntity.ok(opportunities);
    }

    // Get opportunity by ID
    @GetMapping("/{id}")
    public ResponseEntity<Opportunity> getOpportunityById(
            @PathVariable Long id) {

        Opportunity opportunity =
                opportunityService.getOpportunityById(id);

        return ResponseEntity.ok(opportunity);
    }
}