# TODO for Integrating Frontend with Backend and Stripe Payment

## Step 1: Backend Setup
- [ ] Ensure order-management-backend has Stripe dependency updated to latest version.
- [ ] Verify environment variables for Stripe API keys and client URLs are set in .env.
- [ ] Confirm backend routes for order creation and Stripe checkout session exist and work.

## Step 2: Frontend Setup
- [ ] Update frontend cart and checkout components to send cart data to backend API.
- [ ] Modify Checkout component to call backend /create-checkout-session endpoint with cart items.
- [ ] Handle Stripe redirect and success/cancel pages properly.

## Step 3: Integration
- [ ] Connect frontend addToCart and cart state with backend order creation API.
- [ ] Implement API calls for order creation and payment processing.
- [ ] Test full flow: add to cart -> checkout -> Stripe payment -> order saved in backend.

## Step 4: Testing and Validation
- [ ] Test API endpoints with Postman or similar tool.
- [ ] Test frontend UI and payment flow.
- [ ] Handle error cases and edge scenarios.

## Step 5: Deployment
- [x] Prepare environment variables for production.
- [x] Create deployment configuration files (Procfile, .env.example).
- [ ] Deploy backend to Heroku/Railway/Render.
- [ ] Deploy frontend to GitHub Pages.
- [ ] Update frontend .env with live backend URL.
- [ ] Test live integration and payment processing.
- [ ] Configure Stripe webhook endpoint for live backend.
