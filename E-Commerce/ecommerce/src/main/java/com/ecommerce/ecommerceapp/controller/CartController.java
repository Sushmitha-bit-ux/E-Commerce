package com.ecommerce.ecommerceapp.controller;

import com.ecommerce.ecommerceapp.entity.CartItem;
import com.ecommerce.ecommerceapp.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService service;
    public CartController(CartService service) { this.service = service; }

    public record CartRequest(Long productId, int quantity) {}

    @GetMapping("/{customerId}") public List<CartItem> get(@PathVariable Long customerId) { return service.getCart(customerId); }
    @PostMapping("/{customerId}") @ResponseStatus(HttpStatus.CREATED)
    public CartItem add(@PathVariable Long customerId, @RequestBody CartRequest request) {
        return service.add(customerId, request.productId(), request.quantity());
    }
    @DeleteMapping("/items/{itemId}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long itemId) { service.remove(itemId); }
    @DeleteMapping("/{customerId}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clear(@PathVariable Long customerId) { service.clear(customerId); }
}
