package agentic_ai.dto;

import java.util.List;

public class OrchestratorRequest {

    private Long userId;

    private String targetCareer;
    private List<String> projects;
    private List<String> certifications;
    private List<String> assessmentResults;

    private List<String> requiredSkills;
    private String availability;
    private int planDurationWeeks;
    private double readinessScore;
    private List<String> opportunityRequirements;

    private String progressStatus;
    private List<String> completedMilestones;
    private List<String> missedMilestones;
    private String studentFeedback;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTargetCareer() {
        return targetCareer;
    }

    public void setTargetCareer(String targetCareer) {
        this.targetCareer = targetCareer;
    }

    public List<String> getProjects() {
        return projects;
    }

    public void setProjects(List<String> projects) {
        this.projects = projects;
    }

    public List<String> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<String> certifications) {
        this.certifications = certifications;
    }

    public List<String> getAssessmentResults() {
        return assessmentResults;
    }

    public void setAssessmentResults(List<String> assessmentResults) {
        this.assessmentResults = assessmentResults;
    }

    public List<String> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills;
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

    public double getReadinessScore() {
        return readinessScore;
    }

    public void setReadinessScore(double readinessScore) {
        this.readinessScore = readinessScore;
    }

    public List<String> getOpportunityRequirements() {
        return opportunityRequirements;
    }

    public void setOpportunityRequirements(
            List<String> opportunityRequirements) {
        this.opportunityRequirements = opportunityRequirements;
    }

    public String getProgressStatus() {
        return progressStatus;
    }

    public void setProgressStatus(String progressStatus) {
        this.progressStatus = progressStatus;
    }

    public List<String> getCompletedMilestones() {
        return completedMilestones;
    }

    public void setCompletedMilestones(
            List<String> completedMilestones) {
        this.completedMilestones = completedMilestones;
    }

    public List<String> getMissedMilestones() {
        return missedMilestones;
    }

    public void setMissedMilestones(
            List<String> missedMilestones) {
        this.missedMilestones = missedMilestones;
    }

    public String getStudentFeedback() {
        return studentFeedback;
    }

    public void setStudentFeedback(String studentFeedback) {
        this.studentFeedback = studentFeedback;
    }
}