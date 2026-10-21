package agentic_ai.kafka;

import agentic_ai.dto.OrchestratorRequest;
import agentic_ai.dto.OrchestratorResponse;
import agentic_ai.event.AssessmentCompletedEvent;
import agentic_ai.service.AgentOrchestrator;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssessmentKafkaConsumer {

    private final AgentOrchestrator agentOrchestrator;

    public AssessmentKafkaConsumer(
            AgentOrchestrator agentOrchestrator) {

        this.agentOrchestrator = agentOrchestrator;
    }

    @KafkaListener(
            topics = "AssessmentCompleted",
            groupId = "skillbridge-agentic-ai-group"
    )
    public void consumeAssessmentCompleted(
            AssessmentCompletedEvent event) {

        System.out.println();
        System.out.println("======================================");
        System.out.println("ASSESSMENT COMPLETED EVENT RECEIVED");
        System.out.println("======================================");

        System.out.println(
                "User ID: " + event.getUserId()
        );

        System.out.println(
                "Assessment: " + event.getAssessmentName()
        );

        System.out.println(
                "Score: " + event.getScore()
                        + "/" + event.getTotalQuestions()
        );

        double percentage =
                ((double) event.getScore()
                        / event.getTotalQuestions()) * 100;

        System.out.println(
                "Assessment Percentage: "
                        + percentage + "%"
        );

        // =========================================================
        // CREATE ORCHESTRATOR REQUEST
        // =========================================================

        OrchestratorRequest request =
                new OrchestratorRequest();

        request.setUserId(
                event.getUserId()
        );

        request.setTargetCareer(
                "Data Engineer"
        );

        request.setProjects(
                List.of()
        );

        request.setCertifications(
                List.of()
        );

        request.setAssessmentResults(
                List.of(
                        event.getAssessmentName()
                                + " - "
                                + event.getScore()
                                + "/"
                                + event.getTotalQuestions()
                )
        );

        request.setRequiredSkills(
                List.of(
                        "Python",
                        "SQL",
                        "Apache Spark",
                        "ETL",
                        "AWS"
                )
        );

        request.setAvailability(
                "2 hours per day"
        );

        request.setPlanDurationWeeks(
                4
        );

        request.setReadinessScore(
                (int) percentage
        );

        request.setOpportunityRequirements(
                List.of(
                        "Python",
                        "SQL",
                        "Apache Spark",
                        "AWS"
                )
        );

        request.setProgressStatus(
                "Assessment completed"
        );

        request.setCompletedMilestones(
                List.of()
        );

        request.setMissedMilestones(
                List.of()
        );

        request.setStudentFeedback(
                "Assessment completed through Kafka event"
        );

        // =========================================================
        // START ORCHESTRATOR
        // =========================================================

        System.out.println();
        System.out.println("======================================");
        System.out.println("CALLING AGENT ORCHESTRATOR");
        System.out.println("======================================");

        long workflowStart =
                System.currentTimeMillis();

        try {

            /*
             * Kafka events do not contain a student JWT.
             *
             * Passing null causes StudentDataService
             * to use the configured internal service token.
             */
            OrchestratorResponse response =
                    agentOrchestrator.runWorkflow(
                            request,
                            null
                    );

            long totalTime =
                    System.currentTimeMillis()
                            - workflowStart;

            // =====================================================
            // SUCCESS
            // =====================================================

            System.out.println();
            System.out.println("======================================");
            System.out.println("AGENTIC AI WORKFLOW COMPLETED");
            System.out.println("======================================");

            System.out.println(
                    "Total Workflow Time: "
                            + (totalTime / 1000.0)
                            + " seconds"
            );

            System.out.println(
                    "Workflow Status: "
                            + response.getWorkflowStatus()
            );

            System.out.println();
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

        } catch (Exception e) {

            long totalTime =
                    System.currentTimeMillis()
                            - workflowStart;

            System.out.println();
            System.out.println("======================================");
            System.out.println("AGENTIC AI WORKFLOW FAILED");
            System.out.println("======================================");

            System.out.println(
                    "Failed after: "
                            + (totalTime / 1000.0)
                            + " seconds"
            );

            System.out.println(
                    "Error: "
                            + e.getMessage()
            );

            e.printStackTrace();

            System.out.println("======================================");
        }
    }
}