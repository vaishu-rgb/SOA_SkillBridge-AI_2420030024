package skillservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            // REST API - disable CSRF
            .csrf(csrf -> csrf.disable())

            // CORS
            .cors(cors ->
                cors.configurationSource(corsConfigurationSource())
            )

            // Stateless authentication
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // Authorization
            .authorizeHttpRequests(auth -> auth

                // Health endpoints
                .requestMatchers(
                    "/actuator/health",
                    "/actuator/info"
                ).permitAll()

                // GET operations are available to
                // authenticated users and Agentic AI service
                .requestMatchers(HttpMethod.GET, "/api/skills/**")
                .authenticated()

                // STUDENT can create/update/delete skills
                .requestMatchers(HttpMethod.POST, "/api/skills/**")
                .hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/skills/**")
                .hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/api/skills/**")
                .hasAnyRole("STUDENT", "ADMIN")

                // Everything else
                .requestMatchers("/api/**")
                .authenticated()

                .anyRequest()
                .authenticated()
            )

            // JWT + internal service token filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
            new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            )
        );

        configuration.setAllowedHeaders(
            List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}