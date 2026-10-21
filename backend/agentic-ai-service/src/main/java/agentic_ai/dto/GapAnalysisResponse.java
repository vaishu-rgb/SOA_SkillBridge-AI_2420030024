package agentic_ai.dto;

import java.util.List;

public class GapAnalysisResponse {

    private String overallAssessment;

    private List<SkillGap> skillGaps;

    public String getOverallAssessment() {
        return overallAssessment;
    }

    public void setOverallAssessment(String overallAssessment) {
        this.overallAssessment = overallAssessment;
    }

    public List<SkillGap> getSkillGaps() {
        return skillGaps;
    }

    public void setSkillGaps(List<SkillGap> skillGaps) {
        this.skillGaps = skillGaps;
    }
}