package com.ecommerce.app.controller;

import com.ecommerce.app.model.Product;
import com.ecommerce.app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Boolean bestSeller) {

        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(productService.searchProducts(search));
        }
        if (category != null && !category.equalsIgnoreCase("All")) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }
        if (Boolean.TRUE.equals(featured)) {
            return ResponseEntity.ok(productService.getFeaturedProducts());
        }
        if (Boolean.TRUE.equals(bestSeller)) {
            return ResponseEntity.ok(productService.getBestSellers());
        }

        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<Product> addReview(@PathVariable String id, @RequestBody Product.ProductReview review) {
        try {
            return ResponseEntity.ok(productService.addReview(id, review));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
