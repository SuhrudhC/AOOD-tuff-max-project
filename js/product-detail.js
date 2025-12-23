const products = {
    'aj-huelskamp':      { name: 'AJ Huelskamp, 2.4 oz',      price: 659.99, image: 'images/fragrance1.jpg',                             bottleType: 'bottle-mfk',   brand: 'Ferda Fragrances', desc: 'The top echelon of ferda. Notes of vodka and lemons.' },
    'shujia-zhang':      { name: 'Shujia Zhang, 2.4 oz',      price: 24.99,  image: 'images/Screenshot 2025-12-08 at 2.15.41 PM.png',    bottleType: 'bottle-silver', brand: 'Ferda Fragrances', desc: 'A fresh and vibrant scent that captures modern elegance.' },
    'gabriel-summerfield': { name: 'Gabriel Summerfield, 2.4 oz', price: 790.00, image: 'images/Screenshot 2025-12-08 at 2.15.19 PM.png', bottleType: 'bottle-mfk',   brand: 'Ferda Fragrances', desc: 'An exquisite fragrance that embodies sophistication.' },
    'sid-thomas':        { name: 'Sid Thomas, 2.4 oz',        price: 459.99, image: 'images/Screenshot 2025-12-08 at 2.14.52 PM.png',    bottleType: 'bottle-satin',  brand: 'Ferda Fragrances', desc: 'A bold and distinctive scent that makes a statement.' },
    'jackson-easley':    { name: 'Jackson Easley, 2.4 oz',    price: 209.99, image: 'images/Screenshot 2025-12-08 at 2.32.31 PM.png',    bottleType: 'bottle-gold',   brand: 'Ferda Fragrances', desc: 'A balanced fragrance combining freshness with depth.' },
    'aykhan-salimov':    { name: 'Aykhan Salimov, 2.4 oz',    price: 289.99, image: 'images/Screenshot 2025-12-08 at 9.35.41 PM.png',    bottleType: 'bottle-grand',  brand: 'Ferda Fragrances', desc: 'An aromatic blend that evokes warmth and comfort.' },
    'yiannis-docuto':    { name: 'Yiannis Docuto, 2.4 oz',    price: 129.99, image: 'images/Screenshot 2025-12-08 at 9.35.56 PM.png',    bottleType: 'bottle-gold',   brand: 'Ferda Fragrances', desc: 'A crisp and refreshing fragrance capturing nature.' },
    'mason-mosher':   { name: 'Mason Mosher, 2.4 oz',   price: 39.99,  image: 'images/Screenshot 2025-12-22 at 8.41.26 PM.png',                            bottleType: 'bottle-silver', brand: 'Ferda Fragrances', desc: 'The essence of korean aura.' },
    'michael-jiang':   { name: 'Michael Jiang, 2.4 oz',   price: 309.99,  image: 'images/Screenshot 2025-12-22 at 8.40.55 PM.png',                            bottleType: 'bottle-grand', brand: 'Ferda Fragrances', desc: 'Gilman Volleyball.' },
    'yash-patel':   { name: 'Yash Patel, 2.4 oz',   price: 629.99,  image: 'images/Screenshot 2025-12-22 at 8.40.26 PM.png',                            bottleType: 'bottle-mfk', brand: 'Ferda Fragrances', desc: 'Be the man who defines the functions.' },
    'matthew-jensen':   { name: 'Matthew Jensen, 2.4 oz',   price: 609.99,  image: 'images/Screenshot 2025-12-22 at 8.40.16 PM.png',                            bottleType: 'bottle-mfk', brand: 'Ferda Fragrances', desc: 'FERDA at birth.' },
    'haroon-mustafa':   { name: 'Haroon Mustafa, 2.4 oz',   price: 279.99,  image: 'images/Screenshot 2025-12-22 at 8.39.47 PM.png',                            bottleType: 'bottle-grand', brand: 'Ferda Fragrances', desc: 'Potential to be the best.' },
};

const productId = new URLSearchParams(window.location.search).get('id') || 'aj-huelskamp';
const product = products[productId];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    if (product) {
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productPrice').textContent = '$' + product.price.toFixed(2);
        document.getElementById('productDescription').textContent = product.desc;
        document.getElementById('brandNote').textContent = `${product.brand} – Tax Max Fragrances is not affiliated with the original brand.`;
        
        const productImage = document.getElementById('productMainImage');
        // Set image - paths are already URL-encoded in product data
        productImage.setAttribute('src', product.image);
        // Add product-specific class for individual styling
        productImage.classList.add('product-' + productId);
        
        document.getElementById('bottleContainer').className = 'bottle-container-detail ' + product.bottleType;
    } else {
        console.error('Product not found:', productId);
        document.getElementById('productTitle').textContent = 'Product Not Found';
        const addToCartBtn = document.getElementById('addToCart');
        if (addToCartBtn) {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Product Not Available';
        }
    }

    const addToCartBtn = document.getElementById('addToCart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Check if cart functions are available
            if (typeof addToCart !== 'function') {
                console.error('addToCart function not available');
                alert('Error: Cart system not loaded. Please refresh the page.');
                return;
            }
            
            // Check if product exists
            if (!product) {
                console.error('Product not found:', productId);
                alert('Error: Product not found. Please try again.');
                return;
            }
            
            // Add to cart
            try {
                addToCart(productId, product.name, product.price, product.image);
                alert('Added to cart!');
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Error adding to cart. Please try again.');
            }
        });
    }
});
