import React from 'react';
import { CheckCircle2, Clock, Package, Truck, Home, AlertTriangle, ShieldCheck } from 'lucide-react';

export const OrderTimeline = ({ order, onCancel }) => {
  if (!order) return null;

  const stageIcons = {
    'order placed': CheckCircle2,
    'order confirmed': ShieldCheck,
    'packed': Package,
    'shipped': Truck,
    'out for delivery': Truck,
    'delivered': Home,
  };

  const getStageIcon = (name) => {
    const key = name.toLowerCase();
    const Icon = stageIcons[key] || CheckCircle2;
    return Icon;
  };

  const isCancelled = order.orderStatus?.toLowerCase() === 'cancelled';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
      {/* Header with Order Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Order Tracking</span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs font-extrabold text-brand-600">#{order.id}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {isCancelled ? 'Order Cancelled' : order.orderStatus}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-600 font-medium">Estimated Delivery</p>
            <p className="text-sm font-extrabold text-slate-900">{order.expectedDeliveryDate || '3-5 Business Days'}</p>
          </div>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide ${
              isCancelled
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : order.orderStatus?.toLowerCase() === 'delivered'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-brand-50 text-brand-700 border border-brand-200'
            }`}
          >
            {order.orderStatus}
          </span>
        </div>
      </div>

      {/* Cancelled Banner if cancelled */}
      {isCancelled ? (
        <div className="my-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="text-sm">
            <p className="font-bold">This order was cancelled.</p>
            <p className="text-xs text-rose-600">Any charges made to your payment method will be refunded within 3-5 business days.</p>
          </div>
        </div>
      ) : (
        /* 6-Stage Timeline Stepper */
        <div className="py-8">
          <div className="relative">
            {/* Timeline Items */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:h-full before:w-0.5 before:bg-slate-200 sm:before:left-6">
              {order.trackingTimeline?.map((stage, idx) => {
                const Icon = getStageIcon(stage.name);
                const isCompleted = stage.completed;
                const isCurrent =
                  isCompleted &&
                  (idx === order.trackingTimeline.length - 1 ||
                    !order.trackingTimeline[idx + 1]?.completed);

                return (
                  <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                    {/* Circle Node */}
                    <div
                      className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shrink-0 ${
                        isCompleted
                          ? 'bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      } ${isCurrent ? 'ring-4 ring-brand-100 scale-105' : ''}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Stage Details */}
                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4
                          className={`text-sm sm:text-base font-bold ${
                            isCompleted ? 'text-slate-900' : 'text-slate-600'
                          }`}
                        >
                          {stage.name}
                        </h4>
                        <span
                          className={`text-xs ${
                            isCompleted ? 'text-slate-600 font-semibold' : 'text-slate-400'
                          }`}
                        >
                          {stage.timestamp}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-xl">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Order Actions & Cancellation */}
      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-600">
          Payment Method: <span className="font-bold text-slate-800">{order.paymentMethod || 'Credit Card'}</span> ({order.paymentStatus || 'PAID'})
        </div>

        {order.canCancel && !isCancelled && onCancel && (
          <button
            onClick={() => onCancel(order.id)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
          >
            Cancel This Order
          </button>
        )}
      </div>
    </div>
  );
};
