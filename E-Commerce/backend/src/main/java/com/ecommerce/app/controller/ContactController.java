package com.ecommerce.app.controller;

import com.ecommerce.app.model.ContactMessage;
import com.ecommerce.app.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage message) {
        try {
            ContactMessage saved = contactService.saveMessage(message);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Thank you for reaching out! Your message has been received.",
                    "data", saved
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
