import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const { user } = useAuth();
  const { addToast } = useToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getOrders(user?.id || 'demo-user');
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const placeOrder = async (orderPayload) => {
    setLoading(true);
    try {
      const newOrder = await apiService.checkout({
        ...orderPayload,
        userId: user?.id || 'demo-user'
      });
      setOrders((prev) => [newOrder, ...prev]);
      setActiveTrackingOrder(newOrder);
      addToast(`Order placed successfully! Order ID: ${newOrder.id}`, 'success');
      return { success: true, order: newOrder };
    } catch (err) {
      addToast(err.message || 'Failed to place order', 'error');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setLoading(true);
    try {
      const updated = await apiService.cancelOrder(orderId);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updated : o))
      );
      if (activeTrackingOrder?.id === orderId) {
        setActiveTrackingOrder(updated);
      }
      addToast(`Order #${orderId} has been cancelled successfully.`, 'info');
      return { success: true, order: updated };
    } catch (err) {
      addToast(err.message || 'Failed to cancel order', 'error');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const trackOrderById = async (orderId) => {
    setLoading(true);
    try {
      const order = await apiService.getOrderById(orderId);
      setActiveTrackingOrder(order);
      return { success: true, order };
    } catch (err) {
      addToast(err.message || 'Order not found', 'error');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        activeTrackingOrder,
        setActiveTrackingOrder,
        placeOrder,
        cancelOrder,
        trackOrderById,
        refreshOrders: fetchOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
