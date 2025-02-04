class ResponseMessages {
  // General Messages
  static General = {
    SUCCESS: { message: "Request completed successfully.", code: 200 },
    ERROR: { message: "An unexpected error occurred. Please try again later.", code: 500 },
    NOT_FOUND: { message: "Resource not found.", code: 404 },
    INVALID_INPUT: { message: "Invalid input provided.", code: 400 },
    UNAUTHORIZED: { message: "You are not authorized to perform this action.", code: 401 },
    FORBIDDEN: { message: "Access to this resource is forbidden.", code: 403 },
    SERVER_ERROR: { message: "Server error occurred. Please contact support.", code: 500 },
  }

  // Authentication & User Account
  static Auth = {
    LOGIN_SUCCESS: { message: "Logged in successfully.", code: 200 },
    LOGIN_FAILED: { message: "Invalid email or password.", code: 401 },
    LOGOUT_SUCCESS: { message: "Logged out successfully.", code: 200 },
    REGISTRATION_SUCCESS: { message: "Account created successfully.", code: 201 },
    PASSWORD_RESET_SUCCESS: { message: "Password reset successfully.", code: 200 },
    ACCOUNT_VERIFIED: { message: "Account verified successfully.", code: 200 },
    ACCOUNT_SUSPENDED: { message: "Your account has been suspended. Contact support.", code: 403 },
    AUTH_TOKEN_EXPIRED: { message: "Auth token is expired", code: 401 },
  }

  // User Account Actions
  static User = {
    USER_CREATED: { message: "User account created successfully.", code: 201 },
    USER_UPDATED: { message: "User details updated successfully.", code: 200 },
    USER_DELETED: { message: "User account deleted successfully.", code: 200 },
    USER_NOT_FOUND: { message: "User not found. Please register", code: 404 },
    USERNAME_TAKEN: { message: "Username is already taken.", code: 409 },
    EMAIL_TAKEN: { message: "Email address is already in use.", code: 409 },
    PASSWORD_CHANGED: { message: "Password changed successfully.", code: 200 },
    PASSWORD_MISMATCH: { message: "The new password does not match the confirmation.", code: 400 },
    INVALID_CREDENTIALS: { message: "Invalid credentials. Please check your username or password.", code: 401 },
    USER_ALREADY_EXIST: { message: "User already exists with this number.", code: 401 },
  }

  // Product & Catalog
  static Product = {
    PRODUCT_FOUND: { message: "Product retrieved successfully.", code: 200 },
    PRODUCT_NOT_FOUND: { message: "Product not found.", code: 404 },
    OUT_OF_STOCK: { message: "This product is currently out of stock.", code: 400 },
    PRODUCT_ADDED: { message: "Product added to your catalog successfully.", code: 201 },
    PRODUCT_UPDATED: { message: "Product updated successfully.", code: 200 },
    PRODUCT_DELETED: { message: "Product removed successfully.", code: 200 },
  }

  // Cart & Checkout
  static Cart = {
    ITEM_ADDED_TO_CART: { message: "Item added to cart successfully.", code: 200 },
    ITEM_REMOVED_FROM_CART: { message: "Item removed from cart.", code: 200 },
    CART_UPDATED: { message: "Cart updated successfully.", code: 200 },
    CHECKOUT_SUCCESS: { message: "Checkout completed successfully.", code: 200 },
    INSUFFICIENT_STOCK: { message: "Some items in your cart are out of stock.", code: 400 },
    CART_NOT_FOUND: { message: "Cart not found", code: 404 },
  }

  // Orders
  static Order = {
    ORDER_PLACED_SUCCESS: { message: "Order placed successfully.", code: 201 },
    ORDER_CANCELLED_SUCCESS: { message: "Order cancelled successfully.", code: 200 },
    ORDER_NOT_FOUND: { message: "Order not found.", code: 404 },
    ORDER_ALREADY_SHIPPED: { message: "Order has already been shipped and cannot be canceled.", code: 400 },
  }

  // Payments & Transactions
  static Payment = {
    PAYMENT_SUCCESS: { message: "Payment processed successfully.", code: 200 },
    PAYMENT_FAILED: { message: "Payment failed. Please try again.", code: 400 },
    REFUND_INITIATED: { message: "Refund initiated successfully.", code: 200 },
    REFUND_COMPLETED: { message: "Refund processed successfully.", code: 200 },
  }

  // Address Management
  static Address = {
    ADDRESS_ADDED: { message: "Address added successfully.", code: 201 },
    ADDRESS_UPDATED: { message: "Address updated successfully.", code: 200 },
    ADDRESS_DELETED: { message: "Address deleted successfully.", code: 200 },
    ADDRESS_NOT_FOUND: { message: "Address not found.", code: 404 },
    INVALID_ADDRESS: { message: "Invalid address provided.", code: 400 },
    DEFAULT_ADDRESS_SET: { message: "Default address set successfully.", code: 200 },
    ADDRESS_ALREADY_EXISTS: { message: "This address already exists.", code: 409 },
  }
}

export default ResponseMessages
