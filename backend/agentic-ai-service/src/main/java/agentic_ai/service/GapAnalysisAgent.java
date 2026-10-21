package agentic_ai.service;

import agentic_ai.dto.GapAnalysisRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class GapAnalysisAgent {

    private final ChatClient chatClient;

    public GapAnalysisAgent(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String analyzeGaps(GapAnalysisRequest request) {

        String prompt = """
                You are Agent 2 of SkillBridge AI, called the Gap Analysis Agent.

                Your task is to compare a student's current skills with the
                skills required for their target career.

                Identify:
                1. Missing skills
                2. Skills that need improvement
                3. Priority of each gap
                4. Severity of each gap
                5. A short reason for each identified gap

                Priority must be one of:
                LOW, MEDIUM, HIGH

                Severity must be one of:
                LOW, MEDIUM, HIGH

                Target Career:
                %s

                Student's Current Skills:
                %s

                Required Skills for the Career:
                %s

                Consider a skill to be a gap when it is completely missing
                or when the student's current proficiency is insufficient
                for the target career.

                Focus on the most important gaps rather than repeating
                skills that are already adequately covered.

                Return the result in clear JSON format.
                Do not add markdown code fences.

                Include:
                - overallAssessment
                - skillGaps
                - skill
                - priority
                - severity
                - reasoning
                """.formatted(
                request.getTargetCareer(),
                request.getCurrentSkills(),
                request.getRequiredSkills()
        );

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}