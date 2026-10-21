package opportunity_service.service;

import opportunity_service.entity.Opportunity;
import opportunity_service.repository.OpportunityRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpportunityService {

    private final OpportunityRepository opportunityRepository;

    public OpportunityService(OpportunityRepository opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }

    // Create a new opportunity
    public Opportunity createOpportunity(Opportunity opportunity) {
        return opportunityRepository.save(opportunity);
    }

    // Get all opportunities
    public List<Opportunity> getAllOpportunities() {
        return opportunityRepository.findAll();
    }

    // Get opportunity by ID
    public Opportunity getOpportunityById(Long id) {
        return opportunityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Opportunity not found with id: " + id));
    }
}