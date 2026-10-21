package agentic_ai.dto;

import java.util.List;

public class OpportunityMatchingRequest {

    private String studentProfile;
    private List<String> skills;
    private double readinessScore;
    private List<String> opportunityRequirements;

    public String getStudentProfile() {
        return studentProfile;
    }

    public void setStudentProfile(String studentProfile) {
        this.studentProfile = studentProfile;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public double getReadinessScore() {
        return readinessScore;
    }

    public void setReadinessScore(double readinessScore) {
        this.readinessScore = readinessScore;
    }

    public List<String> getOpportunityRequirements() {
        return opportunityRequirements;
    }

    public void setOpportunityRequirements(List<String> opportunityRequirements) {
        this.opportunityRequirements = opportunityRequirements;
    }
}