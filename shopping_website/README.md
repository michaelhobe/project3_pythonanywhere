# Shopping Website - Group Project

A simple e-commerce website with product catalog, shopping cart, and checkout functionality.

## 🎯 Project Overview

This is a static HTML frontend that connects to a PythonAnywhere Flask API backend.

- **Frontend**: HTML/CSS/JavaScript (in `local_frontend/` folder)
- **Backend API**: Flask app hosted on PythonAnywhere
- **Database**: MySQL on PythonAnywhere

## 📁 Project Structure

```
shopping_website/
├── local_frontend/          # HTML files - EDIT THESE!
│   ├── index.html          # Main products page
│   ├── cart.html           # Shopping cart
│   ├── checkout.html       # Checkout form
│   ├── confirmation.html   # Order confirmation
│   └── admin.html          # View all orders
│
├── static/                  # Styling and scripts
│   ├── css/
│   │   └── style.css       # Main styles - EDIT THIS!
│   └── js/                 # JavaScript (already working)
│       ├── main.js
│       ├── cart.js
│       └── products.js
│
└── pythonanywhere_flask_app.py  # Backend API (on server)
```

## 🚀 Quick Start for Group Members

### To View/Edit the Website:

1. **Clone this repo** to your computer
2. **Open `local_frontend/index.html`** in your browser (just double-click it!)
3. That's it! The site connects to the live API automatically

### To Edit HTML/CSS:

1. Edit files in `local_frontend/` folder
2. Edit `static/css/style.css` for styling
3. Refresh your browser to see changes
4. **No server needed** - just open the HTML files directly!

## 🎨 What You Can Edit

### Easy to Edit:
- ✅ **HTML content** in `local_frontend/*.html`
- ✅ **CSS styling** in `static/css/style.css`
- ✅ **Text, colors, fonts, layout**

### Don't Touch (Unless you know what you're doing):
- ⚠️ JavaScript files in `static/js/`
- ⚠️ `pythonanywhere_flask_app.py`
- ⚠️ API URL: `https://michaelhobart.pythonanywhere.com`

## 🔗 Live API

The website connects to: **https://michaelhobart.pythonanywhere.com**

### API Endpoints:
- `/api/products` - Get all products
- `/api/orders` - Get all orders
- `/checkout` - Submit new order

## 📝 Features

- ✅ Product catalog with categories (E-books, Courses, Software)
- ✅ Shopping cart with localStorage
- ✅ Checkout form
- ✅ Admin dashboard to view orders
- ✅ Responsive design

## 🐛 Troubleshooting

**Products not loading?**
- Check if you're connected to the internet
- Make sure the API is running: visit https://michaelhobart.pythonanywhere.com/api/products

**Cart not working?**
- Make sure cookies/localStorage is enabled in your browser
- Try a different browser (Chrome, Firefox, Edge)

**Styling looks weird?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check that `style.css` path is correct

## 👥 Group Collaboration Tips

1. **Before editing**: Pull latest changes from repo
2. **After editing**: Test in your browser first
3. **Commit often**: Small commits with clear messages
4. **Communicate**: Tell the group what you're working on!

## 📧 Contact

If something breaks or you need help, ask Michael!

---

**Last Updated**: November 2025
