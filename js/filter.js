// Get elements
const levelFilter = document.getElementById('ferdaLevelFilter');
const sortFilter = document.getElementById('sortFilter');
const productCount = document.getElementById('productCount');
const productsGrid = document.querySelector('.products-grid');
const allProducts = document.querySelectorAll('.product-card');

function updateProducts() {
    const selectedLevel = levelFilter.value;
    const visibleProducts = [];
    
    // Filter products
    allProducts.forEach(product => {
        const productLevel = product.getAttribute('data-level');
        
        if (selectedLevel === 'all' || productLevel === selectedLevel) {
            product.classList.remove('hidden');
            visibleProducts.push(product);
        } else {
            product.classList.add('hidden');
        }
    });
    
    // Sort visible products
    if (sortFilter.value === 'price-low') {
        visibleProducts.sort((a, b) => {
            return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
        });
    } else if (sortFilter.value === 'price-high') {
        visibleProducts.sort((a, b) => {
            return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
        });
    }
    
    visibleProducts.forEach(product => {
        productsGrid.appendChild(product);
    });
    
    // Update count
    productCount.textContent = visibleProducts.length + ' product' + (visibleProducts.length !== 1 ? 's' : '');
}

// Add event listeners
levelFilter.addEventListener('change', updateProducts);
sortFilter.addEventListener('change', updateProducts);
updateProducts();
