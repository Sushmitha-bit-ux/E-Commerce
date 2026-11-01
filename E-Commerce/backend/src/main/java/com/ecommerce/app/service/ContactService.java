package com.ecommerce.app.service;

import com.ecommerce.app.model.ContactMessage;
import com.ecommerce.app.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;

    public ContactMessage saveMessage(ContactMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        return contactRepository.save(message);
    }
}
