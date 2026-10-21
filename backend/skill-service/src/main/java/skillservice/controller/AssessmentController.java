package skillservice.controller;

import skillservice.event.AssessmentCompletedEvent;
import skillservice.kafka.KafkaProducerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final KafkaProducerService kafkaProducerService;

    public AssessmentController(
            KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completeAssessment(
            @RequestBody AssessmentCompletedEvent event) {

        kafkaProducerService.publishAssessmentCompleted(event);

        return ResponseEntity.ok(
                "Assessment completed and event published successfully"
        );
    }
}