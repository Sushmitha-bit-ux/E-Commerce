package com.ecommerce.ecommerceapp.service;

import com.ecommerce.ecommerceapp.entity.CartItem;
import com.ecommerce.ecommerceapp.exception.ResourceNotFoundException;
import com.ecommerce.ecommerceapp.repository.CartItemRepository;
import com.ecommerce.ecommerceapp.repository.ProductRepository;
import com.ecommerce.ecommerceapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    private final CartItemRepository cart;
    private final UserRepository users;
    private final ProductRepository products;

    public CartService(CartItemRepository cart, UserRepository users, ProductRepository products) {
        this.cart = cart; this.users = users; this.products = products;
    }

    public List<CartItem> getCart(Long customerId) { return cart.findByCustomerId(customerId); }

    @Transactional
    public CartItem add(Long customerId, Long productId, int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("Quantity must be positive");
        CartItem item = cart.findByCustomerIdAndProductId(customerId, productId).orElseGet(CartItem::new);
        var customer = users.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var product = products.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        int newQuantity = item.getQuantity() + quantity;
        if (product.getStock() < newQuantity) throw new IllegalArgumentException("Insufficient stock");
        item.setCustomer(customer); item.setProduct(product); item.setQuantity(newQuantity);
        return cart.save(item);
    }

    public void remove(Long id) { cart.deleteById(id); }

    @Transactional
    public void clear(Long customerId) { cart.deleteByCustomerId(customerId); }
}
