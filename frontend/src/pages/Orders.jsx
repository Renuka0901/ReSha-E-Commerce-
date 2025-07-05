import React, { useState } from 'react';
import './Orders.css';
import { useOrder } from '../context/OrderContext';

const Orders = () => {
  const { orders, setOrders } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = (order, item) => {
    setSelectedOrder({ ...order, item });
  };

  const handleCancel = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || order.status === 'Cancelled' || order.status === 'Delivered') {
      alert('This order cannot be cancelled.');
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="admin-page">
      <h1 className="title">All Orders</h1>

      <div className="orders-grid">
        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          orders.map((order) =>
            order.items.map((item, index) => (
              <div key={`${order.id}-${index}`} className="order-card">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="order-image"
                />
                <div className="order-details">
                  <h3>{item.name}</h3>
                  <p><strong>Order ID:</strong> #{order.id}</p>
                  <p><strong>Customer:</strong> {order.user}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Quantity:</strong> 1</p>
                  <p><strong>Total Amount:</strong> ₹{item.price}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Status:</strong>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="order-actions">
                  <button
                    className="view-btn"
                    onClick={() => handleView(order, item)}
                  >
                    View
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(order.id)}
                    disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                    title={
                      order.status === 'Cancelled'
                        ? 'Already Cancelled'
                        : order.status === 'Delivered'
                        ? 'Delivered orders cannot be cancelled'
                        : 'Cancel this order'
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )
        )}
      </div>

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h3>Order Details</h3>
            <p><strong>Product:</strong> {selectedOrder.item.name}</p>
            <p><strong>Customer:</strong> {selectedOrder.user}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Amount:</strong> ₹{selectedOrder.item.price}</p>
            <p><strong>Payment:</strong> {selectedOrder.payment}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Order Date:</strong> {selectedOrder.date}</p>
            <button onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
