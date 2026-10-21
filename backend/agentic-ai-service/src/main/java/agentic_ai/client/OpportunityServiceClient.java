package agentic_ai.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpportunityServiceClient {

    private final RestTemplate restTemplate;

    public OpportunityServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getAllOpportunities(String token) {

        String url = "http://localhost:8085/api/opportunities";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
}