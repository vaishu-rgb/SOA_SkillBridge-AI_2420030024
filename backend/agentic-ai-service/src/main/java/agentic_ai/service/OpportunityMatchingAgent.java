package agentic_ai.service;

import agentic_ai.dto.OpportunityMatchingRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class OpportunityMatchingAgent {

    private final ChatClient chatClient;

    public OpportunityMatchingAgent(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String matchOpportunities(OpportunityMatchingRequest request) {

        String prompt = """
                You are Agent 5 of SkillBridge AI, called the Opportunity Matching Agent.

                Your task is to match a student with suitable career opportunities
                based on their profile, skills, readiness score, and opportunity
                requirements.

                Analyze:
                1. Student profile
                2. Current skills
                3. Current readiness score
                4. Opportunity requirements
                5. Updated plan from the Recovery Agent

                Your responsibilities are:
                - Identify the most suitable opportunities.
                - Compare the student's skills with the required skills.
                - Consider the student's readiness score.
                - Consider the updated recovery plan.
                - Calculate or estimate a realistic opportunity-specific readiness score.
                - Explain why each opportunity is suitable.
                - Prefer opportunities where the student has a strong skill match.
                - Do not recommend opportunities when the skill gap is too large.

                Student Profile:
                %s

                Student Skills:
                %s

                Current Readiness Score:
                %s

                Opportunity Requirements and Updated Recovery Plan:
                %s

                Use the Updated Plan from the Recovery Agent as additional context
                when evaluating opportunity matches.

                Consider whether the student is ready for the opportunity based on:
                1. Current skills
                2. Readiness score
                3. Required skills
                4. Updated recovery plan
                5. Remaining skill gaps

                For each opportunity, explain:
                - Match status
                - Matching skills
                - Missing skills
                - Readiness level
                - Recommended next action

                Return the result in clear JSON format.
                Do not add markdown code fences.

                Include:
                - overallAssessment
                - matches

                Each match must contain:
                - opportunity
                - readinessScore
                - reasoning
                """.formatted(
                request.getStudentProfile(),
                request.getSkills(),
                request.getReadinessScore(),
                request.getOpportunityRequirements()
        );

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}