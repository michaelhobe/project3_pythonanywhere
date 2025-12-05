// Admin JavaScript - handles order loading and display
// API Configuration
const API_URL = 'https://michaelhobart.pythonanywhere.com';

/**
 * Fetch and load all orders from the API
 * Displays orders in the admin dashboard
 */
async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/api/orders`);
        if (!response.ok) throw new Error('Failed to load orders');
        
        const data = await response.json();
        const orders = data.orders || [];  // Extract orders array from response
        displayOrders(orders);
        
    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('orders-container').innerHTML = 
            '<p style="color: red;">Error loading orders. Please check if the API is running.</p>';
    }
}

/**
 * Display orders in the admin dashboard
 * @param {Array} orders - Array of order objects to display
 */
function displayOrders(orders) {
    const container = document.getElementById('orders-container');
    
    if (!container) return; // Container doesn't exist on this page
    
    if (orders.length === 0) {
        container.innerHTML = '<p>No orders yet.</p>';
        return;
    }
    
    container.innerHTML = `
        <p>Total Orders: ${orders.length}</p>
        <div class="orders-list">
            ${orders.map(order => `
                <div class="order-card">
                    <h3>Order #${order.id}</h3>
                    <p><strong>Customer:</strong> ${order.customer_name || 'N/A'}</p>
                    <p><strong>Email:</strong> ${order.customer_email || 'N/A'}</p>
                    <p><strong>Date:</strong> ${new Date(order.order_date).toLocaleString()}</p>
                    <p><strong>Total:</strong> $${order.total_amount.toFixed(2)}</p>
                    <p><strong>Status:</strong> <span class="status-${order.status}">${order.status}</span></p>
                </div>
            `).join('')}
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
});
