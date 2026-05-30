import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const API_BASE_URL = 'http://localhost:4242/api';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Generate or get session ID
  const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const sessionId = getSessionId();
      const response = await fetch(`${API_BASE_URL}/cart/${sessionId}`);
      const data = await response.json();

      if (data.items) {
        setCartItems(data.items || []);
        setCartCount(data.items?.reduce((total, item) => total + item.quantity, 0) || 0);
        setCartTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      
      // Fallback to local storage if backend is not available
      if (error.message.includes('fetch')) {
        console.log('CartContext: Backend not available, loading from local storage');
        try {
          const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
          setCartItems(localCart);
          setCartCount(localCart.reduce((total, item) => total + item.quantity, 0));
          setCartTotal(localCart.reduce((total, item) => total + (item.price * item.quantity), 0));
        } catch (localError) {
          console.error('Local storage fallback failed:', localError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    try {
      setIsLoading(true);
      const sessionId = getSessionId();
      
      const cartItem = {
        productId: product.id || product._id,
        name: product.name,
        quantity: 1,
        price: product.price,
        image: product.image || ''
      };

      const response = await fetch(`${API_BASE_URL}/cart/${sessionId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.message) {
        await fetchCart(); // Refresh cart
        return { success: true, message: 'Item added to cart' };
      } else {
        return { success: false, message: data.error || 'Failed to add item to cart' };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Fallback to local storage if backend is not available
      if (error.message.includes('fetch') || error.message.includes('Server error')) {
        try {
          const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
          const cartItem = {
            productId: product.id || product._id,
            name: product.name,
            quantity: 1,
            price: product.price,
            image: product.image || ''
          };
          
          const existingItem = localCart.find(item => item.productId === cartItem.productId);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            localCart.push(cartItem);
          }
          
          localStorage.setItem('localCart', JSON.stringify(localCart));
          setCartItems(localCart);
          setCartCount(localCart.reduce((total, item) => total + item.quantity, 0));
          setCartTotal(localCart.reduce((total, item) => total + (item.price * item.quantity), 0));
          
          return { success: true, message: 'Item added to cart (offline mode)' };
        } catch (localError) {
          console.error('Local storage fallback failed:', localError);
        }
      }
      
      return { success: false, message: 'Failed to add item to cart' };
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      const response = await fetch(`${API_BASE_URL}/cart/${sessionId}/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchCart(); // Refresh cart
        return { success: true, message: 'Cart updated' };
      } else {
        return { success: false, message: data.message || 'Failed to update cart' };
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      return { success: false, message: 'Failed to update cart' };
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      const response = await fetch(`${API_BASE_URL}/cart/${sessionId}/remove/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchCart(); // Refresh cart
        return { success: true, message: 'Item removed from cart' };
      } else {
        return { success: false, message: data.message || 'Failed to remove item from cart' };
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, message: 'Failed to remove item from cart' };
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      const response = await fetch(`${API_BASE_URL}/cart/${sessionId}/clear`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setCartItems([]);
        setCartCount(0);
        setCartTotal(0);
        return { success: true, message: 'Cart cleared' };
      } else {
        return { success: false, message: data.message || 'Failed to clear cart' };
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, message: 'Failed to clear cart' };
    } finally {
      setIsLoading(false);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

