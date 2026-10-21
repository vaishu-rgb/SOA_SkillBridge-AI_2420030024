package skillservice.kafka;

import skillservice.event.AssessmentCompletedEvent;
import skillservice.event.SkillUpdatedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private static final String SKILL_UPDATED_TOPIC = "SkillUpdated";
    private static final String ASSESSMENT_COMPLETED_TOPIC = "AssessmentCompleted";

    private final KafkaTemplate<String, SkillUpdatedEvent> skillKafkaTemplate;
    private final KafkaTemplate<String, AssessmentCompletedEvent> assessmentKafkaTemplate;

    public KafkaProducerService(
            KafkaTemplate<String, SkillUpdatedEvent> skillKafkaTemplate,
            KafkaTemplate<String, AssessmentCompletedEvent> assessmentKafkaTemplate) {

        this.skillKafkaTemplate = skillKafkaTemplate;
        this.assessmentKafkaTemplate = assessmentKafkaTemplate;
    }

    public void publishSkillUpdated(SkillUpdatedEvent event) {
        skillKafkaTemplate.send(
                SKILL_UPDATED_TOPIC,
                event.getUserId().toString(),
                event
        );
    }

    public void publishAssessmentCompleted(AssessmentCompletedEvent event) {
        assessmentKafkaTemplate.send(
                ASSESSMENT_COMPLETED_TOPIC,
                event.getUserId().toString(),
                event
        );
    }
}