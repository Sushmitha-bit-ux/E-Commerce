package com.ecommerce.app.service;

import com.ecommerce.app.dto.CheckoutRequest;
import com.ecommerce.app.model.Order;
import com.ecommerce.app.model.Product;
import com.ecommerce.app.model.TrackingStage;
import com.ecommerce.app.repository.OrderRepository;
import com.ecommerce.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy, hh:mm a");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy");

    public Order createOrder(CheckoutRequest request) {
        String orderId = "ORD-" + (100000 + new Random().nextInt(900000));
        LocalDateTime now = LocalDateTime.now();
        String expectedDate = now.plusDays(4).format(DATE_FORMATTER);

        List<TrackingStage> timeline = buildInitialTimeline(now);

        // Deduct inventory stock if products exist
        if (request.getItems() != null) {
            request.getItems().forEach(item -> {
                productRepository.findById(item.getProductId()).ifPresent(product -> {
                    int remaining = Math.max(0, product.getStock() - item.getQuantity());
                    product.setStock(remaining);
                    productRepository.save(product);
                });
            });
        }

        Order order = Order.builder()
                .id(orderId)
                .userId(request.getUserId())
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .shippingAddress(request.getShippingAddress())
                .city(request.getCity())
                .state(request.getState())
                .zipCode(request.getZipCode())
                .country(request.getCountry())
                .items(request.getItems() != null ? request.getItems() : new ArrayList<>())
                .subtotal(request.getSubtotal())
                .discountAmount(request.getDiscountAmount())
                .shippingFee(request.getShippingFee())
                .totalAmount(request.getTotalAmount())
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "Credit Card")
                .paymentStatus("PAID")
                .orderStatus("Order Confirmed")
                .trackingTimeline(timeline)
                .orderDate(now)
                .expectedDeliveryDate(expectedDate)
                .canCancel(true)
                .build();

        Order saved = orderRepository.save(order);

        // Clear user cart if userId provided
        if (request.getUserId() != null && !request.getUserId().isBlank()) {
            try {
                cartService.clearCart(request.getUserId());
            } catch (Exception ignored) {
            }
        }

        return saved;
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
    }

    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }

    public Order updateOrderStatus(String orderId, String newStatus) {
        Order order = getOrderById(orderId);
        order.setOrderStatus(newStatus);

        updateTimelineStages(order.getTrackingTimeline(), newStatus);

        if ("Delivered".equalsIgnoreCase(newStatus) || "Cancelled".equalsIgnoreCase(newStatus)) {
            order.setCanCancel(false);
        }

        return orderRepository.save(order);
    }

    public Order cancelOrder(String orderId) {
        Order order = getOrderById(orderId);
        if (!order.isCanCancel()) {
            throw new RuntimeException("This order cannot be cancelled as it has already progressed past confirmation.");
        }
        order.setOrderStatus("Cancelled");
        order.setCanCancel(false);
        return orderRepository.save(order);
    }

    private List<TrackingStage> buildInitialTimeline(LocalDateTime now) {
        List<TrackingStage> stages = new ArrayList<>();
        stages.add(new TrackingStage("Order Placed", "Your order has been successfully placed.", true, now.format(FORMATTER)));
        stages.add(new TrackingStage("Order Confirmed", "Seller has verified and confirmed your order details.", true, now.plusMinutes(12).format(FORMATTER)));
        stages.add(new TrackingStage("Packed", "Item is packaged and ready for dispatch.", false, "Expected soon"));
        stages.add(new TrackingStage("Shipped", "Handed over to carrier partner.", false, "Pending"));
        stages.add(new TrackingStage("Out for Delivery", "Courier executive is out for delivery in your city.", false, "Pending"));
        stages.add(new TrackingStage("Delivered", "Delivered to your doorstep.", false, "Pending"));
        return stages;
    }

    private void updateTimelineStages(List<TrackingStage> stages, String currentStatus) {
        String nowStr = LocalDateTime.now().format(FORMATTER);
        int targetIndex = switch (currentStatus.toLowerCase()) {
            case "order placed" -> 0;
            case "order confirmed" -> 1;
            case "packed" -> 2;
            case "shipped" -> 3;
            case "out for delivery" -> 4;
            case "delivered" -> 5;
            default -> -1;
        };

        if (targetIndex >= 0) {
            for (int i = 0; i <= targetIndex && i < stages.size(); i++) {
                stages.get(i).setCompleted(true);
                if ("Pending".equals(stages.get(i).getTimestamp()) || "Expected soon".equals(stages.get(i).getTimestamp())) {
                    stages.get(i).setTimestamp(nowStr);
                }
            }
        }
    }
}
