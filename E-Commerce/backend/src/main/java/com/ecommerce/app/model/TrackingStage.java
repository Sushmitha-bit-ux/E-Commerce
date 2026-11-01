package com.ecommerce.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrackingStage {
    private String name;        // e.g. "Order Placed", "Order Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"
    private String description; // Description of stage
    private boolean completed;  // True if stage reached
    private String timestamp;   // formatted time string or iso
}
