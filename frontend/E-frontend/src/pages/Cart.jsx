import React from 'react'
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {removeFromCart, addToCart, clearCart} from '../redux/cartSlice'
import { useSelector, useDispatch } from 'react-redux';
import '../styles/cart.css'

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleUpdateQty = (item, qty) => {
        if (qty <= 0) return;
        dispatch(addToCart({ ...item, quantity: qty }));
    };


    const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Go Shopping</Link></p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{Number(item.price).toFixed(2)}</p>
                  <div className="qty-controls">
                    <button onClick={() => handleUpdateQty(item, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(item, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item._id)} className="btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart