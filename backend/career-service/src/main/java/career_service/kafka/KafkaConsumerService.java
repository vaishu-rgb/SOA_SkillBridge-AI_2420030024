package career_service.kafka;

import career_service.event.SkillUpdatedEvent;
import career_service.service.CareerGapAnalysisService;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.kafka.annotation.EnableKafka;

@EnableKafka
@Service
public class KafkaConsumerService {

    private final CareerGapAnalysisService careerGapAnalysisService;

    public KafkaConsumerService(
            CareerGapAnalysisService careerGapAnalysisService) {
        this.careerGapAnalysisService = careerGapAnalysisService;
    }

    @KafkaListener(
            topics = "SkillUpdated",
            groupId = "skillbridge-career-group"
    )
    public void consumeSkillUpdated(SkillUpdatedEvent event) {

        System.out.println("====================================");
        System.out.println("SkillUpdated Event Received");
        System.out.println("Skill ID: " + event.getSkillId());
        System.out.println("User ID: " + event.getUserId());
        System.out.println("Skill Name: " + event.getSkillName());
        System.out.println("Category: " + event.getCategory());
        System.out.println("Proficiency Level: " + event.getProficiencyLevel());
        System.out.println("Years of Experience: " + event.getYearsOfExperience());
        System.out.println("====================================");

        careerGapAnalysisService.analyzeSkill(event);
    }
}