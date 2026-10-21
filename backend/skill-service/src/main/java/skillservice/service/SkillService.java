package skillservice.service;

import skillservice.entity.Skill;
import skillservice.event.SkillUpdatedEvent;
import skillservice.kafka.KafkaProducerService;
import skillservice.repository.SkillRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final KafkaProducerService kafkaProducerService;

    public SkillService(
            SkillRepository skillRepository,
            KafkaProducerService kafkaProducerService) {

        this.skillRepository = skillRepository;
        this.kafkaProducerService = kafkaProducerService;
    }

    // CREATE
    public Skill createSkill(Skill skill) {

        Skill savedSkill = skillRepository.save(skill);

        publishSkillUpdatedEvent(savedSkill);

        return savedSkill;
    }

    // GET BY ID
    public Skill getSkillById(Long id) {

        return skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found with id: " + id));
    }

    // GET ALL
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // GET BY USER ID
    public List<Skill> getSkillsByUserId(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    // UPDATE
    public Skill updateSkill(Long id, Skill skillDetails) {

        Skill existingSkill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found with id: " + id));

        existingSkill.setUserId(skillDetails.getUserId());
        existingSkill.setSkillName(skillDetails.getSkillName());
        existingSkill.setCategory(skillDetails.getCategory());
        existingSkill.setProficiencyLevel(
                skillDetails.getProficiencyLevel());
        existingSkill.setYearsOfExperience(
                skillDetails.getYearsOfExperience());

        Skill updatedSkill = skillRepository.save(existingSkill);

        publishSkillUpdatedEvent(updatedSkill);

        return updatedSkill;
    }

    // DELETE
    public void deleteSkill(Long id) {

        Skill existingSkill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found with id: " + id));

        skillRepository.delete(existingSkill);
    }

    // PUBLISH KAFKA EVENT
    private void publishSkillUpdatedEvent(Skill skill) {

        SkillUpdatedEvent event = new SkillUpdatedEvent(
                skill.getId(),
                skill.getUserId(),
                skill.getSkillName(),
                skill.getCategory(),
                skill.getProficiencyLevel(),
                skill.getYearsOfExperience()
        );

        kafkaProducerService.publishSkillUpdated(event);
    }
}