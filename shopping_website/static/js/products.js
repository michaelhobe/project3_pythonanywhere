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
        
        // Organize by category
        const categories = {
            ebooks: [],
            courses: [],
            software: []
        };
        
        products.forEach(product => {
            if (categories[product.category]) {
                categories[product.category].push(product);
            }
        });
        
        // Display products for each category
        displayProducts('ebooks', categories.ebooks);
        displayProducts('courses', categories.courses);
        displayProducts('software', categories.software);
        
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
