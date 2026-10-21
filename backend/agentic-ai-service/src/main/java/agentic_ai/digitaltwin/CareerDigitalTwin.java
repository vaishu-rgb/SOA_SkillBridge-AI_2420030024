package agentic_ai.digitaltwin;

import java.util.List;

public class CareerDigitalTwin {

    private Long userId;
    private String name;
    private String education;
    private String careerGoal;

    private List<String> skills;
    private List<String> proficiency;
    private List<String> projects;
    private List<String> certifications;
    private List<String> assessments;
    private List<String> skillGaps;

    private String progress;

    // Existing readiness field
    private Integer readiness;

    // Phase 27 - Opportunity Readiness Score
    private Double readinessScore;

    private List<String> opportunities;


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }


    public String getCareerGoal() {
        return careerGoal;
    }

    public void setCareerGoal(String careerGoal) {
        this.careerGoal = careerGoal;
    }


    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }


    public List<String> getProficiency() {
        return proficiency;
    }

    public void setProficiency(List<String> proficiency) {
        this.proficiency = proficiency;
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


    public List<String> getAssessments() {
        return assessments;
    }

    public void setAssessments(List<String> assessments) {
        this.assessments = assessments;
    }


    public List<String> getSkillGaps() {
        return skillGaps;
    }

    public void setSkillGaps(List<String> skillGaps) {
        this.skillGaps = skillGaps;
    }


    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }


    public Integer getReadiness() {
        return readiness;
    }

    public void setReadiness(Integer readiness) {
        this.readiness = readiness;
    }


    // Phase 27 - Readiness Score

    public Double getReadinessScore() {
        return readinessScore;
    }

    public void setReadinessScore(Double readinessScore) {
        this.readinessScore = readinessScore;
    }


    public List<String> getOpportunities() {
        return opportunities;
    }

    public void setOpportunities(List<String> opportunities) {
        this.opportunities = opportunities;
    }
}