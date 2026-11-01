package com.ecommerce.app.service;

import com.ecommerce.app.dto.AuthResponse;
import com.ecommerce.app.dto.LoginRequest;
import com.ecommerce.app.dto.RegisterRequest;
import com.ecommerce.app.model.User;
import com.ecommerce.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = "jwt-token-" + UUID.randomUUID();

        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .phone(user.getPhone())
                .address(user.getAddress())
                .message("Login successful")
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already registered");
        }

        User user = User.builder()
                .name(request.getName().trim())
                .email(email)
                .password(request.getPassword())
                .role("CUSTOMER")
                .phone(request.getPhone() != null ? request.getPhone().trim() : "")
                .address(request.getAddress() != null ? request.getAddress().trim() : "")
                .build();

        user = userRepository.save(user);

        String token = "jwt-token-" + UUID.randomUUID();

        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .phone(user.getPhone())
                .address(user.getAddress())
                .message("Account registered successfully")
                .build();
    }

    public User getUserProfile(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
