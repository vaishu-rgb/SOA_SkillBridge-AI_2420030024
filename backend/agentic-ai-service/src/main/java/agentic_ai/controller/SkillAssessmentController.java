package agentic_ai.controller;

import agentic_ai.dto.SkillAssessmentRequest;
import agentic_ai.service.SkillAssessmentAgent;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class SkillAssessmentController {

    private final SkillAssessmentAgent skillAssessmentAgent;

    public SkillAssessmentController(SkillAssessmentAgent skillAssessmentAgent) {
        this.skillAssessmentAgent = skillAssessmentAgent;
    }

    @PostMapping("/skill-assessment")
    public String assessSkills(@RequestBody SkillAssessmentRequest request) {

        return skillAssessmentAgent.assessSkills(request);
    }
}