package agentic_ai.dto;

import java.util.List;

public class SkillAssessmentRequest {

    private String studentProfile;

    private List<String> skills;

    private List<String> projects;

    private List<String> certifications;

    private List<String> assessmentResults;

    public String getStudentProfile() {
        return studentProfile;
    }

    public void setStudentProfile(String studentProfile) {
        this.studentProfile = studentProfile;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
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
}