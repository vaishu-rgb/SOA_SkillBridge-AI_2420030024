package notification_service.event;

public class AssessmentCompletedEvent {

    private Long userId;
    private String assessmentName;
    private int score;
    private int totalQuestions;

    public AssessmentCompletedEvent() {
    }

    public AssessmentCompletedEvent(
            Long userId,
            String assessmentName,
            int score,
            int totalQuestions) {

        this.userId = userId;
        this.assessmentName = assessmentName;
        this.score = score;
        this.totalQuestions = totalQuestions;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAssessmentName() {
        return assessmentName;
    }

    public void setAssessmentName(String assessmentName) {
        this.assessmentName = assessmentName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}