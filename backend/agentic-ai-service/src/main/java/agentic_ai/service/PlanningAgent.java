package agentic_ai.service;

import agentic_ai.dto.PlanningRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class PlanningAgent {

    private final ChatClient chatClient;

    public PlanningAgent(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generatePlan(PlanningRequest request) {

        String prompt = """
                You are Agent 3 of SkillBridge AI, called the Personalized
                Career Planning Agent.

                Your task is to create a personalized, realistic learning
                plan for a student based on their target career, skill gaps,
                current proficiency, available study time, and plan duration.

                Create a week-by-week plan.

                For every week include:
                1. Week number
                2. Topic or skill
                3. Learning objective
                4. Activities
                5. Expected outcome

                Important rules:
                - Prioritize HIGH-priority skill gaps first.
                - Consider the student's existing proficiency.
                - Do not overload the student beyond their availability.
                - Include practical hands-on activities where appropriate.
                - Progress from fundamentals to advanced concepts.
                - Include at least one practical project or implementation
                  activity when the plan duration allows it.
                - Keep the plan achievable within the specified duration.

                Target Career:
                %s

                Skill Gaps:
                %s

                Current Proficiency:
                %s

                Student Availability:
                %s

                Plan Duration:
                %d weeks

                Return the result in clear JSON format.
                Do not add markdown code fences.

                Include:
                - planSummary
                - learningPlan
                - week
                - topic
                - objective
                - activities
                - expectedOutcome
                """.formatted(
                request.getTargetCareer(),
                request.getSkillGaps(),
                request.getCurrentProficiency(),
                request.getAvailability(),
                request.getPlanDurationWeeks()
        );

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}