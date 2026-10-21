package agentic_ai.readiness;

public class ReadinessScore {

    private double skillMatch;
    private double assessment;
    private double projects;
    private double certifications;
    private double progress;

    private double finalScore;

    public double getSkillMatch() {
        return skillMatch;
    }

    public void setSkillMatch(double skillMatch) {
        this.skillMatch = skillMatch;
    }

    public double getAssessment() {
        return assessment;
    }

    public void setAssessment(double assessment) {
        this.assessment = assessment;
    }

    public double getProjects() {
        return projects;
    }

    public void setProjects(double projects) {
        this.projects = projects;
    }

    public double getCertifications() {
        return certifications;
    }

    public void setCertifications(double certifications) {
        this.certifications = certifications;
    }

    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

    public double getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(double finalScore) {
        this.finalScore = finalScore;
    }
}