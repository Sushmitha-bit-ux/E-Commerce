package com.ecommerce.ecommerceapp.config;

import com.ecommerce.ecommerceapp.entity.Category;
import com.ecommerce.ecommerceapp.entity.Product;
import com.ecommerce.ecommerceapp.entity.Users;
import com.ecommerce.ecommerceapp.repository.CategoryRepository;
import com.ecommerce.ecommerceapp.repository.ProductRepository;
import com.ecommerce.ecommerceapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seed(UserRepository users, CategoryRepository categories, ProductRepository products) {
        return args -> {
            // Seed demo customer if not present
            if (users.findByEmail("demo@example.com").isEmpty()) {
                Users demo = new Users();
                demo.setName("Demo Customer");
                demo.setEmail("demo@example.com");
                demo.setPassword("demo123");
                demo.setRole("CUSTOMER");
                demo.setAddress("123 Tech Avenue, Silicon Hills");
                demo.setPhone("+1 555-0199");
                users.save(demo);
            }

            // Seed admin user if not present
            if (users.findByEmail("admin@example.com").isEmpty()) {
                Users admin = new Users();
                admin.setName("Store Admin");
                admin.setEmail("admin@example.com");
                admin.setPassword("admin123");
                admin.setRole("ADMIN");
                admin.setAddress("1 NOVA HQ Tower, Suite 500");
                admin.setPhone("+1 555-0100");
                users.save(admin);
            }

            if (products.count() != 0) return;

            Category electronics = category(categories, "Electronics", "Devices and accessories");
            Category fashion = category(categories, "Fashion", "Clothing and accessories");
            Category home = category(categories, "Home & Living", "Everyday essentials for your home");

            product(products, electronics, "Wireless Headphones", "Immersive sound with 30-hour battery life", "149.99", 25, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600");
            product(products, electronics, "Smart Watch", "Fitness tracking and smart notifications", "199.99", 18, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600");
            product(products, fashion, "Classic Sneakers", "Comfortable everyday sneakers", "89.99", 40, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600");
            product(products, fashion, "Minimal Backpack", "A lightweight 18L everyday backpack", "59.99", 30, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600");
            product(products, home, "Desk Lamp", "Modern adjustable LED desk lamp", "39.99", 50, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600");
            product(products, home, "Ceramic Mug Set", "Hand-finished set of four mugs", "29.99", 60, "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600");
        };
    }

    private Category category(CategoryRepository repo, String name, String description) {
        Category c = new Category(); c.setName(name); c.setDescription(description); return repo.save(c);
    }

    private void product(ProductRepository repo, Category category, String name, String description, String price, int stock, String image) {
        Product p = new Product(); p.setCategory(category); p.setName(name); p.setDescription(description);
        p.setPrice(new BigDecimal(price)); p.setStock(stock); p.setImageUrl(image); repo.save(p);
    }
}
