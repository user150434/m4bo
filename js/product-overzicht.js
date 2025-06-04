document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container__overzicht');
    const priceFilters = document.querySelectorAll('[data-price]');
    const availabilityFilters = document.querySelectorAll('[data-available]');
    const resetButton = document.getElementById('js--reset-filters');

    function filterProducts() {
        const selectedPrices = Array.from(priceFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.price);

        const selectedAvailability = Array.from(availabilityFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.available);

        const products = document.querySelectorAll('.product, .product-outofstock');
        
        products.forEach(product => {
            const price = parseFloat(product.querySelector('.product__price').textContent.replace('$', ''));
            const isAvailable = !product.classList.contains('product-outofstock');

            const inPriceRange = selectedPrices.length === 0 || selectedPrices.some(range => {
                const [min, max] = range.split('-').map(Number);
                return price >= min && price <= max;
            });

            const matchesAvailability = selectedAvailability.length === 0 || 
                selectedAvailability.includes(String(isAvailable));

            product.style.display = (inPriceRange && matchesAvailability) ? 'flex' : 'none';
        });
    }

    // Add event listeners to filters
    priceFilters.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
    availabilityFilters.forEach(checkbox => checkbox.addEventListener('change', filterProducts));

    // Reset filters
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            priceFilters.forEach(checkbox => checkbox.checked = false);
            availabilityFilters.forEach(checkbox => checkbox.checked = false);
            filterProducts();
        });
    }
});

