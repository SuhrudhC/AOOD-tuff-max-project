// Get elements
const priceFilter = document.getElementById('priceFilter');
const brandFilter = document.getElementById('brandFilter');
const sortFilter = document.getElementById('sortFilter');
const productCount = document.getElementById('productCount');
const productsGrid = document.querySelector('.products-grid');
const allProducts = document.querySelectorAll('.product-card');

function getPriceRange(price) {
    const numPrice = parseFloat(price);
    if (numPrice <= 100) return '0-100';
    if (numPrice <= 250) return '101-250';
    if (numPrice <= 400) return '251-400';
    if (numPrice <= 600) return '401-600';
    return '600+';
}

function updateProducts() {
    const selectedPrice = priceFilter.value;
    const selectedBrand = brandFilter.value;
    const visibleProducts = [];
    
    // Filter products
    allProducts.forEach(product => {
        const productPrice = parseFloat(product.getAttribute('data-price'));
        const productBrand = product.getAttribute('data-brand');
        const productPriceRange = getPriceRange(productPrice);
        
        let showProduct = true;
        
        // Price filter
        if (selectedPrice !== 'all' && productPriceRange !== selectedPrice) {
            showProduct = false;
        }
        
        // Brand filter
        if (selectedBrand !== 'all' && productBrand !== selectedBrand) {
            showProduct = false;
        }
        
        if (showProduct) {
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
    } else if (sortFilter.value === 'name-asc') {
        visibleProducts.sort((a, b) => {
            const nameA = a.querySelector('h3').textContent.trim();
            const nameB = b.querySelector('h3').textContent.trim();
            return nameA.localeCompare(nameB);
        });
    } else if (sortFilter.value === 'name-desc') {
        visibleProducts.sort((a, b) => {
            const nameA = a.querySelector('h3').textContent.trim();
            const nameB = b.querySelector('h3').textContent.trim();
            return nameB.localeCompare(nameA);
        });
    }
    
    // Reorder products in DOM
    visibleProducts.forEach(product => {
        productsGrid.appendChild(product);
    });
    
    // Update count
    productCount.textContent = visibleProducts.length + ' product' + (visibleProducts.length !== 1 ? 's' : '');
}

// Add event listeners
priceFilter.addEventListener('change', updateProducts);
brandFilter.addEventListener('change', updateProducts);
sortFilter.addEventListener('change', updateProducts);
updateProducts();

