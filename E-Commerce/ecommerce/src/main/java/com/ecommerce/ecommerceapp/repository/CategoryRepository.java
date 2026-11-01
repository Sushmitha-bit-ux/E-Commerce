package com.ecommerce.ecommerceapp.repository;
import com.ecommerce.ecommerceapp.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoryRepository extends JpaRepository<Category, Long> {}
