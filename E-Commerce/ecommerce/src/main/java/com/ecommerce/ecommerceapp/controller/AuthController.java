package com.ecommerce.ecommerceapp.controller;

import com.ecommerce.ecommerceapp.entity.Users;
import com.ecommerce.ecommerceapp.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public record RegisterRequest(
            @NotBlank(message = "Name is required") String name,
            @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,
            @NotBlank(message = "Password is required") String password,
            String phone,
            String address,
            String role
    ) {}

    public record LoginRequest(
            @NotBlank(message = "Email is required") String email,
            @NotBlank(message = "Password is required") String password
    ) {}

    public record AuthResponse(
            Long id,
            String name,
            String email,
            String role,
            String phone,
            String address,
            String message
    ) {}

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        String cleanEmail = request.email().trim().toLowerCase();
        if (userRepository.findByEmail(cleanEmail).isPresent()) {
            throw new IllegalArgumentException("Email is already registered. Please sign in instead.");
        }
        if (request.password().trim().length() < 4) {
            throw new IllegalArgumentException("Password must be at least 4 characters long.");
        }

        Users user = new Users();
        user.setName(request.name().trim());
        user.setEmail(cleanEmail);
        user.setPassword(request.password());
        user.setRole(request.role() != null && !request.role().isBlank() ? request.role().toUpperCase() : "CUSTOMER");
        user.setPhone(request.phone());
        user.setAddress(request.address());

        Users saved = userRepository.save(user);
        return new AuthResponse(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getRole(),
                saved.getPhone(),
                saved.getAddress(),
                "Registration successful! Welcome to NOVA Store."
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        String cleanEmail = request.email().trim().toLowerCase();
        Users user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (user.getPassword() == null || !user.getPassword().equals(request.password())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getAddress(),
                "Login successful! Welcome back, " + user.getName() + "."
        );
    }

    @GetMapping("/me/{id}")
    public AuthResponse getCurrentUser(@PathVariable Long id) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getAddress(),
                "Active session"
        );
    }
}
