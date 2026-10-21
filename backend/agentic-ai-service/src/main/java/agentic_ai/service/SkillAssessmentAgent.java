package agentic_ai.service;

import agentic_ai.dto.SkillAssessmentRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class SkillAssessmentAgent {

    private final ChatClient chatClient;

    public SkillAssessmentAgent(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String assessSkills(SkillAssessmentRequest request) {

        String prompt = """
                You are Agent 1 of SkillBridge AI, called the Skill Assessment Agent.

                Your task is to analyze a student's profile and determine the
                competency level of each technical skill.

                Analyze:
                1. Student profile
                2. Current skills
                3. Projects
                4. Certifications
                5. Assessment results

                For every skill, assign one competency level:
                BEGINNER, INTERMEDIATE, or ADVANCED.

                Provide a short reasoning for each competency level.

                Also provide an overall summary of the student's technical
                competency.

                Student Profile:
                %s

                Current Skills:
                %s

                Projects:
                %s

                Certifications:
                %s

                Assessment Results:
                %s

                Return the result in clear JSON format.
                Do not add markdown code fences.
                """.formatted(
                request.getStudentProfile(),
                request.getSkills(),
                request.getProjects(),
                request.getCertifications(),
                request.getAssessmentResults()
        );

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}