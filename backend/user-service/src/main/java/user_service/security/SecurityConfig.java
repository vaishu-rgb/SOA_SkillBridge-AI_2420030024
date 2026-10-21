package user_service.security;

import java.util.List;

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

            // =========================================
            // CSRF
            // =========================================
            .csrf(csrf -> csrf.disable())

            // =========================================
            // CORS
            // =========================================
            .cors(cors ->
                    cors.configurationSource(
                            corsConfigurationSource()
                    )
            )

            // =========================================
            // SESSION MANAGEMENT
            // =========================================
            // JWT authentication is stateless
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            // =========================================
            // AUTHORIZATION
            // =========================================
            .authorizeHttpRequests(auth -> auth

                // -----------------------------------------
                // PUBLIC APIs
                // -----------------------------------------

                // LOGIN
                // IMPORTANT:
                // This must match your Postman request:
                // POST /api/users/login
                .requestMatchers(
                        HttpMethod.POST,
                        "/api/users/login"
                ).permitAll()

                // USER REGISTRATION
                .requestMatchers(
                        HttpMethod.POST,
                        "/api/users"
                ).permitAll()

                // ACTUATOR
                .requestMatchers(
                        "/actuator/health"
                ).permitAll()

                .requestMatchers(
                        "/actuator/info"
                ).permitAll()


                // -----------------------------------------
                // USER MANAGEMENT
                // -----------------------------------------

                // Only ADMIN can view all users
                .requestMatchers(
                        HttpMethod.GET,
                        "/api/users"
                ).hasRole("ADMIN")

                // Only ADMIN can delete users
                .requestMatchers(
                        HttpMethod.DELETE,
                        "/api/users/**"
                ).hasRole("ADMIN")

                // Authenticated users can view individual user
                .requestMatchers(
                        HttpMethod.GET,
                        "/api/users/**"
                ).authenticated()

                // Authenticated users can update individual user
                .requestMatchers(
                        HttpMethod.PUT,
                        "/api/users/**"
                ).authenticated()


                // -----------------------------------------
                // OTHER API ENDPOINTS
                // -----------------------------------------

                // All remaining /api endpoints require JWT
                .requestMatchers(
                        "/api/**"
                ).authenticated()

                // -----------------------------------------
                // EVERYTHING ELSE
                // -----------------------------------------

                .anyRequest().permitAll()
            )

            // =========================================
            // JWT FILTER
            // =========================================
            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }


    // =========================================
    // CORS CONFIGURATION
    // =========================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:3000",
                        "http://localhost:5173"
                )
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