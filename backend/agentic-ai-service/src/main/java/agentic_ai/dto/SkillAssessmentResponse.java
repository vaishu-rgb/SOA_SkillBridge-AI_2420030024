package agentic_ai.dto;

import java.util.List;

public class SkillAssessmentResponse {

    private String overallSummary;

    private List<SkillCompetency> competencies;

    public String getOverallSummary() {
        return overallSummary;
    }

    public void setOverallSummary(String overallSummary) {
        this.overallSummary = overallSummary;
    }

    public List<SkillCompetency> getCompetencies() {
        return competencies;
    }

    public void setCompetencies(List<SkillCompetency> competencies) {
        this.competencies = competencies;
    }
}