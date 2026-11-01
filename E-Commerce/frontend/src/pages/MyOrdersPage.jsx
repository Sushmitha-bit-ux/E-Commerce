import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Calendar, CreditCard, ChevronRight, X, Clock, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderTimeline } from '../components/OrderTimeline';
import { useToast } from '../context/ToastContext';

export const MyOrdersPage = () => {
  const { orders, loading, cancelOrder, trackOrderById } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const { addToast } = useToast();

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;

    setTrackingLoading(true);
    const res = await trackOrderById(searchOrderId.trim());
    setTrackingLoading(false);
    if (res.success) {
      setSelectedOrder(res.order);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm(`Are you sure you wish to cancel order #${orderId}?`)) {
      await cancelOrder(orderId);
      // update modal if open
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, orderStatus: 'Cancelled', canCancel: false }));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header & Order Lookup */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
              Customer Portal
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time shipment progress across all 6 fulfillment stages and view order history.
          </p>
        </div>

        {/* Quick Order ID Search Bar */}
        <form onSubmit={handleTrackSubmit} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="Track Order (e.g. ORD-892415)"
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500 shadow-2xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button
            type="submit"
            disabled={trackingLoading}
            className="bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-2xs shrink-0"
          >
            {trackingLoading ? 'Locating...' : 'Track'}
          </button>
        </form>
      </div>

      {/* Featured / Active Order Tracker Highlight (if an order is selected or default to first order) */}
      {selectedOrder ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">
              Live Fulfillment Status
            </h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Hide Details</span>
            </button>
          </div>
          <OrderTimeline order={selectedOrder} onCancel={handleCancelOrder} />
        </div>
      ) : orders.length > 0 ? (
        /* If no explicit selected order, show tracker for the most recent order */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Most Recent Shipment Tracking</span>
            </h2>
          </div>
          <OrderTimeline order={orders[0]} onCancel={handleCancelOrder} />
        </div>
      ) : null}

      {/* Orders List Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          All Orders ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Orders Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't placed any orders yet. Discover our latest tech and lifestyle releases.
            </p>
            <Link
              to="/products"
              className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isDelivered = order.orderStatus?.toLowerCase() === 'delivered';
              const isCancelled = order.orderStatus?.toLowerCase() === 'cancelled';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-900 text-sm">
                        Order #{order.id}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          isCancelled
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : isDelivered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-brand-50 text-brand-700 border border-brand-200'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Items List Inside Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{item.productName}</p>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer Info & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="text-xs space-y-0.5">
                      <p className="text-slate-500">
                        Total Amount: <span className="font-black text-slate-900 text-sm">${order.totalAmount?.toFixed(2)}</span>
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Expected: {order.expectedDeliveryDate} • {order.paymentMethod} ({order.paymentStatus})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          window.scrollTo({ top: 180, behavior: 'smooth' });
                        }}
                        className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>View Tracking Timeline</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {order.canCancel && !isCancelled && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="py-2 px-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
