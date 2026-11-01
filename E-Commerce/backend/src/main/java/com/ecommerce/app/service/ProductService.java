package com.ecommerce.app.service;

import com.ecommerce.app.model.Category;
import com.ecommerce.app.model.Product;
import com.ecommerce.app.repository.CategoryRepository;
import com.ecommerce.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue();
    }

    public List<Product> getBestSellers() {
        return productRepository.findByIsBestSellerTrue();
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Product addReview(String productId, Product.ProductReview review) {
        Product product = getProductById(productId);
        if (review.getId() == null) {
            review.setId(UUID.randomUUID().toString());
        }
        product.getReviews().add(0, review);
        product.setReviewsCount(product.getReviews().size());

        // Recalculate average rating
        double avg = product.getReviews().stream()
                .mapToInt(Product.ProductReview::getRating)
                .average()
                .orElse(product.getRating());
        product.setRating(Math.round(avg * 10.0) / 10.0);

        return productRepository.save(product);
    }
}
