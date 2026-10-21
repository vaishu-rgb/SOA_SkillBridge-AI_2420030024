package opportunity_service.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // Health check
                .requestMatchers("/actuator/health")
                .permitAll()

                // STUDENT - view opportunities
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/opportunities/**"
                ).hasAnyRole("STUDENT", "RECRUITER", "MENTOR", "ADMIN")

                // RECRUITER - create opportunities
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/opportunities"
                ).hasRole("RECRUITER")

                // RECRUITER - manage their opportunities
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/opportunities/**"
                ).hasRole("RECRUITER")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/opportunities/**"
                ).hasRole("RECRUITER")

                // Other API requests
                .requestMatchers("/api/**")
                .authenticated()

                .anyRequest()
                .permitAll()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}