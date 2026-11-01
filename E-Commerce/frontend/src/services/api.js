import axios from 'axios';
import { INITIAL_PRODUCTS, CATEGORIES } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Seed localStorage if not present for fallback
const getLocalProducts = () => {
  const stored = localStorage.getItem('nova_products');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { /* ignore */ }
  }
  localStorage.setItem('nova_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

const getLocalOrders = () => {
  const stored = localStorage.getItem('nova_orders');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { /* ignore */ }
  }
  const defaultOrders = [
    {
      id: "ORD-892415",
      userId: "demo-user",
      customerName: "Sophia Davis",
      customerEmail: "demo@example.com",
      customerPhone: "+1 (555) 234-5678",
      shippingAddress: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      zipCode: "97477",
      country: "United States",
      items: [
        {
          productId: "prod-1",
          productName: "Aura Pro Wireless Noise-Cancelling Headphones",
          productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
          price: 249.99,
          quantity: 1
        },
        {
          productId: "prod-6",
          productName: "Kyoto Handcrafted Stoneware Ceramic Mug Collection",
          productImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
          price: 42.00,
          quantity: 1
        }
      ],
      subtotal: 291.99,
      discountAmount: 29.20,
      shippingFee: 0,
      totalAmount: 262.79,
      paymentMethod: "Credit Card",
      paymentStatus: "PAID",
      orderStatus: "Shipped",
      trackingTimeline: [
        { name: "Order Placed", description: "Your order has been placed successfully.", completed: true, timestamp: "Oct 29, 2026, 10:14 AM" },
        { name: "Order Confirmed", description: "Payment verified and order accepted.", completed: true, timestamp: "Oct 29, 2026, 10:32 AM" },
        { name: "Packed", description: "Items inspected and sealed in protective packaging.", completed: true, timestamp: "Oct 30, 2026, 02:45 PM" },
        { name: "Shipped", description: "Handed over to FedEx Express Carrier (#FX-882910).", completed: true, timestamp: "Nov 01, 2026, 09:15 AM" },
        { name: "Out for Delivery", description: "Courier driver will deliver to your doorstep.", completed: false, timestamp: "Expected Nov 02, 2026" },
        { name: "Delivered", description: "Delivered to your address.", completed: false, timestamp: "Pending" }
      ],
      orderDate: "2026-10-29T10:14:00",
      expectedDeliveryDate: "Nov 02, 2026",
      canCancel: false
    },
    {
      id: "ORD-941820",
      userId: "demo-user",
      customerName: "Sophia Davis",
      customerEmail: "demo@example.com",
      customerPhone: "+1 (555) 234-5678",
      shippingAddress: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      zipCode: "97477",
      country: "United States",
      items: [
        {
          productId: "prod-2",
          productName: "Apex Ultra GPS Smartwatch & Fitness Tracker",
          productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
          price: 299.00,
          quantity: 1
        }
      ],
      subtotal: 299.00,
      discountAmount: 0,
      shippingFee: 0,
      totalAmount: 299.00,
      paymentMethod: "UPI",
      paymentStatus: "PAID",
      orderStatus: "Order Confirmed",
      trackingTimeline: [
        { name: "Order Placed", description: "Your order has been placed successfully.", completed: true, timestamp: "Nov 01, 2026, 03:20 PM" },
        { name: "Order Confirmed", description: "Seller verified and approved the order.", completed: true, timestamp: "Nov 01, 2026, 03:35 PM" },
        { name: "Packed", description: "Items are being packaged in our warehouse.", completed: false, timestamp: "Expected within 12h" },
        { name: "Shipped", description: "Will be dispatched with express tracking.", completed: false, timestamp: "Pending" },
        { name: "Out for Delivery", description: "Courier driver out for delivery.", completed: false, timestamp: "Pending" },
        { name: "Delivered", description: "Delivered to customer.", completed: false, timestamp: "Pending" }
      ],
      orderDate: "2026-11-01T15:20:00",
      expectedDeliveryDate: "Nov 05, 2026",
      canCancel: true
    },
    {
      id: "ORD-719302",
      userId: "demo-user",
      customerName: "Sophia Davis",
      customerEmail: "demo@example.com",
      customerPhone: "+1 (555) 234-5678",
      shippingAddress: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      zipCode: "97477",
      country: "United States",
      items: [
        {
          productId: "prod-3",
          productName: "Velocity Speed Pro Running Sneakers",
          productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
          price: 139.99,
          quantity: 1
        }
      ],
      subtotal: 139.99,
      discountAmount: 14.00,
      shippingFee: 0,
      totalAmount: 125.99,
      paymentMethod: "Credit Card",
      paymentStatus: "PAID",
      orderStatus: "Delivered",
      trackingTimeline: [
        { name: "Order Placed", description: "Order received.", completed: true, timestamp: "Oct 18, 2026, 09:10 AM" },
        { name: "Order Confirmed", description: "Payment verified.", completed: true, timestamp: "Oct 18, 2026, 09:25 AM" },
        { name: "Packed", description: "Package sealed.", completed: true, timestamp: "Oct 19, 2026, 11:00 AM" },
        { name: "Shipped", description: "Shipped via carrier partner.", completed: true, timestamp: "Oct 20, 2026, 08:30 AM" },
        { name: "Out for Delivery", description: "Courier out for delivery.", completed: true, timestamp: "Oct 21, 2026, 01:15 PM" },
        { name: "Delivered", description: "Delivered and signed by recipient.", completed: true, timestamp: "Oct 21, 2026, 03:40 PM" }
      ],
      orderDate: "2026-10-18T09:10:00",
      expectedDeliveryDate: "Oct 21, 2026",
      canCancel: false
    }
  ];
  localStorage.setItem('nova_orders', JSON.stringify(defaultOrders));
  return defaultOrders;
};

