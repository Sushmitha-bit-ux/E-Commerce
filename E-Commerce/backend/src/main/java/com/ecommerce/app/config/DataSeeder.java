package com.ecommerce.app.config;

import com.ecommerce.app.model.*;
import com.ecommerce.app.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @Override
    public void run(String... args) {
        log.info("Checking database seeding status...");

        // 1. Seed Users
        User demoCustomer = userRepository.findByEmail("demo@example.com").orElseGet(() ->
                userRepository.save(User.builder()
                        .name("Sophia Davis")
                        .email("demo@example.com")
                        .password("demo123")
                        .role("CUSTOMER")
                        .phone("+1 (555) 234-5678")
                        .address("742 Evergreen Terrace, Springfield, OR 97477")
                        .createdAt(LocalDateTime.now().minusDays(30))
                        .build())
        );

        User adminUser = userRepository.findByEmail("admin@example.com").orElseGet(() ->
                userRepository.save(User.builder()
                        .name("Alex Stone (Admin)")
                        .email("admin@example.com")
                        .password("admin123")
                        .role("ADMIN")
                        .phone("+1 (555) 888-0199")
                        .address("100 Tech Hub Blvd, San Francisco, CA 94107")
                        .createdAt(LocalDateTime.now().minusDays(60))
                        .build())
        );

        // 2. Seed Categories
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                    Category.builder().name("Electronics").slug("electronics").description("Next-gen gadgets, audio, and personal wearables").icon("Laptop").image("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80").productCount(8).build(),
                    Category.builder().name("Fashion").slug("fashion").description("Curated contemporary apparel and daily essentials").icon("Shirt").image("https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80").productCount(6).build(),
                    Category.builder().name("Home & Living").slug("home-living").description("Minimalist lighting, artisanal ceramics and decor").icon("Home").image("https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80").productCount(6).build(),
                    Category.builder().name("Beauty").slug("beauty").description("Organic skincare, luxury fragrances and wellness").icon("Sparkles").image("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80").productCount(4).build(),
                    Category.builder().name("Footwear").slug("footwear").description("Engineered comfort sneakers and timeless leather shoes").icon("Footprints").image("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80").productCount(5).build()
            );
            categoryRepository.saveAll(categories);
            log.info("Seeded categories");
        }

        // 3. Seed Products
        if (productRepository.count() == 0) {
            List<Product> products = createSeedProducts();
            productRepository.saveAll(products);
            log.info("Seeded {} products", products.size());
        }

        // 4. Seed Initial Orders for demo customer
        if (orderRepository.count() == 0) {
            seedSampleOrders(demoCustomer.getId());
            log.info("Seeded sample orders for demo user");
        }
    }

    private List<Product> createSeedProducts() {
        List<Product> list = new ArrayList<>();

        list.add(Product.builder()
                .id("prod-1")
                .name("Aura Pro Wireless Noise-Cancelling Headphones")
                .slug("aura-pro-wireless-headphones")
                .description("Crafted with custom 40mm beryllium drivers, active spatial audio, and an ultra-plush memory foam headband. Delivers up to 45 hours of immersive playtime on a single fast charge.")
                .price(new BigDecimal("249.99"))
                .originalPrice(new BigDecimal("329.99"))
                .discountPercent(24)
                .category("Electronics")
                .stock(34)
                .rating(4.9)
                .reviewsCount(128)
                .mainImage("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
                        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
                ))
                .features(Arrays.asList("Hybrid Active Noise Cancellation (ANC)", "45-Hour Battery with USB-C Quick Charge", "Lossless Bluetooth 5.3 Audio", "Multipoint connection with 2 devices"))
                .isFeatured(true)
                .isBestSeller(true)
                .isNewArrival(false)
                .reviews(Arrays.asList(
                        new Product.ProductReview("rev-1", "Marcus Chen", 5, "Unbelievable soundstage and noise cancelling. Best headphones I have owned.", "Oct 24, 2026"),
                        new Product.ProductReview("rev-2", "Emma Watson", 5, "The battery easily lasts all week for my daily commute. Super comfy.", "Oct 18, 2026")
                ))
                .build());

        list.add(Product.builder()
                .id("prod-2")
                .name("Apex Ultra GPS Smartwatch & Fitness Tracker")
                .slug("apex-ultra-gps-smartwatch")
                .description("Titanium case with sapphire crystal glass. Features dual-frequency GPS, 24/7 cardiac rhythm monitoring, sleep stages, and water resistance up to 50 meters.")
                .price(new BigDecimal("299.00"))
                .originalPrice(new BigDecimal("379.00"))
                .discountPercent(21)
                .category("Electronics")
                .stock(18)
                .rating(4.8)
                .reviewsCount(94)
                .mainImage("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
                        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
                ))
                .features(Arrays.asList("Dual-frequency GNSS tracking", "AMOLED Always-On Display", "14-day battery life", "Comprehensive heart & oxygen monitor"))
                .isFeatured(true)
                .isBestSeller(true)
                .isNewArrival(true)
                .reviews(Arrays.asList(
                        new Product.ProductReview("rev-3", "David Kim", 5, "Accuracy on runs is spot on. Very sleek build.", "Oct 22, 2026")
                ))
                .build());

        list.add(Product.builder()
                .id("prod-3")
                .name("Velocity Speed Pro Running Sneakers")
                .slug("velocity-speed-pro-sneakers")
                .description("Engineered responsive carbon-composite plate with ultralight rebound foam. Designed to deliver superior energy return and cushioning over long marathon distances.")
                .price(new BigDecimal("139.99"))
                .originalPrice(new BigDecimal("179.99"))
                .discountPercent(22)
                .category("Footwear")
                .stock(42)
                .rating(4.7)
                .reviewsCount(83)
                .mainImage("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
                        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
                ))
                .features(Arrays.asList("Carbon-infused propulsion plate", "Breathable matrix mesh upper", "Vibram high-grip rubber outsole"))
                .isFeatured(true)
                .isBestSeller(true)
                .isNewArrival(false)
                .build());

        list.add(Product.builder()
                .id("prod-4")
                .name("Voyager Minimalist Weatherproof Commuter Backpack")
                .slug("voyager-weatherproof-backpack")
                .description("Constructed from 840D recycled ballistic nylon with water-resistant YKK zippers. Includes a dedicated padded 16-inch laptop compartment and hidden passport pocket.")
                .price(new BigDecimal("89.50"))
                .originalPrice(new BigDecimal("119.00"))
                .discountPercent(25)
                .category("Fashion")
                .stock(27)
                .rating(4.9)
                .reviewsCount(112)
                .mainImage("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
                ))
                .features(Arrays.asList("Padded 16\" laptop sleeve", "Waterproof ballistic nylon", "Luggage pass-through strap"))
                .isFeatured(true)
                .isBestSeller(false)
                .isNewArrival(true)
                .build());

        list.add(Product.builder()
                .id("prod-5")
                .name("Lumina Architectural LED Desk & Studio Lamp")
                .slug("lumina-architectural-led-lamp")
                .description("Precision CNC-machined aluminum arm with stepless touch dimming and customizable color temperatures from 2700K warm to 6500K daylight. Anti-glare optical diffuser.")
                .price(new BigDecimal("74.99"))
                .originalPrice(new BigDecimal("99.99"))
                .discountPercent(25)
                .category("Home & Living")
                .stock(50)
                .rating(4.6)
                .reviewsCount(64)
                .mainImage("https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
                ))
                .features(Arrays.asList("95+ High CRI natural light", "Stepless touch dimming bar", "USB-C charging pass-through base"))
                .isFeatured(false)
                .isBestSeller(true)
                .isNewArrival(false)
                .build());

        list.add(Product.builder()
                .id("prod-6")
                .name("Kyoto Handcrafted Stoneware Ceramic Mug Collection")
                .slug("kyoto-handcrafted-ceramic-mugs")
                .description("Handmade by artisan potters with speckled earth glaze and raw clay bases. Set of four 350ml mugs safe for microwave, dishwasher, and oven.")
                .price(new BigDecimal("42.00"))
                .originalPrice(new BigDecimal("55.00"))
                .discountPercent(24)
                .category("Home & Living")
                .stock(30)
                .rating(4.9)
                .reviewsCount(78)
                .mainImage("https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80"
                ))
                .features(Arrays.asList("Handmade artisan pottery", "Dishwasher & microwave safe", "Gift box packaged"))
                .isFeatured(false)
                .isBestSeller(false)
                .isNewArrival(true)
                .build());

        list.add(Product.builder()
                .id("prod-7")
                .name("Botanical Rejuvenating Squalane Facial Serum")
                .slug("botanical-squalane-facial-serum")
                .description("100% plant-derived squalane infused with cold-pressed rosehip oil and antioxidant Vitamin C. Instantly hydrates, softens fine lines, and restores skin barrier radiant glow.")
                .price(new BigDecimal("48.00"))
                .originalPrice(new BigDecimal("60.00"))
                .discountPercent(20)
                .category("Beauty")
                .stock(65)
                .rating(4.8)
                .reviewsCount(142)
                .mainImage("https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
                ))
                .features(Arrays.asList("100% Organic & Cruelty-Free", "Fast-absorbing, non-greasy finish", "Dermatologist tested"))
                .isFeatured(true)
                .isBestSeller(true)
                .isNewArrival(false)
                .build());

        list.add(Product.builder()
                .id("prod-8")
                .name("Merino Wool Oversized Knit Sweater")
                .slug("merino-wool-knit-sweater")
                .description("Spun from superfine Australian extra-fine merino wool. Incredibly soft against the skin, naturally temperature regulating, and pill-resistant for years of cozy wear.")
                .price(new BigDecimal("119.00"))
                .originalPrice(new BigDecimal("159.00"))
                .discountPercent(25)
                .category("Fashion")
                .stock(22)
                .rating(4.7)
                .reviewsCount(53)
                .mainImage("https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80")
                .images(Arrays.asList(
                        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
                ))
                .features(Arrays.asList("100% Extra-fine Merino Wool", "Ribbed collar, cuffs, and hem", "Naturally odor resistant"))
                .isFeatured(false)
                .isBestSeller(false)
                .isNewArrival(true)
                .build());

        return list;
    }

    private void seedSampleOrders(String customerId) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MMM dd, yyyy, hh:mm a");
        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        LocalDateTime now = LocalDateTime.now();

        // Order 1: Currently "Shipped" (In-transit)
        List<TrackingStage> timeline1 = new ArrayList<>();
        timeline1.add(new TrackingStage("Order Placed", "Your order has been placed successfully.", true, now.minusDays(2).format(fmt)));
        timeline1.add(new TrackingStage("Order Confirmed", "Payment verified and order accepted.", true, now.minusDays(2).plusMinutes(20).format(fmt)));
        timeline1.add(new TrackingStage("Packed", "Items inspected and sealed in packaging.", true, now.minusDays(1).format(fmt)));
        timeline1.add(new TrackingStage("Shipped", "Package handed over to FedEx Express Carrier.", true, now.minusHours(8).format(fmt)));
        timeline1.add(new TrackingStage("Out for Delivery", "Courier driver will deliver by end of day.", false, "Expected " + now.plusDays(1).format(dateFmt)));
        timeline1.add(new TrackingStage("Delivered", "Delivered directly to customer.", false, "Pending"));

        Order order1 = Order.builder()
                .id("ORD-892415")
                .userId(customerId)
                .customerName("Sophia Davis")
                .customerEmail("demo@example.com")
                .customerPhone("+1 (555) 234-5678")
                .shippingAddress("742 Evergreen Terrace")
                .city("Springfield")
                .state("OR")
                .zipCode("97477")
                .country("United States")
                .items(Arrays.asList(
                        OrderItem.builder().productId("prod-1").productName("Aura Pro Wireless Headphones").productImage("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80").price(new BigDecimal("249.99")).quantity(1).build(),
                        OrderItem.builder().productId("prod-6").productName("Kyoto Handcrafted Stoneware Ceramic Mug Collection").productImage("https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80").price(new BigDecimal("42.00")).quantity(1).build()
                ))
                .subtotal(new BigDecimal("291.99"))
                .discountAmount(new BigDecimal("29.20"))
                .shippingFee(BigDecimal.ZERO)
                .totalAmount(new BigDecimal("262.79"))
                .paymentMethod("Credit Card")
                .paymentStatus("PAID")
                .orderStatus("Shipped")
                .trackingTimeline(timeline1)
                .orderDate(now.minusDays(2))
                .expectedDeliveryDate(now.plusDays(2).format(dateFmt))
                .canCancel(false)
                .build();

        // Order 2: "Order Confirmed" (Recent, cancellable)
        List<TrackingStage> timeline2 = new ArrayList<>();
        timeline2.add(new TrackingStage("Order Placed", "Your order has been placed successfully.", true, now.minusHours(3).format(fmt)));
        timeline2.add(new TrackingStage("Order Confirmed", "Payment verified and order accepted.", true, now.minusHours(2).format(fmt)));
        timeline2.add(new TrackingStage("Packed", "Items inspected and sealed in packaging.", false, "Expected within 12h"));
        timeline2.add(new TrackingStage("Shipped", "Package handed over to courier.", false, "Pending"));
        timeline2.add(new TrackingStage("Out for Delivery", "Courier driver out for delivery.", false, "Pending"));
        timeline2.add(new TrackingStage("Delivered", "Delivered to customer.", false, "Pending"));

        Order order2 = Order.builder()
                .id("ORD-941820")
                .userId(customerId)
                .customerName("Sophia Davis")
                .customerEmail("demo@example.com")
                .customerPhone("+1 (555) 234-5678")
                .shippingAddress("742 Evergreen Terrace")
                .city("Springfield")
                .state("OR")
                .zipCode("97477")
                .country("United States")
                .items(Arrays.asList(
                        OrderItem.builder().productId("prod-2").productName("Apex Ultra GPS Smartwatch").productImage("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80").price(new BigDecimal("299.00")).quantity(1).build()
                ))
                .subtotal(new BigDecimal("299.00"))
                .discountAmount(BigDecimal.ZERO)
                .shippingFee(BigDecimal.ZERO)
                .totalAmount(new BigDecimal("299.00"))
                .paymentMethod("UPI")
                .paymentStatus("PAID")
                .orderStatus("Order Confirmed")
                .trackingTimeline(timeline2)
                .orderDate(now.minusHours(3))
                .expectedDeliveryDate(now.plusDays(4).format(dateFmt))
                .canCancel(true)
                .build();

        // Order 3: "Delivered" (Past order)
        List<TrackingStage> timeline3 = new ArrayList<>();
        timeline3.add(new TrackingStage("Order Placed", "Your order has been placed.", true, now.minusDays(14).format(fmt)));
        timeline3.add(new TrackingStage("Order Confirmed", "Payment verified.", true, now.minusDays(14).plusMinutes(10).format(fmt)));
        timeline3.add(new TrackingStage("Packed", "Items inspected and packed.", true, now.minusDays(13).format(fmt)));
        timeline3.add(new TrackingStage("Shipped", "Dispatched with tracking #TRK-981023", true, now.minusDays(12).format(fmt)));
        timeline3.add(new TrackingStage("Out for Delivery", "Courier driver is delivering your order.", true, now.minusDays(11).format(fmt)));
        timeline3.add(new TrackingStage("Delivered", "Package handed over directly to recipient.", true, now.minusDays(11).plusHours(4).format(fmt)));

        Order order3 = Order.builder()
                .id("ORD-719302")
                .userId(customerId)
                .customerName("Sophia Davis")
                .customerEmail("demo@example.com")
                .customerPhone("+1 (555) 234-5678")
                .shippingAddress("742 Evergreen Terrace")
                .city("Springfield")
                .state("OR")
                .zipCode("97477")
                .country("United States")
                .items(Arrays.asList(
                        OrderItem.builder().productId("prod-3").productName("Velocity Speed Pro Running Sneakers").productImage("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80").price(new BigDecimal("139.99")).quantity(1).build()
                ))
                .subtotal(new BigDecimal("139.99"))
                .discountAmount(new BigDecimal("14.00"))
                .shippingFee(BigDecimal.ZERO)
                .totalAmount(new BigDecimal("125.99"))
                .paymentMethod("Credit Card")
                .paymentStatus("PAID")
                .orderStatus("Delivered")
                .trackingTimeline(timeline3)
                .orderDate(now.minusDays(14))
                .expectedDeliveryDate(now.minusDays(11).format(dateFmt))
                .canCancel(false)
                .build();

        orderRepository.saveAll(Arrays.asList(order1, order2, order3));
    }
}
