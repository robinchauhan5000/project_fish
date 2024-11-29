class ResponseMessages {
    // General Messages
    static General = {
      SUCCESS: 'Request completed successfully.',
      ERROR: 'An unexpected error occurred. Please try again later.',
      NOT_FOUND: 'Resource not found.',
      INVALID_INPUT: 'Invalid input provided.',
      UNAUTHORIZED: 'You are not authorized to perform this action.',
      FORBIDDEN: 'Access to this resource is forbidden.',
      SERVER_ERROR: 'Server error occurred. Please contact support.',
    };
  
    // Authentication & User Account
    static Auth = {
      LOGIN_SUCCESS: 'Logged in successfully.',
      LOGIN_FAILED: 'Invalid email or password.',
      LOGOUT_SUCCESS: 'Logged out successfully.',
      REGISTRATION_SUCCESS: 'Account created successfully.',
      PASSWORD_RESET_SUCCESS: 'Password reset successfully.',
      ACCOUNT_VERIFIED: 'Account verified successfully.',
      ACCOUNT_SUSPENDED: 'Your account has been suspended. Contact support.',
    };
  
    // Product & Catalog
    static Product = {
      PRODUCT_FOUND: 'Product retrieved successfully.',
      PRODUCT_NOT_FOUND: 'Product not found.',
      OUT_OF_STOCK: 'This product is currently out of stock.',
      PRODUCT_ADDED: 'Product added to your catalog successfully.',
      PRODUCT_UPDATED: 'Product updated successfully.',
      PRODUCT_DELETED: 'Product removed successfully.',
    };
  
    // Cart & Checkout
    static Cart = {
      ITEM_ADDED_TO_CART: 'Item added to cart successfully.',
      ITEM_REMOVED_FROM_CART: 'Item removed from cart.',
      CART_UPDATED: 'Cart updated successfully.',
      CHECKOUT_SUCCESS: 'Checkout completed successfully.',
      INSUFFICIENT_STOCK: 'Some items in your cart are out of stock.',
    };
  
    // Orders
    static Order = {
      ORDER_PLACED_SUCCESS: 'Order placed successfully.',
      ORDER_CANCELLED_SUCCESS: 'Order cancelled successfully.',
      ORDER_NOT_FOUND: 'Order not found.',
      ORDER_ALREADY_SHIPPED: 'Order has already been shipped and cannot be canceled.',
    };
  
    // Payments & Transactions
    static Payment = {
      PAYMENT_SUCCESS: 'Payment processed successfully.',
      PAYMENT_FAILED: 'Payment failed. Please try again.',
      REFUND_INITIATED: 'Refund initiated successfully.',
      REFUND_COMPLETED: 'Refund processed successfully.',
    };
  }
  