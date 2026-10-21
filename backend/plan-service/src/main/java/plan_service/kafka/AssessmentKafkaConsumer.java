package plan_service.kafka;

import plan_service.event.AssessmentCompletedEvent;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class AssessmentKafkaConsumer {

    @KafkaListener(
        topics = "AssessmentCompleted",
        groupId = "skillbridge-plan-assessment-group",
        containerFactory = "assessmentKafkaListenerContainerFactory"
)
    public void consumeAssessmentCompleted(
            AssessmentCompletedEvent event) {

        System.out.println("====================================");
        System.out.println("AssessmentCompleted Event Received");
        System.out.println("PLAN SERVICE");
        System.out.println("====================================");

        System.out.println("User ID: " + event.getUserId());
        System.out.println("Assessment: " + event.getAssessmentName());
        System.out.println("Score: " + event.getScore());
        System.out.println("Total Questions: " + event.getTotalQuestions());

        double percentage =
                ((double) event.getScore()
                        / event.getTotalQuestions()) * 100;

        System.out.println("Assessment Percentage: "
                + percentage + "%");

        if (percentage < 50) {

            System.out.println(
                    "Plan Recommendation: Create a beginner learning plan."
            );

        } else if (percentage < 75) {

            System.out.println(
                    "Plan Recommendation: Create an intermediate learning plan."
            );

        } else {

            System.out.println(
                    "Plan Recommendation: Create an advanced learning plan."
            );
        }

        System.out.println("====================================");
    }
}