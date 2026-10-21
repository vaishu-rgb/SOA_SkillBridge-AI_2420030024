package agentic_ai.dto;

public class OrchestratorResponse {

    private String workflowStatus;
    private String skillAssessment;
    private String gapAnalysis;
    private String learningPlan;
    private String recoveryPlan;
    private String opportunityMatches;
    private String communication;

    public String getWorkflowStatus() {
        return workflowStatus;
    }

    public void setWorkflowStatus(String workflowStatus) {
        this.workflowStatus = workflowStatus;
    }

    public String getSkillAssessment() {
        return skillAssessment;
    }

    public void setSkillAssessment(String skillAssessment) {
        this.skillAssessment = skillAssessment;
    }

    public String getGapAnalysis() {
        return gapAnalysis;
    }

    public void setGapAnalysis(String gapAnalysis) {
        this.gapAnalysis = gapAnalysis;
    }

    public String getLearningPlan() {
        return learningPlan;
    }

    public void setLearningPlan(String learningPlan) {
        this.learningPlan = learningPlan;
    }

    public String getRecoveryPlan() {
        return recoveryPlan;
    }

    public void setRecoveryPlan(String recoveryPlan) {
        this.recoveryPlan = recoveryPlan;
    }

    public String getOpportunityMatches() {
        return opportunityMatches;
    }

    public void setOpportunityMatches(String opportunityMatches) {
        this.opportunityMatches = opportunityMatches;
    }

    public String getCommunication() {
        return communication;
    }

    public void setCommunication(String communication) {
        this.communication = communication;
    }
}