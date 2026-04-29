package com.fitness.gateway.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.gateway.JwtUtil;
import com.fitness.gateway.user.RegisterRequest;
import com.fitness.gateway.user.UserService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public Mono<ResponseEntity<?>> register(@RequestBody RegisterRequest request) {

        request.setPassword(passwordEncoder.encode(request.getPassword()));

        return userService.registerUser(request)
                .map(user -> ResponseEntity.ok("User Registered"));
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<AuthResponse>> login(@RequestBody LoginRequest request) {

        return userService.getUserByEmail(request.getEmail())
                .flatMap(user -> {

                    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                        return Mono.error(new RuntimeException("Invalid credentials"));
                    }

                    String token = jwtUtil.generateToken(user.getEmail());

                    return Mono.just(ResponseEntity.ok(
                            new AuthResponse(token, user.getId())
                    ));
                });
    }
}