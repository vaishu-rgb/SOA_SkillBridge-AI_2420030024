package skillservice.controller;

import skillservice.entity.Skill;
import skillservice.service.SkillService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    // CREATE SKILL
    @PostMapping
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {

        Skill createdSkill = skillService.createSkill(skill);

        return new ResponseEntity<>(
                createdSkill,
                HttpStatus.CREATED
        );
    }

    // GET SKILL BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(
            @PathVariable Long id) {

        Skill skill = skillService.getSkillById(id);

        return ResponseEntity.ok(skill);
    }

    // GET ALL SKILLS
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {

        List<Skill> skills = skillService.getAllSkills();

        return ResponseEntity.ok(skills);
    }

    // GET SKILLS BY USER ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Skill>> getSkillsByUserId(
            @PathVariable Long userId) {

        List<Skill> skills =
                skillService.getSkillsByUserId(userId);

        return ResponseEntity.ok(skills);
    }

    // UPDATE SKILL
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skill) {

        Skill updatedSkill =
                skillService.updateSkill(id, skill);

        return ResponseEntity.ok(updatedSkill);
    }

    // DELETE SKILL
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(
            @PathVariable Long id) {

        skillService.deleteSkill(id);

        return ResponseEntity.noContent().build();
    }
}