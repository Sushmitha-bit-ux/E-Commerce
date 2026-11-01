package com.ecommerce.ecommerceapp.controller;

import com.ecommerce.ecommerceapp.entity.OrderEntity;
import com.ecommerce.ecommerceapp.repository.OrderRepository;
import com.ecommerce.ecommerceapp.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService service;
    private final OrderRepository repository;
    public OrderController(OrderService service, OrderRepository repository) { this.service = service; this.repository = repository; }

    public record CheckoutRequest(Long customerId, String shippingAddress) {}

    @GetMapping public List<OrderEntity> all() { return repository.findAll(); }
    @GetMapping("/customer/{customerId}") public List<OrderEntity> customerOrders(@PathVariable Long customerId) { return service.forCustomer(customerId); }
    @PostMapping("/checkout") @ResponseStatus(HttpStatus.CREATED)
    public OrderEntity checkout(@RequestBody CheckoutRequest request) { return service.checkout(request.customerId(), request.shippingAddress()); }
    @PatchMapping("/{id}/status") public OrderEntity status(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return service.updateStatus(id, body.get("status"));
    }
}
