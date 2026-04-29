package com.fitness.gateway.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {

    private final WebClient userServiceWebClient;

    public Mono<UserResponse> registerUser(RegisterRequest request) {
        return userServiceWebClient.post()
                .uri("/api/users/register")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(UserResponse.class);
    }

    public Mono<UserResponse> getUserByEmail(String email) {
        return userServiceWebClient.get()
                .uri("/api/users/email/{email}", email)
                .retrieve()
                .bodyToMono(UserResponse.class);
    }
}