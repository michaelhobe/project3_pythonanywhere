// Main JavaScript file - handles "Add to Cart" button clicks using Event Delegation

// Use event delegation to handle dynamically loaded buttons
document.addEventListener('click', function(e) {
    // Check if the clicked element is an "Add to Cart" button
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.getAttribute('data-id');
        const productName = e.target.getAttribute('data-name');
        const productPrice = e.target.getAttribute('data-price');
        
        // Call addToCart function from cart.js
        addToCart(productId, productName, productPrice);
    }
});
