import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { CartContext } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import axios from 'axios'; // ✅ Import axios for backend connection

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { addOrder } = useOrder();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
    paymentMethod: 'credit',
    nameOnCard: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      items: cartItems,
      user: `${form.firstName} ${form.lastName}`,
      email: form.email || 'N/A',
      amount: cartItems.reduce((acc, item) => acc + item.price, 0),
      status: 'Processing',
      date: new Date().toISOString().split('T')[0],
    };

    // ✅ Add to local context
    addOrder(newOrder);

    try {
      // ✅ Send to MongoDB backend
      await axios.post('http://localhost:5000/api/orders', newOrder);
      console.log('Order saved to MongoDB');
    } catch (err) {
      console.error('Error saving order to MongoDB:', err);
    }

    // ✅ Create and download receipt
    const receiptContent = `
============ ReSha Store Receipt ============

👤 Customer: ${form.firstName} ${form.lastName}
📛 Username: @${form.username}
📧 Email: ${form.email || 'N/A'}
🏠 Address: ${form.address}, ${form.address2 || ''}
🌍 ${form.state}, ${form.country} - ${form.zip}

🛍️ Order Summary:
${cartItems
        .map((item, i) => `${i + 1}. ${item.name} - ₹${item.price}`)
        .join('\n')}

💳 Payment Method: ${form.paymentMethod}
🧾 Name on Card: ${form.nameOnCard}
💰 Total: ₹${cartItems.reduce((acc, item) => acc + item.price, 0)}

🕒 Date: ${new Date().toLocaleString()}
=============================================
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ReSha_Receipt_${form.username || 'order'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    navigate('/user/dashboard');
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>🛒 Secure Checkout</h2>

        {/* Billing Information */}
        <div className="section-block">
          <h3>🏠 Billing Information</h3>
          <div className="row">
            <div className="col">
              <label>First Name</label>
              <input type="text" name="firstName" required onChange={handleChange} />
            </div>
            <div className="col">
              <label>Last Name</label>
              <input type="text" name="lastName" required onChange={handleChange} />
            </div>
          </div>

          <label>Username</label>
          <div className="input-group">
            <span>@</span>
            <input type="text" name="username" required onChange={handleChange} />
          </div>

          <div className="col-full">
            <label>Email (optional)</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>

          <div className="col-full">
            <label>Address</label>
            <input type="text" name="address" required onChange={handleChange} />
          </div>

          <div className="col-full">
            <label>Address 2 (optional)</label>
            <input type="text" name="address2" onChange={handleChange} />
          </div>

          <div className="row">
            <div className="col">
              <label>Country</label>
              <select name="country" required onChange={handleChange}>
                <option value="">Choose...</option>
                <option>India</option>
                <option>USA</option>
              </select>
            </div>
            <div className="col">
              <label>State</label>
              <select name="state" required onChange={handleChange}>
                <option value="">Choose...</option>
                <option>Andhra Pradesh</option>
                <option>California</option>
              </select>
            </div>
            <div className="col">
              <label>Zip</label>
              <input type="text" name="zip" required onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="section-block">
          <h3>🧾 Order Summary</h3>
          <ul className="cart-summary">
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              cartItems.map((item) => (
                <li key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} className="summary-img" />
                  <span>{item.name}</span>
                  <span className="price">₹{item.price}</span>
                </li>
              ))
            )}
            <li className="total">
              <strong>Total</strong>
              <span className="price">₹{total}</span>
            </li>
          </ul>
        </div>

        {/* Payment Details */}
        <div className="section-block">
          <h3>💳 Payment Details</h3>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={form.paymentMethod === 'credit'}
                onChange={handleChange}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="debit"
                checked={form.paymentMethod === 'debit'}
                onChange={handleChange}
              />
              Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={form.paymentMethod === 'paypal'}
                onChange={handleChange}
              />
              PayPal
            </label>
          </div>

          <label>Name on Card</label>
          <input type="text" name="nameOnCard" required onChange={handleChange} />

          <label>Card Number</label>
          <input type="text" name="cardNumber" required onChange={handleChange} />

          <div className="row">
            <div className="col">
              <label>Expiration</label>
              <input type="text" name="expiration" required onChange={handleChange} />
            </div>
            <div className="col">
              <label>CVV</label>
              <input type="text" name="cvv" required onChange={handleChange} />
            </div>
          </div>
        </div>

        <button type="submit" className="checkout-btn">
          ✅ Place Order & Download Receipt
        </button>
      </form>
    </div>
  );
};

export default Checkout;
