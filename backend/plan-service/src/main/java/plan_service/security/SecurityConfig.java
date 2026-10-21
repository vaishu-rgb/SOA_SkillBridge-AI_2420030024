package plan_service.security;

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

                // Students can view career plans
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/plans/**"
                ).hasRole("STUDENT")

                // Students can update their progress/plans
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/plans/**"
                ).hasRole("STUDENT")

                // Other plan operations require ADMIN
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/plans"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/plans/**"
                ).hasRole("ADMIN")

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