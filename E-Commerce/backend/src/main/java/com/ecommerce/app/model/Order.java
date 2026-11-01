package com.ecommerce.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    @Id
    private String id; // e.g. "ORD-849201"

    @Indexed
    private String userId;

    private String customerName;
    private String customerEmail;
    private String customerPhone;

    private String shippingAddress;
    private String city;
    private String state;
    private String zipCode;
    private String country;

    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    private BigDecimal subtotal;
    private BigDecimal discountAmount;
    private BigDecimal shippingFee;
    private BigDecimal totalAmount;

    private String paymentMethod; // "Credit Card", "UPI", "Net Banking", "Cash on Delivery"
    private String paymentStatus; // "PAID", "PENDING", "REFUNDED"

    private String orderStatus;   // "Order Placed", "Order Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"

    @Builder.Default
    private List<TrackingStage> trackingTimeline = new ArrayList<>();

    @Builder.Default
    private LocalDateTime orderDate = LocalDateTime.now();

    private String expectedDeliveryDate;

    private boolean canCancel;
}
