package agentic_ai.kafka;

import agentic_ai.digitaltwin.CareerDigitalTwin;
import agentic_ai.digitaltwin.CareerDigitalTwinService;
import agentic_ai.event.SkillUpdatedEvent;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SkillUpdatedKafkaConsumer {

    private final CareerDigitalTwinService digitalTwinService;

    public SkillUpdatedKafkaConsumer(
            CareerDigitalTwinService digitalTwinService) {

        this.digitalTwinService = digitalTwinService;
    }

    @KafkaListener(
        topics = "SkillUpdated",
        groupId = "skillbridge-digital-twin-group",
        containerFactory = "skillUpdatedKafkaListenerContainerFactory"
)
    public void consumeSkillUpdated(SkillUpdatedEvent event) {

        System.out.println();
        System.out.println("======================================");
        System.out.println("DIGITAL TWIN — SKILL UPDATE RECEIVED");
        System.out.println("======================================");

        System.out.println("User ID: " + event.getUserId());
        System.out.println("Skill: " + event.getSkillName());
        System.out.println(
                "Proficiency: " + event.getProficiencyLevel()
        );
        System.out.println(
                "Years of Experience: "
                        + event.getYearsOfExperience()
        );

        Long userId = event.getUserId();

        CareerDigitalTwin twin =
                digitalTwinService.getTwin(userId);

        /*
         * If the student does not have a Digital Twin yet,
         * create a new one.
         */
        if (twin == null) {

            twin = new CareerDigitalTwin();

            twin.setUserId(userId);
            twin.setSkills(new ArrayList<>());
            twin.setProficiency(new ArrayList<>());

            twin.setProjects(new ArrayList<>());
            twin.setCertifications(new ArrayList<>());
            twin.setAssessments(new ArrayList<>());
            twin.setSkillGaps(new ArrayList<>());
            twin.setOpportunities(new ArrayList<>());

            twin.setProgress("Skill update received");
            twin.setReadiness(0);
        }

        /*
         * Update skills.
         */
        List<String> skills = twin.getSkills();

        if (skills == null) {
            skills = new ArrayList<>();
        }

        if (!skills.contains(event.getSkillName())) {
            skills.add(event.getSkillName());
        }

        twin.setSkills(skills);


        /*
         * Update proficiency.
         */
        List<String> proficiency =
                twin.getProficiency();

        if (proficiency == null) {
            proficiency = new ArrayList<>();
        }

        String proficiencyEntry =
                event.getSkillName()
                        + " - Level "
                        + event.getProficiencyLevel();

        boolean updated = false;

        for (int i = 0; i < proficiency.size(); i++) {

            if (proficiency.get(i)
                    .startsWith(event.getSkillName() + " -")) {

                proficiency.set(i, proficiencyEntry);
                updated = true;
                break;
            }
        }

        if (!updated) {
            proficiency.add(proficiencyEntry);
        }

        twin.setProficiency(proficiency);


        /*
         * Update progress information.
         */
        twin.setProgress(
                "Skill updated: "
                        + event.getSkillName()
        );


        /*
         * Save the updated Digital Twin.
         */
        digitalTwinService.createOrUpdateTwin(twin);


        System.out.println();
        System.out.println(
                "Career Digital Twin updated successfully."
        );

        System.out.println(
                "Updated Skills: "
                        + twin.getSkills()
        );

        System.out.println(
                "Updated Proficiency: "
                        + twin.getProficiency()
        );

        System.out.println("======================================");
    }
}