package com.ecommerce.ecommerceapp.service;

import com.ecommerce.ecommerceapp.entity.*;
import com.ecommerce.ecommerceapp.exception.ResourceNotFoundException;
import com.ecommerce.ecommerceapp.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orders;
    private final CartItemRepository cart;
    private final UserRepository users;
    private final ProductRepository products;

    public OrderService(OrderRepository orders, CartItemRepository cart, UserRepository users, ProductRepository products) {
        this.orders = orders; this.cart = cart; this.users = users; this.products = products;
    }

    public List<OrderEntity> forCustomer(Long customerId) { return orders.findByCustomerIdOrderByCreatedAtDesc(customerId); }

    @Transactional
    public OrderEntity checkout(Long customerId, String shippingAddress) {
        Users customer = users.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<CartItem> cartItems = cart.findByCustomerId(customerId);
        if (cartItems.isEmpty()) throw new IllegalArgumentException("Cart is empty");

        OrderEntity order = new OrderEntity();
        order.setCustomer(customer);
        order.setShippingAddress(shippingAddress);
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cartItems) {
            Product product = products.findById(cartItem.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            if (product.getStock() < cartItem.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for " + product.getName());
            }
            product.setStock(product.getStock() - cartItem.getQuantity());
            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(product.getPrice());
            order.addItem(item);
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }
        order.setTotal(total);
        OrderEntity saved = orders.save(order);
        cart.deleteByCustomerId(customerId);
        return saved;
    }

    @Transactional
    public OrderEntity updateStatus(Long id, String status) {
        OrderEntity order = orders.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(status.toUpperCase());
        return orders.save(order);
    }
}
