package com.ecommerce.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {
    @Id
    private String id;

    private String name;

    private String slug;

    private String description;

    private BigDecimal price;

    private BigDecimal originalPrice;

    private int discountPercent;

    private String category; // e.g. "Electronics", "Fashion", "Home & Living", "Beauty", "Sports"

    private int stock;

    private double rating;

    private int reviewsCount;

    private String mainImage;

    @Builder.Default
    private List<String> images = new ArrayList<>();

    @Builder.Default
    private List<String> features = new ArrayList<>();

    private boolean isFeatured;

    private boolean isBestSeller;

    private boolean isNewArrival;

    @Builder.Default
    private List<ProductReview> reviews = new ArrayList<>();

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductReview {
        private String id;
        private String userName;
        private int rating;
        private String comment;
        private String date;
    }
}
