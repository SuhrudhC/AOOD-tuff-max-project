// Tax rate (8% example - adjust as needed)
const TAX_RATE = 0.08;
const SHIPPING_FEE = 20.00;
const FREE_SHIPPING_THRESHOLD = 75.00;
const DISCOUNT_CODE = 'SHIP75';

let appliedDiscount = false;

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => {
        // URL encode image path if it contains spaces
        const imageSrc = item.image.includes(' ') && !item.image.includes('%20') 
            ? item.image.replace(/ /g, '%20') 
            : item.image;
        return `
        <div class="cart-item" style="display: flex; align-items: center; padding: 1rem; border-bottom: 1px solid #eee; gap: 1rem;">
            <img src="${imageSrc}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 3px;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">${item.name}</h4>
                <p style="margin: 0; color: #666; font-size: 0.9rem;">$${item.price.toFixed(2)} each</p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 3px;">-</button>
                <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                <button onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 3px;">+</button>
            </div>
            <div style="text-align: right; min-width: 80px;">
                <p style="margin: 0; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeItem('${item.id}')" style="margin-top: 0.5rem; background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 0.85rem; text-decoration: underline;">Remove</button>
            </div>
        </div>
    `;
    }).join('');
}

// Update item quantity
function updateItemQuantity(productId, quantity) {
    updateQuantity(productId, quantity);
    displayCart();
    calculateTotals();
}

// Remove item
function removeItem(productId) {
    removeFromCart(productId);
    displayCart();
    calculateTotals();
}

// Calculate totals
function calculateTotals() {
    const subtotal = getCartTotal();
    const tax = subtotal * TAX_RATE;
    
    let shipping = SHIPPING_FEE;
    if (appliedDiscount && subtotal >= FREE_SHIPPING_THRESHOLD) {
        shipping = 0;
    } else if (subtotal >= FREE_SHIPPING_THRESHOLD && appliedDiscount) {
        shipping = 0;
    }
    
    const total = subtotal + tax + shipping;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Apply discount code
function applyDiscount() {
    const code = document.getElementById('discountCode').value.trim().toUpperCase();
    const messageEl = document.getElementById('discountMessage');
    const subtotal = getCartTotal();
    
    if (code === DISCOUNT_CODE) {
        if (subtotal >= FREE_SHIPPING_THRESHOLD) {
            appliedDiscount = true;
            messageEl.textContent = 'Discount applied! Free shipping on orders over $75.';
            messageEl.style.color = '#27ae60';
        } else {
            appliedDiscount = false;
            messageEl.textContent = `Code valid, but order must be $${FREE_SHIPPING_THRESHOLD.toFixed(2)} or more for free shipping.`;
            messageEl.style.color = '#e67e22';
        }
    } else if (code === '') {
        appliedDiscount = false;
        messageEl.textContent = '';
    } else {
        appliedDiscount = false;
        messageEl.textContent = 'Invalid discount code.';
        messageEl.style.color = '#e74c3c';
    }
    
    calculateTotals();
}

// Show success popup
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.id = 'successPopup';
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    popup.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; max-width: 400px; margin: 20px;">
            <h2 style="color: #27ae60; margin-bottom: 1rem;">Congrats on the order!</h2>
            <p style="margin-bottom: 1.5rem;">Your order has been placed successfully.</p>
            <button onclick="window.location.href='index.html'" style="
                padding: 12px 30px;
                background: #2c3e50;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 1rem;
                cursor: pointer;
                font-weight: bold;
            ">Go to Home Page</button>
        </div>
    `;
    
    document.body.appendChild(popup);
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    calculateTotals();
    
    // Apply discount button
    document.getElementById('applyDiscount').addEventListener('click', applyDiscount);
    
    // Discount code input - apply on Enter key
    document.getElementById('discountCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyDiscount();
        }
    });
    
    // Checkout form submission
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cart = getCart();
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Clear cart and show success popup
        clearCart();
        showSuccessPopup();
    });
});

