# Local HTML Frontend - Setup Guide

This folder contains static HTML files that connect to your PythonAnywhere Flask API backend.

## Architecture

```
Local HTML Files (Browser)
    ↓ HTTP Requests
PythonAnywhere Flask API
    ↓ SQL Queries  
PythonAnywhere MySQL Database
```

## Files

- **index.html** - Product catalog page
- **cart.html** - Shopping cart
- **checkout.html** - Checkout form
- **confirmation.html** - Order confirmation
- **admin.html** - Admin dashboard to view all orders

## Quick Start

### 1. Set Up PythonAnywhere Backend

First, follow the instructions in `../PYTHONANYWHERE_SETUP.md` to:
- Add CORS support to your Flask app
- Ensure all required API endpoints exist
- Reload your PythonAnywhere web app

### 2. Open Local Frontend

**Option A: Double-click HTML files**
- Simply double-click `index.html` to open in your browser
- Works with file:// protocol

**Option B: Use VS Code Live Server (Recommended)**
- Install "Live Server" extension in VS Code
- Right-click `index.html`
- Select "Open with Live Server"
- Opens at http://127.0.0.1:5500 or http://localhost:5500

**Option C: Python HTTP Server**
```bash
cd local_frontend
python -m http.server 8000
```
Then open: http://localhost:8000

## Testing the Application

### Step 1: Test Products Page
1. Open `index.html`
2. You should see products organized by category (E-books, Courses, Software)
3. Check browser console (F12) for any errors

**If products don't load:**
- Check if https://michaelhobart.pythonanywhere.com/api/products returns JSON
- Look for CORS errors in browser console
- Verify PythonAnywhere app is running

### Step 2: Test Shopping Cart
1. Click "Add to Cart" on any product
2. Should see alert confirming item added
3. Cart count in navigation should increase
4. Click "Cart" to view cart page
5. Test quantity adjustment buttons (+/-)
6. Test remove button

### Step 3: Test Checkout
1. From cart page, click "Proceed to Checkout"
2. Fill in:
   - Email address
   - Phone number
   - Suburb
3. Click "Place Order"
4. Should redirect to confirmation page
5. Cart should be cleared

**If checkout fails:**
- Check browser console for errors
- Verify https://michaelhobart.pythonanywhere.com/checkout endpoint exists
- Check if CORS is properly configured

### Step 4: Test Admin Dashboard
1. Click "Admin" in navigation
2. Should see all orders from the database
3. Each order shows customer details and items

**If orders don't load:**
- Check if https://michaelhobart.pythonanywhere.com/api/orders exists
- The page will show instructions if endpoint is missing

## How It Works

### Data Storage
- **Cart data**: Stored in browser's localStorage
- **Orders**: Saved to PythonAnywhere MySQL database via API
- **Products**: Fetched from PythonAnywhere database via API

### API Calls

The frontend makes these API requests:

| Action | Method | Endpoint | Purpose |
|--------|--------|----------|---------|
| Load products | GET | /api/products | Fetch all products |
| View orders | GET | /api/orders | Fetch all orders (admin) |
| Place order | POST | /checkout | Submit order with cart data |

### Cart Functionality
- Cart stored in browser's localStorage
- Persists between page refreshes
- Cleared after successful checkout

## Customization

### Change API URL

Edit the `API_URL` constant in each HTML file:

```javascript
const API_URL = 'https://your-domain.com';
```

Current setting: `https://michaelhobart.pythonanywhere.com`

### Styling

CSS is loaded from: `../static/css/style.css`

You can customize the appearance by editing that file.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Edge, Safari)
- Requires JavaScript enabled
- Requires localStorage support
- Requires fetch API support

## Troubleshooting

### Products Not Loading

**Check 1: API Endpoint**
```bash
# Test in browser or curl
https://michaelhobart.pythonanywhere.com/api/products
```
Should return JSON array of products.

**Check 2: CORS**
Open browser console (F12) → Look for CORS errors.
If you see CORS error, CORS is not properly configured on PythonAnywhere.

**Check 3: PythonAnywhere App Status**
- Go to PythonAnywhere Web tab
- Check if app is running (green indicator)
- Click Reload if needed

### Orders Not Submitting

**Check POST endpoint:**
The checkout form posts to: `https://michaelhobart.pythonanywhere.com/checkout`

Make sure this endpoint:
1. Accepts POST requests
2. Accepts form-urlencoded data
3. Returns success response

### Admin Dashboard Empty

**Check if endpoint exists:**
Visit: `https://michaelhobart.pythonanywhere.com/api/orders`

If you get 404, add the endpoint (see PYTHONANYWHERE_SETUP.md).

### Cart Persists After Checkout

If cart doesn't clear after successful checkout:
- Check if checkout actually succeeded (check database)
- Manually clear: Open browser console → `localStorage.clear()`

## Development Tips

### View localStorage Data
```javascript
// In browser console
console.log(localStorage.getItem('cart'));
```

### Clear Cart Manually
```javascript
// In browser console
localStorage.removeItem('cart');
```

### Test API Endpoints
```javascript
// In browser console
fetch('https://michaelhobart.pythonanywhere.com/api/products')
  .then(r => r.json())
  .then(d => console.log(d));
```

## Next Steps

After testing locally:
1. Update your PythonAnywhere Flask app with any needed changes
2. Consider hosting these HTML files on a proper web server
3. Update CORS settings to match production domain
4. Add authentication for admin dashboard
5. Implement payment processing for real orders

## Support

If you encounter issues:
1. Check browser console for JavaScript errors
2. Test API endpoints directly in browser
3. Review PYTHONANYWHERE_SETUP.md for backend requirements
4. Check PythonAnywhere error logs
