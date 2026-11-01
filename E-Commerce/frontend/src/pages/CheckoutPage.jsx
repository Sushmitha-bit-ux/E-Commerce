import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, QrCode, Building, Banknote, ShieldCheck, CheckCircle2, ArrowRight, ShoppingBag, Loader2, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = () => {
  const { cartItems, subtotal, discountAmount, shippingFee, finalTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { placeOrder } = useOrders();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Form states pre-filled from user profile if available
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: user?.phone || '+1 (555) 234-5678',
    shippingAddress: user?.address || '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zipCode: '97477',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvv: '382',
    cardHolder: user?.name || 'Sophia Davis'
  });
  const [upiId, setUpiId] = useState('sophia@okhdfcbank');
  const [selectedBank, setSelectedBank] = useState('Chase Bank');

  // Payment simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerEmail.trim() || !formData.shippingAddress.trim()) {
      addToast('Please fill in all mandatory customer and delivery address fields.', 'error');
      return;
    }

    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'error');
      return;
    }

    // Realistic payment processing simulation
    setIsProcessing(true);

    setTimeout(async () => {
      const orderPayload = {
        userId: user?.id || 'demo-user',
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery',
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount: finalTotal
      };

      const result = await placeOrder(orderPayload);
      setIsProcessing(false);

      if (result.success) {
        setOrderConfirmed(result.order);
        clearCart();
      }
    }, 1800);
  };

  // If order was placed, show confirmation screen
  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Payment Verified & Approved
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            Thank You For Your Order!
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Your order has been recorded in our system. A confirmation email with invoice details was sent to <span className="font-bold text-slate-700">{orderConfirmed.customerEmail}</span>.
          </p>
        </div>

        {/* Order Brief Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs max-w-lg mx-auto text-left space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-bold">Order Reference:</span>
            <span className="font-extrabold text-brand-600 text-sm">#{orderConfirmed.id}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-bold">Estimated Delivery:</span>
            <span className="font-extrabold text-slate-900">{orderConfirmed.expectedDeliveryDate}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-bold">Total Paid:</span>
            <span className="font-black text-slate-900 text-sm">${orderConfirmed.totalAmount?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">Deliver To:</span>
            <span className="font-medium text-slate-700 truncate max-w-[220px]">
              {orderConfirmed.shippingAddress}, {orderConfirmed.city}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/orders')}
            className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm py-3 px-8 rounded-2xl shadow-lg shadow-brand-500/20 flex items-center gap-2 transition"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Track Order Timeline</span>
          </button>

          <Link
            to="/products"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-3 px-6 rounded-2xl transition"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500">Add some items to your shopping cart before checking out.</p>
        <Link to="/products" className="inline-block bg-brand-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Checkout & Shipping
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete your delivery details and choose your preferred payment method.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer & Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>1. Shipping & Customer Details</span>
                {isAuthenticated && (
                  <span className="text-[11px] text-brand-600 font-bold">Auto-filled from profile</span>
                )}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Sophia Davis"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="sophia@example.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 234-5678"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Street Address</label>
                  <input
                    type="text"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Springfield"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="OR"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="97477"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100">
                2. Select Payment Method
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'border-brand-600 bg-brand-50/70 text-brand-700 shadow-2xs font-extrabold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'upi'
                      ? 'border-brand-600 bg-brand-50/70 text-brand-700 shadow-2xs font-extrabold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'netbanking'
                      ? 'border-brand-600 bg-brand-50/70 text-brand-700 shadow-2xs font-extrabold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="text-xs">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'cod'
                      ? 'border-brand-600 bg-brand-50/70 text-brand-700 shadow-2xs font-extrabold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>
              </div>

              {/* Dynamic Payment Details form */}
              <div className="pt-2">
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Expiration (MM/YY)</label>
                        <input
                          type="text"
                          value={cardDetails.cardExp}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardExp: e.target.value })}
                          placeholder="12/28"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardDetails.cardCvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardCvv: e.target.value })}
                          placeholder="382"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <label className="text-[11px] font-bold text-slate-600 uppercase block">Virtual Payment Address (VPA)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                    />
                    <p className="text-[11px] text-slate-400">A payment collect request will be sent to your UPI app.</p>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <label className="text-[11px] font-bold text-slate-600 uppercase block">Choose Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                    >
                      <option>Chase Bank</option>
                      <option>Bank of America</option>
                      <option>Wells Fargo</option>
                      <option>Citibank</option>
                      <option>HDFC Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <p className="font-bold">Cash on Delivery Selected</p>
                    <p className="mt-0.5">Please keep exact change ready upon carrier arrival at your doorstep.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order Summary Recap */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-slate-400 font-normal">({cartItems.length} items)</span>
            </h2>

            {/* Item Previews */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{item.productName}</p>
                    <p className="text-slate-400">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount Applied</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? <span className="text-emerald-600 uppercase font-extrabold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                <span>Total Amount Due</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black text-sm py-4 rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Payment & Creating Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order • ${finalTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Payment processed with end-to-end 256-bit encryption</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
