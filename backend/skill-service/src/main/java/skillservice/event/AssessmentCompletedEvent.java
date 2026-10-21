package skillservice.event;

public class AssessmentCompletedEvent {

    private Long userId;
    private String assessmentName;
    private Integer score;
    private Integer totalQuestions;

    public AssessmentCompletedEvent() {
    }

    public AssessmentCompletedEvent(
            Long userId,
            String assessmentName,
            Integer score,
            Integer totalQuestions) {

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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}