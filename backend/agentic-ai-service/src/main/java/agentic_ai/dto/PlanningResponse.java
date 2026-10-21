package agentic_ai.dto;

import java.util.List;

public class PlanningResponse {

    private String planSummary;

    private List<LearningPlanItem> learningPlan;

    public String getPlanSummary() {
        return planSummary;
    }

    public void setPlanSummary(String planSummary) {
        this.planSummary = planSummary;
    }

    public List<LearningPlanItem> getLearningPlan() {
        return learningPlan;
    }

    public void setLearningPlan(List<LearningPlanItem> learningPlan) {
        this.learningPlan = learningPlan;
    }
}