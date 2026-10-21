package agentic_ai.dto;

import java.util.List;

public class OpportunityMatchingResponse {

    private String overallAssessment;
    private List<OpportunityMatch> matches;

    public String getOverallAssessment() {
        return overallAssessment;
    }

    public void setOverallAssessment(String overallAssessment) {
        this.overallAssessment = overallAssessment;
    }

    public List<OpportunityMatch> getMatches() {
        return matches;
    }

    public void setMatches(List<OpportunityMatch> matches) {
        this.matches = matches;
    }
}