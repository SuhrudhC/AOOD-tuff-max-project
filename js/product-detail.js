const products = {
    'aj-huelskamp': { name: 'AJ Huelskamp, 2.4 oz', price: 659.99, image: 'images/fragrance1.jpg', bottleType: 'bottle-mfk', desc: 'A sophisticated fragrance with notes of luxury and elegance.' },
    'shujia-zhang': { name: 'Shujia Zhang, 2.4 oz', price: 24.99, image: 'images/Screenshot 2025-12-08 at 2.15.41 PM.png', bottleType: 'bottle-silver', desc: 'A fresh and vibrant scent that captures modern elegance.' },
    'gabriel-summerfield': { name: 'Gabriel Summerfield, 2.4 oz', price: 790.00, image: 'images/Screenshot 2025-12-08 at 2.15.19 PM.png', bottleType: 'bottle-mfk', desc: 'An exquisite fragrance that embodies sophistication.' },
    'sid-thomas': { name: 'Sid Thomas, 2.4 oz', price: 459.99, image: 'images/Screenshot 2025-12-08 at 2.14.52 PM.png', bottleType: 'bottle-satin', desc: 'A bold and distinctive scent that makes a statement.' },
    'jackson-easley': { name: 'Jackson Easley, 2.4 oz', price: 209.99, image: 'images/Screenshot 2025-12-08 at 2.32.31 PM.png', bottleType: 'bottle-gold', desc: 'A balanced fragrance combining freshness with depth.' },
    'aykhan-salimov': { name: 'Aykhan Salimov, 2.4 oz', price: 289.99, image: 'images/Screenshot 2025-12-08 at 9.35.41 PM.png', bottleType: 'bottle-grand', desc: 'An aromatic blend that evokes warmth and comfort.' },
    'yiannis-docuto': { name: 'Yiannis Docuto, 2.4 oz', price: 129.99, image: 'images/Screenshot 2025-12-08 at 9.35.56 PM.png', bottleType: 'bottle-gold', desc: 'A crisp and refreshing fragrance capturing nature.' },
    'ferda-signature': { name: 'Ferda Signature, 2.4 oz', price: 59.99, image: 'images/fragrance8.jpg', bottleType: 'bottle-silver', desc: 'The signature scent that defines the Ferda collection.' },
    'ferda-supreme': { name: 'Ferda Supreme, 2.4 oz', price: 9.99, image: 'images/fragrance9.jpg', bottleType: 'bottle-silver', desc: 'A premium fragrance at an unbeatable price.' },
    'ferda-ultimate': { name: 'Ferda Ultimate, 2.4 oz', price: 9.99, image: 'images/fragrance10.jpg', bottleType: 'bottle-silver', desc: 'The ultimate expression of the Ferda brand.' },
    'ferda-max': { name: 'Ferda Max, 2.4 oz', price: 9.99, image: 'images/fragrance11.jpg', bottleType: 'bottle-silver', desc: 'Maximum impact, maximum style.' },
    'ferda-godly': { name: 'Ferda Godly, 2.4 oz', price: 9.99, image: 'images/fragrance12.jpg', bottleType: 'bottle-silver', desc: 'A divine fragrance that transcends the ordinary.' }
};

const productId = new URLSearchParams(window.location.search).get('id') || 'aj-huelskamp';
const product = products[productId];

if (product) {
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = '$' + product.price.toFixed(2);
    document.getElementById('productDescription').textContent = product.desc;
    document.getElementById('productMainImage').src = product.image;
    document.getElementById('bottleContainer').className = 'bottle-container-detail ' + product.bottleType;
}

document.getElementById('addToCart').addEventListener('click', () => {
    alert('Added to cart!');
});
