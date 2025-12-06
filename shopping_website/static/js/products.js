// Products JavaScript - handles product loading and display
// API Configuration
const API_URL = 'https://michaelhobart.pythonanywhere.com';

/**
 * Fetch and load all products from the API
 * Organizes products by category and displays them
 */
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error('Failed to load products');
        
        const data = await response.json();
        const products = data.products || [];  // Extract products array from response
        

        //Products description

       // Ebooks Description
products.forEach(product => {
    if (product.name === "Web Dev Basics") {
        product.description = "A beginner-friendly introduction to web development concepts.";
    } else if (product.name === "Python Guide") {
        product.description = "A step-by-step guide for learning Python fundamentals.";
    } else if (product.name === "JavaScript Fundamentals") {
        product.description = "Master the basics of JavaScript with practical examples.";
    } else if (product.name === "Database Design") {
        product.description = "Learn how to structure, model, and build relational databases.";
    } else if (product.name === "CSS Mastery") {
        product.description = "Improve your CSS skills with layouts, selectors, and styling techniques.";

        //Courses Description
    } else if (product.name === "Flask Course") {
        product.description = "Learn how to build dynamic web applications using the Flask framework, including routing, templates, and backend integration."; 

    } else if (product.name === "JavaScript Basics") {
        product.description = "Learn the core concepts of JavaScript, including variables, functions, loops, and DOM interaction."; 

    } else if (product.name === "Full Stack Development") {
        product.description = "Discover how front-end and back-end technologies work together while building full-stack applications from start to finish."; 

    } else if (product.name === "MySQL Database Course") {
        product.description = "Learn how to design, manage, and query relational databases using MySQL — perfect for beginners and backend developers."; 

    } else if (product.name === "React Fundamentals") {
        product.description = "Understand the core concepts of React, including components, props, state, and building interactive user interfaces."; 
    }});


        // Organize by category
        const categories = {
            ebooks: [],
            courses: []
        };
        
        products.forEach(product => {
            if (categories[product.category]) {
                categories[product.category].push(product);
            }
        });
        
        // Display products for each category
        displayProducts('ebooks', categories.ebooks);
        displayProducts('courses', categories.courses);
        
    } catch (error) {
        console.error('Error loading products:', error);
        document.querySelectorAll('.product-grid').forEach(grid => {
            grid.innerHTML = '<p style="color: red;">Error loading products. Please check if the API is running.</p>';
        });
    }
}

/**
 * Display products in a specific category grid
 * @param {string} category - The category name (ebooks, courses, software)
 * @param {Array} products - Array of product objects to display
 */
function displayProducts(category, products) {
    const grid = document.getElementById(`${category}-grid`);
    
    if (!grid) return; // Grid doesn't exist on this page
    
    if (products.length === 0) {
        grid.innerHTML = '<p>No products available.</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="../static/images/products/${product.image_url}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.src='../static/images/products/placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <p class="price">$${product.sell_price}</p>
                <button class="add-to-cart-btn" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.sell_price}">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});
