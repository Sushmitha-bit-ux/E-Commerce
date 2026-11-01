package com.ecommerce.ecommerceapp.controller;

import com.ecommerce.ecommerceapp.entity.Category;
import com.ecommerce.ecommerceapp.entity.Product;
import com.ecommerce.ecommerceapp.exception.ResourceNotFoundException;
import com.ecommerce.ecommerceapp.repository.CategoryRepository;
import com.ecommerce.ecommerceapp.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CatalogController {
    private final ProductRepository products;
    private final CategoryRepository categories;

    public CatalogController(ProductRepository products, CategoryRepository categories) {
        this.products = products; this.categories = categories;
    }

    @GetMapping("/categories") public List<Category> categories() { return categories.findAll(); }
    @PostMapping("/categories") @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@Valid @RequestBody Category category) { return categories.save(category); }

    @GetMapping("/products") public List<Product> products() { return products.findByActiveTrue(); }
    @GetMapping("/products/{id}") public Product product(@PathVariable Long id) {
        return products.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }
    @GetMapping("/categories/{id}/products") public List<Product> categoryProducts(@PathVariable Long id) {
        return products.findByCategoryIdAndActiveTrue(id);
    }
    @PostMapping("/products") @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@Valid @RequestBody Product product) { return products.save(product); }
    @PutMapping("/products/{id}") public Product updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        if (!products.existsById(id)) throw new ResourceNotFoundException("Product not found");
        product.setId(id);
        return products.save(product);
    }
    @DeleteMapping("/products/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) { products.deleteById(id); }
}
