# E-commerce Store API

This project is a simple e-commerce store API built with NestJS. It allows users to add items to their cart, checkout, and provides admin functionalities for generating discount codes and retrieving purchase summaries.

## Assignment Overview

### Requirements

1. **API Endpoints:**
   - Add items to the cart.
   - Checkout with optional discount code validation.
   - Admin endpoint to generate discount codes.
   - Admin endpoint to get purchase summary.

2. **Discount Logic:**
   - Every nth order gets a discount code.
   - Discount code applies to the entire order and can be used once.

3. **In-Memory Storage:**
   - Use in-memory data structures to store cart items, orders, and discount codes.

4. **Global Error Handling and Response Formatting:**
   - Consistent response structure for success and error cases.

5. **Unit Tests:**
   - Use Jest for testing the service logic.

6. **Documentation:**
   - Clear comments and a README file.

### Implementation Summary

- **Project Structure:** Organized into modules for cart and admin functionalities.
- **DTOs:** Used for request validation.
- **Global Interceptors and Filters:** Implemented for consistent response formatting and error handling.
- **Service Layer:** Encapsulates business logic for cart operations and discount management.
- **Unit Tests:** Comprehensive tests for service methods using Jest.

## Project Structure
```
src/
├── main.ts
├── app.module.ts
├── common/
│ ├── filters/
│ │ └── http-exception.filter.ts
│ ├── interceptors/
│ │ └── response.interceptor.ts
├── cart/
│ ├── dto/
│ │ ├── add-to-cart.dto.ts
│ │ └── checkout.dto.ts
│ ├── cart.controller.ts
│ ├── cart.module.ts
│ ├── cart.service.ts
│ ├── cart.interfaces.ts
│ └── cart.service.spec.ts
├── admin/
│ ├── admin.controller.ts
│ ├── admin.module.ts
│ └── admin.service.ts
```
## Setup

1. Clone the repository:

```bash
   git clone https://github.com/knitish91/ecommerce-store.git
   cd ecommerce-store
```
2. Install dependencies:

```BASH
    npm install
    Run the application:
```

```
  BASH
    npm run start
    The server will start on http://localhost:3000.
```

### API Endpoints
1. Add Item to Cart
      Endpoint: POST /cart/add

      Description: Add an item to a user's cart.

      Request:

      BASH
```
      curl -X POST http://localhost:3000/cart/add \
          -H "Content-Type: application/json" \
          -d '{
                "userId": "user1",
                "productId": "prod1",
                "quantity": 2
              }'
```
2. Checkout
      Endpoint: POST /cart/checkout

      Description: Checkout and place an order, optionally using a discount code.

      Request:

      BASH
```
      curl -X POST http://localhost:3000/cart/checkout \
          -H "Content-Type: application/json" \
          -d '{
                "userId": "user1",
                "discountCode": "DISCOUNT1"
              }'
```

3. Generate Discount Code (Admin)
      Endpoint: POST /admin/generate-discount
```
      Description: Manually generate a discount code.
```
      Request:

      BASH
```
      curl -X POST http://localhost:3000/admin/generate-discount
      4. Get Purchase Summary (Admin)
      Endpoint: GET /admin/purchase-summary
```
```
      Description: Retrieve a summary of all purchases.
```
Request:

      BASH
```
      curl -X GET http://localhost:3000/admin/purchase-summary
      Testing
      Run unit tests using Jest:
```
      BASH
```
      npm run test

```