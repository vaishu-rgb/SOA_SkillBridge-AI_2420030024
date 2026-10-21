package notification_service.kafka;

import notification_service.event.AssessmentCompletedEvent;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class AssessmentKafkaConsumer {

    @KafkaListener(
            topics = "AssessmentCompleted",
            groupId = "skillbridge-notification-assessment-group",
            containerFactory = "assessmentKafkaListenerContainerFactory"
    )
    public void consumeAssessmentCompleted(
            AssessmentCompletedEvent event) {

        System.out.println("====================================");
        System.out.println("AssessmentCompleted Event Received");
        System.out.println("NOTIFICATION SERVICE");
        System.out.println("====================================");

        System.out.println("User ID: " + event.getUserId());
        System.out.println("Assessment: " + event.getAssessmentName());
        System.out.println("Score: " + event.getScore());
        System.out.println("Total Questions: "
                + event.getTotalQuestions());

        double percentage =
                ((double) event.getScore()
                        / event.getTotalQuestions()) * 100;

        System.out.println("Assessment Percentage: "
                + percentage + "%");

        String message;

        if (percentage < 50) {

            message =
                    "Your assessment shows significant skill gaps. "
                    + "A beginner learning plan is recommended.";

        } else if (percentage < 75) {

            message =
                    "Your assessment shows moderate skill gaps. "
                    + "An intermediate learning plan is recommended.";

        } else {

            message =
                    "Great performance! "
                    + "An advanced learning plan is recommended.";
        }

        System.out.println("Notification Message: " + message);

        System.out.println("Notification Status: READY");
        System.out.println("====================================");
    }
}