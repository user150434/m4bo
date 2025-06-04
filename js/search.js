document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('js--search');
    const productContainer = document.querySelector('.product-container__overzicht');

    function searchProducts(query) {
        const products = document.querySelectorAll('.product, .product-outofstock');
        
        products.forEach(product => {
            const name = product.querySelector('.product__productname').textContent.toLowerCase();
            const description = product.querySelector('.product__beschrijving').textContent.toLowerCase();
            const price = product.querySelector('.product__price').textContent.toLowerCase();
            
            const matches = name.includes(query) || 
                          description.includes(query) || 
                          price.includes(query);
            
            product.style.display = matches ? 'flex' : 'none';
        });
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchProducts(query);
    });
});