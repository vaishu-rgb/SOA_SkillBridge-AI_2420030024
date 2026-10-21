package agentic_ai.service;

import agentic_ai.digitaltwin.CareerDigitalTwin;
import agentic_ai.digitaltwin.CareerDigitalTwinService;

import agentic_ai.dto.CommunicationRequest;
import agentic_ai.dto.GapAnalysisRequest;
import agentic_ai.dto.OpportunityMatchingRequest;
import agentic_ai.dto.OrchestratorRequest;
import agentic_ai.dto.OrchestratorResponse;
import agentic_ai.dto.PlanningRequest;
import agentic_ai.dto.RecoveryRequest;
import agentic_ai.dto.SkillAssessmentRequest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class AgentOrchestrator {

    private final SkillAssessmentAgent skillAssessmentAgent;
    private final GapAnalysisAgent gapAnalysisAgent;
    private final PlanningAgent planningAgent;
    private final RecoveryAgent recoveryAgent;
    private final OpportunityMatchingAgent opportunityMatchingAgent;
    private final CommunicationAgent communicationAgent;
    private final StudentDataService studentDataService;
    private final CareerDigitalTwinService careerDigitalTwinService;
    private final ObjectMapper objectMapper;


    public AgentOrchestrator(
            SkillAssessmentAgent skillAssessmentAgent,
            GapAnalysisAgent gapAnalysisAgent,
            PlanningAgent planningAgent,
            RecoveryAgent recoveryAgent,
            OpportunityMatchingAgent opportunityMatchingAgent,
            CommunicationAgent communicationAgent,
            StudentDataService studentDataService,
            CareerDigitalTwinService careerDigitalTwinService,
            ObjectMapper objectMapper) {

        this.skillAssessmentAgent = skillAssessmentAgent;
        this.gapAnalysisAgent = gapAnalysisAgent;
        this.planningAgent = planningAgent;
        this.recoveryAgent = recoveryAgent;
        this.opportunityMatchingAgent = opportunityMatchingAgent;
        this.communicationAgent = communicationAgent;
        this.studentDataService = studentDataService;
        this.careerDigitalTwinService = careerDigitalTwinService;
        this.objectMapper = objectMapper;
    }


    public OrchestratorResponse runWorkflow(
            OrchestratorRequest request,
            String token) {

        long workflowStart = System.currentTimeMillis();

        System.out.println();
        System.out.println("======================================");
        System.out.println("STARTING AGENTIC AI WORKFLOW");
        System.out.println("======================================");

        System.out.println("User ID: " + request.getUserId());
        System.out.println("Target Career: " + request.getTargetCareer());
        System.out.println("Readiness Score: " + request.getReadinessScore());


        // =========================================================
        // STEP 1 — GET REAL STUDENT DATA
        // =========================================================

        System.out.println();
        System.out.println(">>> FETCHING REAL STUDENT DATA");

        long dataStart = System.currentTimeMillis();

        String studentData =
                studentDataService.getStudentData(
                        request.getUserId(),
                        token
                );

        System.out.println(
                "<<< STUDENT DATA FETCHED IN "
                        + elapsedSeconds(dataStart)
                        + " seconds"
        );


        // =========================================================
        // STEP 2 — GET CAREER DIGITAL TWIN
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println(">>> LOADING CAREER DIGITAL TWIN");
        System.out.println("======================================");

        CareerDigitalTwin digitalTwin =
                careerDigitalTwinService.getTwin(
                        request.getUserId()
                );

        /*
         * If the Digital Twin does not exist yet,
         * create it from the real User + Skill data.
         */
        if (digitalTwin == null) {

            digitalTwin =
                    careerDigitalTwinService.createTwinFromStudentData(
                            request.getUserId(),
                            token
                    );
        }

        String digitalTwinData;

        try {

            digitalTwinData =
                    objectMapper.writeValueAsString(
                            digitalTwin
                    );

        } catch (Exception e) {

            digitalTwinData =
                    "{}";

            System.out.println(
                    "Error converting Digital Twin to JSON: "
                            + e.getMessage()
            );
        }

        System.out.println(
                "Digital Twin Loaded for User ID: "
                        + request.getUserId()
        );

        System.out.println(
                "Digital Twin Data: "
                        + digitalTwinData
        );

        System.out.println("======================================");


        // =========================================================
        // EXTRACT REAL SKILLS
        // =========================================================

        List<String> realSkills =
                extractSkills(studentData);

        System.out.println(
                "Real Skills Found: "
                        + realSkills
        );


        // =========================================================
        // AGENT 1 — SKILL ASSESSMENT
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println(">>> AGENT 1 START — SKILL ASSESSMENT");
        System.out.println("======================================");

        long agent1Start = System.currentTimeMillis();

        SkillAssessmentRequest skillRequest =
                new SkillAssessmentRequest();

        /*
         * Agent 1 now receives the Career Digital Twin
         * as its student profile.
         */
        skillRequest.setStudentProfile(
                digitalTwinData
        );

        skillRequest.setSkills(
                realSkills
        );

        skillRequest.setProjects(
                request.getProjects()
        );

        skillRequest.setCertifications(
                request.getCertifications()
        );

        skillRequest.setAssessmentResults(
                request.getAssessmentResults()
        );

        String skillAssessment =
                skillAssessmentAgent.assessSkills(
                        skillRequest
                );

        System.out.println(
                "<<< AGENT 1 COMPLETED IN "
                        + elapsedSeconds(agent1Start)
                        + " seconds"
        );


        // =========================================================
        // AGENT 2 — GAP ANALYSIS
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println(">>> AGENT 2 START — GAP ANALYSIS");
        System.out.println("======================================");

        long agent2Start = System.currentTimeMillis();

        GapAnalysisRequest gapRequest =
                new GapAnalysisRequest();

        gapRequest.setTargetCareer(
                request.getTargetCareer()
        );

        gapRequest.setCurrentSkills(
                realSkills
        );

        gapRequest.setRequiredSkills(
                request.getRequiredSkills()
        );

        String gapAnalysis =
                gapAnalysisAgent.analyzeGaps(
                        gapRequest
                );

        System.out.println(
                "<<< AGENT 2 COMPLETED IN "
                        + elapsedSeconds(agent2Start)
                        + " seconds"
        );


        // =========================================================
        // AGENT 3 — PERSONALIZED PLANNING
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println(">>> AGENT 3 START — PERSONALIZED PLANNING");
        System.out.println("======================================");

        long agent3Start = System.currentTimeMillis();

        PlanningRequest planningRequest =
                new PlanningRequest();

        planningRequest.setTargetCareer(
                request.getTargetCareer()
        );

        planningRequest.setSkillGaps(
                Collections.singletonList(
                        gapAnalysis
                )
        );

        planningRequest.setCurrentProficiency(
                realSkills
        );

        planningRequest.setAvailability(
                request.getAvailability()
        );

        planningRequest.setPlanDurationWeeks(
                request.getPlanDurationWeeks()
        );

        String learningPlan =
                planningAgent.generatePlan(
                        planningRequest
                );

        System.out.println(
                "<<< AGENT 3 COMPLETED IN "
                        + elapsedSeconds(agent3Start)
                        + " seconds"
        );


        // =========================================================
        // AGENT 4 — RECOVERY
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println(">>> AGENT 4 START — RECOVERY");
        System.out.println("======================================");

        long agent4Start = System.currentTimeMillis();

        RecoveryRequest recoveryRequest =
                new RecoveryRequest();

        recoveryRequest.setTargetCareer(
                request.getTargetCareer()
        );

        recoveryRequest.setOriginalPlan(
                Collections.singletonList(
                        learningPlan
                )
        );

        recoveryRequest.setCompletedMilestones(
                request.getCompletedMilestones()
        );

        recoveryRequest.setMissedMilestones(
                request.getMissedMilestones()
        );

        recoveryRequest.setProgressStatus(
                request.getProgressStatus()
        );

        recoveryRequest.setAssessmentResult(
                joinList(
                        request.getAssessmentResults()
                )
        );

        recoveryRequest.setStudentFeedback(
                request.getStudentFeedback()
        );

        String recoveryPlan =
                recoveryAgent.recoverPlan(
                        recoveryRequest
                );

        System.out.println(
                "<<< AGENT 4 COMPLETED IN "
                        + elapsedSeconds(agent4Start)
                        + " seconds"
        );


        // =========================================================
        // AGENT 5 — OPPORTUNITY MATCHING
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println(">>> AGENT 5 START — OPPORTUNITY MATCHING");
        System.out.println("======================================");

        long agent5Start = System.currentTimeMillis();

        OpportunityMatchingRequest opportunityRequest =
                new OpportunityMatchingRequest();

        /*
         * Agent 5 now receives the Career Digital Twin
         * instead of only the raw student data.
         */
        opportunityRequest.setStudentProfile(
                digitalTwinData
        );

        opportunityRequest.setSkills(
                realSkills
        );

        Integer readinessScore = digitalTwin.getReadiness();

if (readinessScore == null) {
    readinessScore = 0;
}

opportunityRequest.setReadinessScore(
        readinessScore
);

        List<String> opportunityContext =
                new ArrayList<>();

        if (request.getOpportunityRequirements() != null) {

            opportunityContext.addAll(
                    request.getOpportunityRequirements()
            );
        }

        /*
         * Recovery Agent output is still passed to Agent 5.
         */
        opportunityContext.add(
                "Updated Plan from Recovery Agent: "
                        + recoveryPlan
        );
opportunityContext.add(
        "Career Digital Twin: " + digitalTwinData
);

opportunityContext.add(
        "Backend Calculated Readiness Score: "
                + readinessScore
);
        /*
         * Add Digital Twin context.
         */
        opportunityContext.add(
                "Career Digital Twin: "
                        + digitalTwinData
        );

        opportunityRequest.setOpportunityRequirements(
                opportunityContext
        );

        String opportunityMatches =
                opportunityMatchingAgent.matchOpportunities(
                        opportunityRequest
                );

        System.out.println(
                "<<< AGENT 5 COMPLETED IN "
                        + elapsedSeconds(agent5Start)
                        + " seconds"
        );


        // =========================================================
        // AGENT 6 — COMMUNICATION
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println(">>> AGENT 6 START — COMMUNICATION");
        System.out.println("======================================");

        long agent6Start = System.currentTimeMillis();

        CommunicationRequest communicationRequest =
                new CommunicationRequest();

        communicationRequest.setStudentName(
                extractStudentName(studentData)
        );

        communicationRequest.setCommunicationType(
                "CAREER_GUIDANCE"
        );

        communicationRequest.setTargetCareer(
                request.getTargetCareer()
        );

        communicationRequest.setCurrentProgress(
                request.getProgressStatus()
        );

        communicationRequest.setUpcomingMilestone(
                firstItem(
                        request.getMissedMilestones()
                )
        );

        communicationRequest.setDeadline(
                ""
        );

        communicationRequest.setStudentStatus(
                request.getProgressStatus()
        );

        /*
         * Agent 6 receives both Recovery Agent
         * information and Career Digital Twin information.
         */
        communicationRequest.setAdditionalContext(
                "Career Digital Twin: "
                        + digitalTwinData
                        + "\n\nRecovery Plan: "
                        + recoveryPlan
        );

        String communication =
                communicationAgent.generateCommunication(
                        communicationRequest
                );

        System.out.println(
                "<<< AGENT 6 COMPLETED IN "
                        + elapsedSeconds(agent6Start)
                        + " seconds"
        );


        // =========================================================
        // FINAL RESPONSE
        // =========================================================

        long totalTime =
                System.currentTimeMillis()
                        - workflowStart;

        System.out.println();
        System.out.println("======================================");
        System.out.println("AGENTIC AI WORKFLOW COMPLETED");
        System.out.println("======================================");

        System.out.println(
                "TOTAL WORKFLOW TIME: "
                        + (totalTime / 1000.0)
                        + " seconds"
        );

        System.out.println();

        System.out.println(
                "Career Digital Twin: CONNECTED"
        );

        System.out.println(
                "Agent 1 - Skill Assessment: COMPLETED"
        );

        System.out.println(
                "Agent 2 - Gap Analysis: COMPLETED"
        );

        System.out.println(
                "Agent 3 - Planning: COMPLETED"
        );

        System.out.println(
                "Agent 4 - Recovery: COMPLETED"
        );

        System.out.println(
                "Agent 5 - Opportunity Matching: COMPLETED"
        );

        System.out.println(
                "Agent 6 - Communication: COMPLETED"
        );

        System.out.println("======================================");


        OrchestratorResponse response =
                new OrchestratorResponse();

        response.setWorkflowStatus(
                "All six AI agents executed successfully using Career Digital Twin and real student data"
        );

        response.setSkillAssessment(
                skillAssessment
        );

        response.setGapAnalysis(
                gapAnalysis
        );

        response.setLearningPlan(
                learningPlan
        );

        response.setRecoveryPlan(
                recoveryPlan
        );

        response.setOpportunityMatches(
                opportunityMatches
        );

        response.setCommunication(
                communication
        );

        return response;
    }


    // =============================================================
    // ELAPSED TIME
    // =============================================================

    private double elapsedSeconds(
            long startTime) {

        return (
                System.currentTimeMillis()
                        - startTime
        ) / 1000.0;
    }


    // =============================================================
    // EXTRACT SKILLS FROM REAL SKILL SERVICE DATA
    // =============================================================

    private List<String> extractSkills(
            String studentData) {

        List<String> skills =
                new ArrayList<>();

        try {

            JsonNode root =
                    objectMapper.readTree(
                            studentData
                    );

            JsonNode skillsNode =
                    root.get("skills");

            if (skillsNode != null
                    && skillsNode.isArray()) {

                for (JsonNode skill :
                        skillsNode) {

                    String skillName =
                            skill.path("skillName")
                                    .asText("");

                    int proficiency =
                            skill.path("proficiencyLevel")
                                    .asInt(0);

                    int experience =
                            skill.path("yearsOfExperience")
                                    .asInt(0);

                    if (!skillName.isEmpty()) {

                        skills.add(
                                skillName
                                        + " (proficiency "
                                        + proficiency
                                        + "/5, "
                                        + experience
                                        + " years experience)"
                        );
                    }
                }
            }

        } catch (Exception e) {

            System.out.println(
                    "Error extracting skills: "
                            + e.getMessage()
            );
        }

        return skills;
    }


    // =============================================================
    // EXTRACT STUDENT NAME
    // =============================================================

    private String extractStudentName(
            String studentData) {

        try {

            JsonNode root =
                    objectMapper.readTree(
                            studentData
                    );

            JsonNode userNode =
                    root.get("user");

            if (userNode != null) {

                return userNode
                        .path("name")
                        .asText("Student");
            }

        } catch (Exception e) {

            System.out.println(
                    "Error extracting student name: "
                            + e.getMessage()
            );
        }

        return "Student";
    }


    // =============================================================
    // JOIN LIST INTO STRING
    // =============================================================

    private String joinList(
            List<String> values) {

        if (values == null
                || values.isEmpty()) {

            return "";
        }

        return String.join(
                ", ",
                values
        );
    }


    // =============================================================
    // GET FIRST LIST ITEM
    // =============================================================

    private String firstItem(
            List<String> values) {

        if (values == null
                || values.isEmpty()) {

            return "";
        }

        return values.get(0);
    }
}