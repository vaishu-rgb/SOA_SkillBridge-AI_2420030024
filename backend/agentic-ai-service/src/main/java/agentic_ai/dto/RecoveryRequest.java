package agentic_ai.dto;

import java.util.List;

public class RecoveryRequest {

    private String targetCareer;

    private List<String> originalPlan;

    private List<String> completedMilestones;

    private List<String> missedMilestones;

    private String progressStatus;

    private String assessmentResult;

    private String studentFeedback;

    public String getTargetCareer() {
        return targetCareer;
    }

    public void setTargetCareer(String targetCareer) {
        this.targetCareer = targetCareer;
    }

    public List<String> getOriginalPlan() {
        return originalPlan;
    }

    public void setOriginalPlan(List<String> originalPlan) {
        this.originalPlan = originalPlan;
    }

    public List<String> getCompletedMilestones() {
        return completedMilestones;
    }

    public void setCompletedMilestones(List<String> completedMilestones) {
        this.completedMilestones = completedMilestones;
    }

    public List<String> getMissedMilestones() {
        return missedMilestones;
    }

    public void setMissedMilestones(List<String> missedMilestones) {
        this.missedMilestones = missedMilestones;
    }

    public String getProgressStatus() {
        return progressStatus;
    }

    public void setProgressStatus(String progressStatus) {
        this.progressStatus = progressStatus;
    }

    public String getAssessmentResult() {
        return assessmentResult;
    }

    public void setAssessmentResult(String assessmentResult) {
        this.assessmentResult = assessmentResult;
    }

    public String getStudentFeedback() {
        return studentFeedback;
    }

    public void setStudentFeedback(String studentFeedback) {
        this.studentFeedback = studentFeedback;
    }
}