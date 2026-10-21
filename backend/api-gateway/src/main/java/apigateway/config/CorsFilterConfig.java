package apigateway.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class CorsFilterConfig {

    @Bean
    public Filter corsFilter() {

        return new Filter() {

            @Override
            public void doFilter(
                    ServletRequest request,
                    ServletResponse response,
                    FilterChain chain)
                    throws IOException, ServletException {

                HttpServletRequest httpRequest =
                        (HttpServletRequest) request;

                HttpServletResponse httpResponse =
                        (HttpServletResponse) response;

                httpResponse.setHeader(
                        "Access-Control-Allow-Origin",
                        "http://localhost:5173"
                );

                httpResponse.setHeader(
                        "Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS"
                );

                httpResponse.setHeader(
                        "Access-Control-Allow-Headers",
                        "Authorization, Content-Type, Accept, Origin"
                );

                httpResponse.setHeader(
                        "Access-Control-Allow-Credentials",
                        "true"
                );

                if ("OPTIONS".equalsIgnoreCase(
                        httpRequest.getMethod())) {

                    httpResponse.setStatus(
                            HttpServletResponse.SC_OK
                    );

                    return;
                }

                chain.doFilter(request, response);
            }
        };
    }
}