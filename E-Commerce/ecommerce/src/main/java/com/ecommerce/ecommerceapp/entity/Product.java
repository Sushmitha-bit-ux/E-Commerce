package com.ecommerce.ecommerceapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Column(length = 2000)
    private String description;

    @NotNull
    @PositiveOrZero
    private BigDecimal price;

    @Min(0)
    private int stock;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    private boolean active = true;
}
