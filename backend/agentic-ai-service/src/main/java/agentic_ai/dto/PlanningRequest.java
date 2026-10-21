package agentic_ai.dto;

import java.util.List;

public class PlanningRequest {

    private String targetCareer;

    private List<String> skillGaps;

    private List<String> currentProficiency;

    private String availability;

    private int planDurationWeeks;

    public String getTargetCareer() {
        return targetCareer;
    }

    public void setTargetCareer(String targetCareer) {
        this.targetCareer = targetCareer;
    }

    public List<String> getSkillGaps() {
        return skillGaps;
    }

    public void setSkillGaps(List<String> skillGaps) {
        this.skillGaps = skillGaps;
    }

    public List<String> getCurrentProficiency() {
        return currentProficiency;
    }

    public void setCurrentProficiency(List<String> currentProficiency) {
        this.currentProficiency = currentProficiency;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public int getPlanDurationWeeks() {
        return planDurationWeeks;
    }

    public void setPlanDurationWeeks(int planDurationWeeks) {
        this.planDurationWeeks = planDurationWeeks;
    }
}