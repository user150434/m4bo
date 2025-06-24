const products = [
    [
        "bruine tas",         
        30,                     
        "imgs/tas1.jpg",        
        "Mooie bruine tas",     
        true                    
    ],
    [
        "patrone tas",
        39.99,
        "imgs/tas2.webp",
        "Patroon design tas",
        true
    ],
    [
        "witte tas",
        50,
        "imgs/tas3.jpg",
        "Stijlvolle witte tas",
        true
    ],
    [
        "zwarte tas",
        59.99,
        "imgs/tas4.webp",
        "Zwarte tas met stijl",
        true
    ],
    [
        "zwarte tas",
        70,
        "imgs/tas5.webp",
        "Zwarte tas met stijl",
        false
    ],
    [
        "zwarte tas",
        79.99,
        "imgs/tas6.webp",
        "Zwarte tas met stijl",
        true
    ],
    [
        "zwarte tas",
        89.99,
        "imgs/tas7.webp",
        "Zwarte tas met stijl",
        true
    ],
    [
        "zwarte tas",
        99.99,
        "imgs/tas8.webp",
        "Zwarte tas met stijl",
        true
    ],
    [
        "zwarte tas",
        10,
        "imgs/tas9.webp",
        "Zwarte tas met stijl",
        true
    ]

];



// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container__overzicht');
    if (productContainer) {
        productContainer.innerHTML = "";

        products.forEach(product => {
            const [naam, prijs, afbeelding, beschrijving, beschikbaar] = product;
            let cardHTML = `
                <div class="${beschikbaar ? 'product' : 'product-outofstock'}" 
                     data-price="${prijs}" 
                     data-available="${beschikbaar}">
                    <img src="${afbeelding}" alt="${naam}" class="product__img">
                    <h2 class="product__price">$${prijs}</h2>
                    <p class="product__productname">${naam}</p>
                    <p class="product__beschrijving">${beschrijving}</p>
                    <p class="product__rating">★★★★</p>
                    ${
                        beschikbaar
                        ? `<button class="product__button">add</button>`
                        : `<button class="product-outofstock__button" disabled>out of stock</button>`
                    }
                </div>
            `;
            productContainer.innerHTML += cardHTML;
        });
    }

    // Navigation event listeners
    const shopNowButton = document.getElementById('js--shopnow');
    const banner = document.querySelector('.banner__content__img');
    const bannerText = document.querySelector('.banner__content__text');

    if (shopNowButton) {
        shopNowButton.addEventListener('click', () => {
            window.location.href = './product-overzicht.html';
        });
    }

    if (banner) {
        banner.addEventListener('click', () => {
            window.location.href = './product-overzicht.html';
        });
    }

    if (bannerText) {
        bannerText.addEventListener('click', () => {
            window.location.href = './product-overzicht.html';
        });
    }

    // Cart functionality
    const badge = document.getElementById('js--cart-badge');
    const addButtons = document.querySelectorAll('.product__button');
    const removeBtn = document.getElementById('js--cart-badge__verwijder');
    let cartCount = 0;

    if (badge && removeBtn) {
        if (addButtons) {
            addButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    cartCount++;
                    badge.textContent = cartCount;
                    badge.style.display = 'flex';
                    removeBtn.style.display = 'inline-block';
                });
            });
        }

        removeBtn.addEventListener('click', () => {
            if (cartCount > 0) {
                cartCount--;
                badge.textContent = cartCount;
                if (cartCount === 0) {
                    badge.style.display = 'none';
                    removeBtn.style.display = 'none';
                }
            }
        });
    }

    document.querySelectorAll('.product__button').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const productData = {
                name: product.querySelector('.product__productname').textContent,
                price: parseFloat(product.querySelector('.product__price').textContent.replace('$', '')),
                image: product.querySelector('.product__img').src,
                quantity: 1
            };
            
            // Get existing cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if product already exists in cart
            const existingProduct = cart.find(item => item.name === productData.name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(productData);
            }
            
            // Save cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart badge
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        });
    });
});


/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}



// filter functionality
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
            const price = parseFloat(product.dataset.price);
            const isAvailable = product.dataset.available === 'true';

            const inPriceRange = selectedPrices.length === 0 || selectedPrices.some(range => {
                const [min, max] = range.split('-').map(Number);
                return price >= min && price <= max;
            });

            const matchesAvailability = selectedAvailability.length === 0 || 
                selectedAvailability.includes(String(isAvailable));

            product.style.display = (inPriceRange && matchesAvailability) ? 'flex' : 'none';
        });
    }

    priceFilters.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
    availabilityFilters.forEach(checkbox => checkbox.addEventListener('change', filterProducts));

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            priceFilters.forEach(checkbox => checkbox.checked = false);
            availabilityFilters.forEach(checkbox => checkbox.checked = false);
            filterProducts();
        });
    }
});






