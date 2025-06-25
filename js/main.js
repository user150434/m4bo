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
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const existingProduct = cart.find(item => item.name === productData.name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(productData);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
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
    // BEGINNER FRIENDLY FILTERS
    const priceCheckboxes = document.querySelectorAll('.js--filter-price');
    const availabilityCheckboxes = document.querySelectorAll('.js--filter-availability');
    const resetButton = document.getElementById('js--reset-filters');

    function filterProducts() {
        // Get all checked price ranges
        const selectedPriceRanges = Array.from(priceCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Get all checked availability values
        const selectedAvailability = Array.from(availabilityCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Loop through all products
        document.querySelectorAll('.product, .product-outofstock').forEach(product => {
            const price = parseFloat(product.getAttribute('data-price'));
            const available = product.getAttribute('data-available');

            // Check price
            let priceMatch = selectedPriceRanges.length === 0;
            for (const range of selectedPriceRanges) {
                const [min, max] = range.split('-').map(Number);
                if (price >= min && price <= max) priceMatch = true;
            }

            // Check availability
            let availabilityMatch = selectedAvailability.length === 0 || selectedAvailability.includes(available);

            // Show or hide product
            product.style.display = (priceMatch && availabilityMatch) ? 'flex' : 'none';
        });
    }

    // Add event listeners
    priceCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    availabilityCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            priceCheckboxes.forEach(cb => cb.checked = false);
            availabilityCheckboxes.forEach(cb => cb.checked = false);
            filterProducts();
        });
    };






