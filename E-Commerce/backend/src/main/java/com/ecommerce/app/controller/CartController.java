package com.ecommerce.app.controller;

import com.ecommerce.app.model.Cart;
import com.ecommerce.app.service.CartService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<Cart> addToCart(
            @PathVariable String userId,
            @RequestBody AddCartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(userId, request.getProductId(), request.getQuantity()));
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<Cart> updateItemQuantity(
            @PathVariable String userId,
            @RequestBody UpdateCartRequest request) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(userId, request.getProductId(), request.getQuantity()));
    }

    @DeleteMapping("/{userId}/items/{productId}")
    public ResponseEntity<Cart> removeItem(
            @PathVariable String userId,
            @PathVariable String productId) {
        return ResponseEntity.ok(cartService.removeFromCart(userId, productId));
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }

    @Data
    public static class AddCartRequest {
        private String productId;
        private int quantity = 1;
    }

    @Data
    public static class UpdateCartRequest {
        private String productId;
        private int quantity;
    }
}
