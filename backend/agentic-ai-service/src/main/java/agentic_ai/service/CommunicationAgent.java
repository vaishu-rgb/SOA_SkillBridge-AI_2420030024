package agentic_ai.service;

import agentic_ai.dto.CommunicationRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class CommunicationAgent {

    private final ChatClient chatClient;

    public CommunicationAgent(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateCommunication(CommunicationRequest request) {

        String prompt = """
                You are Agent 6 of SkillBridge AI, called the Communication Agent.

                Your task is to provide personalized communication to a student
                based on their learning progress, career goal, milestones,
                deadlines, and current status.

                Communication types include:
                - REMINDER
                - PROGRESS_UPDATE
                - MILESTONE_ALERT
                - CAREER_GUIDANCE

                Analyze:
                1. Student name
                2. Communication type
                3. Target career
                4. Current progress
                5. Upcoming milestone
                6. Deadline
                7. Student status
                8. Additional context

                Your responsibilities are:
                - Generate a clear and personalized message.
                - Keep the communication concise and useful.
                - Match the tone to the student's current situation.
                - Highlight important deadlines or milestones.
                - Provide a practical recommended action.
                - Encourage the student when appropriate.
                - For urgent situations, mark the priority as HIGH.
                - For normal situations, use MEDIUM.
                - For informational situations, use LOW.

                Student Name:
                %s

                Communication Type:
                %s

                Target Career:
                %s

                Current Progress:
                %s

                Upcoming Milestone:
                %s

                Deadline:
                %s

                Student Status:
                %s

                Additional Context:
                %s

                Return the result in clear JSON format.
                Do not add markdown code fences.

                Include:
                - message
                - priority
                - recommendedAction
                """.formatted(
                request.getStudentName(),
                request.getCommunicationType(),
                request.getTargetCareer(),
                request.getCurrentProgress(),
                request.getUpcomingMilestone(),
                request.getDeadline(),
                request.getStudentStatus(),
                request.getAdditionalContext()
        );

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}