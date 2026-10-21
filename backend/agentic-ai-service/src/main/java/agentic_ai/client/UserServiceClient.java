package agentic_ai.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceClient {

    private final RestTemplate restTemplate;

    @Value("${skillbridge.internal-token:skillbridge-internal-agent-token}")
private String internalToken;


    public UserServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getUserById(Long userId, String token) {

    String url =
            "http://localhost:8081/api/users/" + userId;

    HttpHeaders headers = new HttpHeaders();

    // Use internal service authentication
    headers.setBearerAuth(internalToken);

    HttpEntity<Void> entity =
            new HttpEntity<>(headers);

    ResponseEntity<String> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

    return response.getBody();
}
}