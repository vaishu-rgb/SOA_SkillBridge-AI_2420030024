package career_service.service;

import career_service.event.SkillUpdatedEvent;

import org.springframework.stereotype.Service;

@Service
public class CareerGapAnalysisService {

    public void analyzeSkill(SkillUpdatedEvent event) {

        System.out.println("====================================");
        System.out.println("CAREER GAP ANALYSIS");
        System.out.println("====================================");

        System.out.println("User ID: " + event.getUserId());
        System.out.println("Skill: " + event.getSkillName());
        System.out.println("Category: " + event.getCategory());
        System.out.println("Current Proficiency: " + event.getProficiencyLevel());
        System.out.println("Experience: " + event.getYearsOfExperience() + " years");

        Integer proficiency = event.getProficiencyLevel();

        if (proficiency == null) {
            System.out.println("Recommendation: Proficiency level is missing.");
        } 
        else if (proficiency < 3) {
            System.out.println(
                    "Recommendation: Beginner level. Focus on fundamentals and practice."
            );
        } 
        else if (proficiency == 3) {
            System.out.println(
                    "Recommendation: Intermediate level. Work on projects and advanced concepts."
            );
        } 
        else if (proficiency >= 4) {
            System.out.println(
                    "Recommendation: Good proficiency. Focus on advanced projects and industry skills."
            );
        }

        System.out.println("====================================");
    }
}