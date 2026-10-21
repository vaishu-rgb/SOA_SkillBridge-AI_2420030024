package agentic_ai.service;

import agentic_ai.client.SkillServiceClient;
import agentic_ai.client.UserServiceClient;
import org.springframework.stereotype.Service;

@Service
public class StudentDataService {

    private final UserServiceClient userServiceClient;
    private final SkillServiceClient skillServiceClient;

    public StudentDataService(
            UserServiceClient userServiceClient,
            SkillServiceClient skillServiceClient) {

        this.userServiceClient = userServiceClient;
        this.skillServiceClient = skillServiceClient;
    }

    public String getStudentData(Long userId, String token) {

        String userData =
                userServiceClient.getUserById(userId, token);

        String skillData =
                skillServiceClient.getSkillsByUserId(userId, token);

        return """
                {
                    "user": %s,
                    "skills": %s
                }
                """.formatted(userData, skillData);
    }
}