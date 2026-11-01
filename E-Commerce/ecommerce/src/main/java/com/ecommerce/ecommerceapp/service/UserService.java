package com.ecommerce.ecommerceapp.service;

import com.ecommerce.ecommerceapp.entity.Users;
import com.ecommerce.ecommerceapp.exception.ResourceNotFoundException;
import com.ecommerce.ecommerceapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) { this.repository = repository; }

    public List<Users> getAll() { return repository.findAll(); }

    public Users getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }

    public Users create(Users user) {
        if (repository.findByEmail(user.getEmail()).isPresent()) throw new IllegalArgumentException("Email already registered");
        return repository.save(user);
    }

    public Users update(Long id, Users updated) {
        Users user = getById(id);
        user.setName(updated.getName());
        user.setEmail(updated.getEmail());
        return repository.save(user);
    }

    public void delete(Long id) { repository.deleteById(getById(id).getId()); }
}
