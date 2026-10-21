package agentic_ai.readiness;

import org.springframework.stereotype.Service;

@Service
public class ReadinessScoreService {

    private static final double SKILL_WEIGHT = 0.50;
    private static final double ASSESSMENT_WEIGHT = 0.20;
    private static final double PROJECT_WEIGHT = 0.15;
    private static final double CERTIFICATION_WEIGHT = 0.10;
    private static final double PROGRESS_WEIGHT = 0.05;

    public ReadinessScore calculateScore(
            double skillMatch,
            double assessment,
            double projects,
            double certifications,
            double progress) {

        ReadinessScore score = new ReadinessScore();

        score.setSkillMatch(normalize(skillMatch));
        score.setAssessment(normalize(assessment));
        score.setProjects(normalize(projects));
        score.setCertifications(normalize(certifications));
        score.setProgress(normalize(progress));

        double finalScore =
                (score.getSkillMatch() * SKILL_WEIGHT)
                + (score.getAssessment() * ASSESSMENT_WEIGHT)
                + (score.getProjects() * PROJECT_WEIGHT)
                + (score.getCertifications() * CERTIFICATION_WEIGHT)
                + (score.getProgress() * PROGRESS_WEIGHT);

        score.setFinalScore(
                Math.round(finalScore * 100.0) / 100.0
        );

        return score;
    }

    private double normalize(double value) {

        if (value < 0) {
            return 0;
        }

        if (value > 100) {
            return 100;
        }

        return value;
    }
}