export const apiService = {
  // PRODUCTS
  async getProducts(params = {}) {
    try {
      const res = await apiClient.get('/products', { params });
      if (res.data && res.data.length > 0) return res.data;
    } catch (e) {
      // fallback
    }

    let products = getLocalProducts();
    if (params.category && params.category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (params.featured) {
      products = products.filter(p => p.isFeatured);
    }
    if (params.bestSeller) {
      products = products.filter(p => p.isBestSeller);
    }
    return products;
  },

  async getProductById(id) {
    try {
      const res = await apiClient.get(`/products/${id}`);
      if (res.data) return res.data;
    } catch (e) {
      // fallback
    }
    const products = getLocalProducts();
    const p = products.find(x => x.id === id || x.slug === id);
    if (!p) throw new Error("Product not found");
    return p;
  },

  async addProductReview(productId, review) {
    try {
      const res = await apiClient.post(`/products/${productId}/reviews`, review);
      if (res.data) return res.data;
    } catch (e) {
      // fallback
    }
    const products = getLocalProducts();
    const index = products.findIndex(x => x.id === productId);
    if (index !== -1) {
      const prod = { ...products[index] };
      const newReview = {
        id: 'rev-' + Date.now(),
        userName: review.userName || 'Anonymous',
        rating: review.rating || 5,
        comment: review.comment || '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      prod.reviews = [newReview, ...(prod.reviews || [])];
      prod.reviewsCount = prod.reviews.length;
      const sum = prod.reviews.reduce((acc, r) => acc + r.rating, 0);
      prod.rating = parseFloat((sum / prod.reviews.length).toFixed(1));
      products[index] = prod;
      localStorage.setItem('nova_products', JSON.stringify(products));
      return prod;
    }
    throw new Error("Product not found");
  },

  // CATEGORIES
  async getCategories() {
    try {
      const res = await apiClient.get('/categories');
      if (res.data && res.data.length > 0) return res.data;
    } catch (e) {
      // fallback
    }
    return CATEGORIES;
  },

  // AUTH
  async login(email, password) {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data) return res.data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response.data.message);
      }
    }

    // Local fallback for quick demo & registered users
    const registeredUsers = JSON.parse(localStorage.getItem('nova_users') || '[]');
    const existing = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      if (existing.password === password) {
        return {
          token: "jwt-token-local-" + Date.now(),
          id: existing.id,
          name: existing.name,
          email: existing.email,
          role: existing.role || "CUSTOMER",
          phone: existing.phone,
          address: existing.address,
          message: "Login successful"
        };
      } else {
        throw new Error("Invalid password");
      }
    }

    if (email === "demo@example.com" && password === "demo123") {
      return {
        token: "jwt-token-demo-12345",
        id: "demo-user",
        name: "Sophia Davis",
        email: "demo@example.com",
        role: "CUSTOMER",
        phone: "+1 (555) 234-5678",
        address: "742 Evergreen Terrace, Springfield, OR 97477",
        message: "Login successful"
      };
    } else if (email === "admin@example.com" && password === "admin123") {
      return {
        token: "jwt-token-admin-12345",
        id: "admin-user",
        name: "Alex Stone (Admin)",
        email: "admin@example.com",
        role: "ADMIN",
        phone: "+1 (555) 888-0199",
        address: "100 Tech Hub Blvd, San Francisco, CA 94107",
        message: "Admin login successful"
      };
    }

    throw new Error("Invalid email or password");
  },

  async register(userData) {
    try {
      const res = await apiClient.post('/auth/register', userData);
      if (res.data) return res.data;
    } catch (e) {
      if (e.response?.data?.message) {
        throw new Error(e.response.data.message);
      }
    }

    const registeredUsers = JSON.parse(localStorage.getItem('nova_users') || '[]');
    if (registeredUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase()) || userData.email === "demo@example.com") {
      throw new Error("Email is already registered. Please sign in instead.");
    }

    const newUser = {
      id: "user-" + Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "CUSTOMER",
      phone: userData.phone || "+1 (555) 000-0000",
      address: userData.address || "123 Main Street"
    };
    registeredUsers.push(newUser);
    localStorage.setItem('nova_users', JSON.stringify(registeredUsers));

    return {
      token: "jwt-token-reg-" + Date.now(),
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      address: newUser.address,
      message: "Account registered successfully"
    };
  },

  // ORDERS & CHECKOUT
  async checkout(orderPayload) {
    try {
      const res = await apiClient.post('/orders/checkout', orderPayload);
      if (res.data) {
        // also store in local cache
        const orders = getLocalOrders();
        orders.unshift(res.data);
        localStorage.setItem('nova_orders', JSON.stringify(orders));
        return res.data;
      }
    } catch (e) {
      // fallback
    }

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const formattedNow = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ", " + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const expected = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newOrder = {
      id: orderId,
      userId: orderPayload.userId || "guest",
      customerName: orderPayload.customerName,
      customerEmail: orderPayload.customerEmail,
      customerPhone: orderPayload.customerPhone,
      shippingAddress: orderPayload.shippingAddress,
      city: orderPayload.city,
      state: orderPayload.state,
      zipCode: orderPayload.zipCode,
      country: orderPayload.country || "United States",
      items: orderPayload.items || [],
      subtotal: orderPayload.subtotal,
      discountAmount: orderPayload.discountAmount || 0,
      shippingFee: orderPayload.shippingFee || 0,
      totalAmount: orderPayload.totalAmount,
      paymentMethod: orderPayload.paymentMethod || "Credit Card",
      paymentStatus: "PAID",
      orderStatus: "Order Confirmed",
      trackingTimeline: [
        { name: "Order Placed", description: "Your order has been received.", completed: true, timestamp: formattedNow },
        { name: "Order Confirmed", description: "Payment verified & order acknowledged.", completed: true, timestamp: formattedNow },
        { name: "Packed", description: "Being assembled with quality check.", completed: false, timestamp: "Expected within 12h" },
        { name: "Shipped", description: "Will be handed to carrier partner.", completed: false, timestamp: "Pending" },
        { name: "Out for Delivery", description: "Local courier out for delivery.", completed: false, timestamp: "Pending" },
        { name: "Delivered", description: "Delivered to your doorstep.", completed: false, timestamp: "Pending" }
      ],
      orderDate: new Date().toISOString(),
      expectedDeliveryDate: expected,
      canCancel: true
    };

    const orders = getLocalOrders();
    orders.unshift(newOrder);
    localStorage.setItem('nova_orders', JSON.stringify(orders));
    return newOrder;
  },

  async getOrders(userId) {
    try {
      const res = await apiClient.get(`/orders/user/${userId}`);
      if (res.data && res.data.length > 0) return res.data;
    } catch (e) {
      // fallback
    }

    const orders = getLocalOrders();
    return orders;
  },

  async getOrderById(orderId) {
    try {
      const res = await apiClient.get(`/orders/${orderId}`);
      if (res.data) return res.data;
    } catch (e) {
      // fallback
    }

    const orders = getLocalOrders();
    const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    if (!order) throw new Error("Order not found with ID: " + orderId);
    return order;
  },

  async cancelOrder(orderId) {
    try {
      const res = await apiClient.post(`/orders/${orderId}/cancel`);
      if (res.data) return res.data;
    } catch (e) {
      // fallback
    }

    const orders = getLocalOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      if (!orders[index].canCancel) {
        throw new Error("This order has already progressed and cannot be cancelled.");
      }
      orders[index].orderStatus = "Cancelled";
      orders[index].canCancel = false;
      localStorage.setItem('nova_orders', JSON.stringify(orders));
      return orders[index];
    }
    throw new Error("Order not found");
  },

  // CONTACT FORM
  async submitContact(formData) {
    try {
      const res = await apiClient.post('/contact', formData);
      if (res.data) return res.data;
    } catch (e) {
      // fallback
    }

    // store locally
    const messages = JSON.parse(localStorage.getItem('nova_contact_messages') || '[]');
    messages.push({ ...formData, id: 'msg-' + Date.now(), createdAt: new Date().toISOString() });
    localStorage.setItem('nova_contact_messages', JSON.stringify(messages));

    return {
      success: true,
      message: "Thank you for reaching out! We have received your inquiry and our team will get back to you within 24 hours."
    };
  }
};
