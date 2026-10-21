package agentic_ai.controller;

import agentic_ai.digitaltwin.CareerDigitalTwinService;
import agentic_ai.readiness.ReadinessScore;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/readiness")
public class ReadinessScoreController {

    private final CareerDigitalTwinService careerDigitalTwinService;

    public ReadinessScoreController(
            CareerDigitalTwinService careerDigitalTwinService) {

        this.careerDigitalTwinService =
                careerDigitalTwinService;
    }

    @PostMapping("/calculate")
    public ReadinessScore calculateReadiness(
            @RequestBody ReadinessScoreRequest request) {

        return careerDigitalTwinService
                .calculateAndStoreReadiness(
                        request.getUserId(),
                        request.getSkillMatch(),
                        request.getAssessment(),
                        request.getProjects(),
                        request.getCertifications(),
                        request.getProgress()
                );
    }

    public static class ReadinessScoreRequest {

        private Long userId;
        private double skillMatch;
        private double assessment;
        private double projects;
        private double certifications;
        private double progress;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

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
    }
}