package com.ecommerce.ecommerceapp.controller;

import com.ecommerce.ecommerceapp.entity.Users;
import com.ecommerce.ecommerceapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service) { this.service = service; }

    @GetMapping
    public List<Users> all() { return service.getAll(); }

    @GetMapping("/{id}")
    public Users one(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Users create(@Valid @RequestBody Users user) { return service.create(user); }

    @PutMapping("/{id}")
    public Users update(@PathVariable Long id, @Valid @RequestBody Users user) { return service.update(id, user); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
