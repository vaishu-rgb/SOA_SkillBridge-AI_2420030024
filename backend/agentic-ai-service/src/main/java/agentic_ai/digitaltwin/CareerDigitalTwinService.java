package agentic_ai.digitaltwin;

import agentic_ai.readiness.ReadinessScore;
import agentic_ai.readiness.ReadinessScoreService;
import agentic_ai.service.StudentDataService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CareerDigitalTwinService {

    private final Map<Long, CareerDigitalTwin> twins =
            new ConcurrentHashMap<>();

    private final StudentDataService studentDataService;
    private final ObjectMapper objectMapper;
    private final ReadinessScoreService readinessScoreService;

    public CareerDigitalTwinService(
            StudentDataService studentDataService,
            ObjectMapper objectMapper,
            ReadinessScoreService readinessScoreService) {

        this.studentDataService = studentDataService;
        this.objectMapper = objectMapper;
        this.readinessScoreService = readinessScoreService;
    }

    public CareerDigitalTwin getTwin(Long userId) {
        return twins.get(userId);
    }

    public CareerDigitalTwin createOrUpdateTwin(
            CareerDigitalTwin twin) {

        twins.put(twin.getUserId(), twin);
        return twin;
    }

    public boolean exists(Long userId) {
        return twins.containsKey(userId);
    }

    public void deleteTwin(Long userId) {
        twins.remove(userId);
    }

    public CareerDigitalTwin createTwinFromStudentData(
            Long userId,
            String token) {

        String studentData =
                studentDataService.getStudentData(
                        userId,
                        token
                );

        CareerDigitalTwin twin =
                new CareerDigitalTwin();

        twin.setUserId(userId);

        twin.setSkills(new ArrayList<>());
        twin.setProficiency(new ArrayList<>());
        twin.setProjects(new ArrayList<>());
        twin.setCertifications(new ArrayList<>());
        twin.setAssessments(new ArrayList<>());
        twin.setSkillGaps(new ArrayList<>());
        twin.setOpportunities(new ArrayList<>());

        try {

            JsonNode root =
                    objectMapper.readTree(studentData);

            // USER DATA
            JsonNode user =
                    root.get("user");

            if (user != null) {

                if (user.has("name")) {
                    twin.setName(
                            user.get("name").asText()
                    );
                }

                if (user.has("careerGoal")) {
                    twin.setCareerGoal(
                            user.get("careerGoal").asText()
                    );
                }
            }

            // SKILL DATA
            JsonNode skills =
                    root.get("skills");

            if (skills != null &&
                    skills.isArray()) {

                for (JsonNode skill : skills) {

                    String skillName =
                            skill.has("skillName")
                                    ? skill.get("skillName").asText()
                                    : "Unknown";

                    int proficiencyLevel =
                            skill.has("proficiencyLevel")
                                    ? skill.get("proficiencyLevel").asInt()
                                    : 0;

                    if (!twin.getSkills()
                            .contains(skillName)) {

                        twin.getSkills()
                                .add(skillName);
                    }

                    twin.getProficiency()
                            .add(
                                    skillName
                                            + " - Level "
                                            + proficiencyLevel
                            );
                }
            }

            twin.setProgress(
                    "Student data synchronized"
            );

        } catch (Exception e) {

            System.out.println(
                    "Error parsing student data: "
                            + e.getMessage()
            );

            twin.setProgress(
                    "Student data synchronization failed"
            );
        }

        twins.put(userId, twin);

        System.out.println();
        System.out.println("======================================");
        System.out.println("DIGITAL TWIN CREATED FROM REAL DATA");
        System.out.println("======================================");
        System.out.println("User ID: " + userId);
        System.out.println("Name: " + twin.getName());
        System.out.println("Career Goal: " + twin.getCareerGoal());
        System.out.println("Skills: " + twin.getSkills());
        System.out.println("Proficiency: " + twin.getProficiency());
        System.out.println("======================================");

        return twin;
    }

    // PHASE 27
    // Calculate and store the opportunity readiness score
    public ReadinessScore calculateAndStoreReadiness(
            Long userId,
            double skillMatch,
            double assessment,
            double projects,
            double certifications,
            double progress) {

        ReadinessScore score =
                readinessScoreService.calculateScore(
                        skillMatch,
                        assessment,
                        projects,
                        certifications,
                        progress
                );

        CareerDigitalTwin twin =
                twins.get(userId);

        if (twin == null) {

            twin = new CareerDigitalTwin();

            twin.setUserId(userId);
            twin.setSkills(new ArrayList<>());
            twin.setProficiency(new ArrayList<>());
            twin.setProjects(new ArrayList<>());
            twin.setCertifications(new ArrayList<>());
            twin.setAssessments(new ArrayList<>());
            twin.setSkillGaps(new ArrayList<>());
            twin.setOpportunities(new ArrayList<>());
        }

        twin.setReadinessScore(
                score.getFinalScore()
        );

        // Keep the existing integer readiness field
        twin.setReadiness(
                (int) Math.round(score.getFinalScore())
        );

        twin.setProgress(
                "Opportunity readiness score calculated"
        );

        twins.put(userId, twin);

        System.out.println();
        System.out.println("======================================");
        System.out.println("OPPORTUNITY READINESS SCORE");
        System.out.println("======================================");
        System.out.println("User ID: " + userId);
        System.out.println("Skill Match: " + score.getSkillMatch());
        System.out.println("Assessment: " + score.getAssessment());
        System.out.println("Projects: " + score.getProjects());
        System.out.println("Certifications: " + score.getCertifications());
        System.out.println("Progress: " + score.getProgress());
        System.out.println("Final Score: " + score.getFinalScore());
        System.out.println("======================================");

        return score;
    }
}