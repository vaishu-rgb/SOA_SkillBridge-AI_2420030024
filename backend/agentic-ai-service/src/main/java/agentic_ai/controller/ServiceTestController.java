package agentic_ai.controller;

import agentic_ai.client.CareerServiceClient;
import agentic_ai.client.NotificationServiceClient;
import agentic_ai.client.OpportunityServiceClient;
import agentic_ai.client.PlanServiceClient;
import agentic_ai.client.SkillServiceClient;
import agentic_ai.client.UserServiceClient;
import agentic_ai.service.StudentDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class ServiceTestController {

    private final UserServiceClient userServiceClient;
    private final SkillServiceClient skillServiceClient;
    private final CareerServiceClient careerServiceClient;
    private final PlanServiceClient planServiceClient;
    private final OpportunityServiceClient opportunityServiceClient;
    private final NotificationServiceClient notificationServiceClient;
    private final StudentDataService studentDataService;

    public ServiceTestController(
            UserServiceClient userServiceClient,
            SkillServiceClient skillServiceClient,
            CareerServiceClient careerServiceClient,
            PlanServiceClient planServiceClient,
            OpportunityServiceClient opportunityServiceClient,
            NotificationServiceClient notificationServiceClient,
            StudentDataService studentDataService) {

        this.userServiceClient = userServiceClient;
        this.skillServiceClient = skillServiceClient;
        this.careerServiceClient = careerServiceClient;
        this.planServiceClient = planServiceClient;
        this.opportunityServiceClient = opportunityServiceClient;
        this.notificationServiceClient = notificationServiceClient;
        this.studentDataService = studentDataService;
    }

    @GetMapping("/user/{id}")
    public String getUser(
            @PathVariable Long id,
            HttpServletRequest request) {

        String token = extractToken(request);

        if (token == null) {
            return "Authorization token is missing";
        }

        return userServiceClient.getUserById(id, token);
    }

    @GetMapping("/skills/user/{id}")
    public String getSkills(
            @PathVariable Long id,
            HttpServletRequest request) {

        String token = extractToken(request);

        if (token == null) {
            return "Authorization token is missing";
        }

        return skillServiceClient.getSkillsByUserId(id, token);
    }

    @GetMapping("/career/{id}")
    public String getCareer(
            @PathVariable Long id,
            HttpServletRequest request) {

        String token = extractToken(request);

        if (token == null) {
            return "Authorization token is missing";
        }

        return careerServiceClient.getCareerById(id, token);
    }

    @GetMapping("/plans/user/{id}")
    public String getPlans(
            @PathVariable Long id,
            HttpServletRequest request) {

        String token = extractToken(request);

        if (token == null) {
            return "Authorization token is missing";
        }

        return planServiceClient.getPlansByUserId(id, token);
    }

    @GetMapping("/opportunities")
    public String getOpportunities(
            HttpServletRequest request) {

        String token = extractToken(request);

        if (token == null) {
            return "Authorization token is missing";
        }

        return opportunityServiceClient.getAllOpportunities(token);
    }

    @GetMapping("/notifications/user/{id}")
    public String getNotifications(
            @PathVariable Long id,
            HttpServletRequest request) {

        String token = extractToken(request);

        if (token == null) {
            return "Authorization token is missing";
        }

        return notificationServiceClient.getNotificationsByUserId(id, token);
    }

    @GetMapping("/student-data/{id}")
    public String getStudentData(
            @PathVariable Long id,
            HttpServletRequest request) {

        String token = extractToken(request);

        if (token == null) {
            return "Authorization token is missing";
        }

        return studentDataService.getStudentData(id, token);
    }

    private String extractToken(HttpServletRequest request) {

        String authorization = request.getHeader("Authorization");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return null;
        }

        return authorization.substring(7);
    }
}