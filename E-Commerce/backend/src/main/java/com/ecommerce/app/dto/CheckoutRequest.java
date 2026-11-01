package com.ecommerce.app.dto;

import com.ecommerce.app.model.OrderItem;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CheckoutRequest {
    private String userId;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Email is required")
    private String customerEmail;

    @NotBlank(message = "Phone number is required")
    private String customerPhone;

    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;

    private String city;
    private String state;
    private String zipCode;
    private String country;

    private String paymentMethod; // e.g. "Credit Card", "UPI", "Net Banking", "Cash on Delivery"

    private List<OrderItem> items;
    private BigDecimal subtotal;
    private BigDecimal discountAmount;
    private BigDecimal shippingFee;
    private BigDecimal totalAmount;
}
