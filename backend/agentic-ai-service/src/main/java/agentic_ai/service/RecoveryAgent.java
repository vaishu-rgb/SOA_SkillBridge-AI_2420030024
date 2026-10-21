package agentic_ai.service;

import agentic_ai.dto.RecoveryRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class RecoveryAgent {

    private final ChatClient chatClient;

    public RecoveryAgent(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String recoverPlan(RecoveryRequest request) {

        String prompt = """
                You are Agent 4 of SkillBridge AI, called the Recovery Agent.

                Your task is to monitor a student's learning progress and
                adapt their career learning plan when they fall behind,
                miss milestones, or perform poorly in an assessment.

                Analyze:
                1. The original learning plan
                2. Completed milestones
                3. Missed milestones
                4. Overall progress status
                5. Assessment result
                6. Student feedback

                Your responsibilities are:
                - Identify the main problem affecting progress.
                - Determine why the student may be struggling.
                - Recommend a practical recovery action.
                - Suggest an alternative learning approach when appropriate.
                - Modify the remaining learning plan.
                - Provide a short encouraging message.

                Do not simply repeat the original plan.
                The modified plan must respond to the student's actual
                progress, assessment performance, and feedback.

                Target Career:
                %s

                Original Plan:
                %s

                Completed Milestones:
                %s

                Missed Milestones:
                %s

                Progress Status:
                %s

                Assessment Result:
                %s

                Student Feedback:
                %s

                Return the result in clear JSON format.
                Do not add markdown code fences.

                Include:
                - problemIdentified
                - recoveryAction
                - alternativeAction
                - modifiedPlan
                - motivationMessage
                """.formatted(
                request.getTargetCareer(),
                request.getOriginalPlan(),
                request.getCompletedMilestones(),
                request.getMissedMilestones(),
                request.getProgressStatus(),
                request.getAssessmentResult(),
                request.getStudentFeedback()
        );

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}