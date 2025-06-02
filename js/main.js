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
        30,
        "imgs/tas2.webp",
        "Patroon design tas",
        false
    ],
    [
        "witte tas",
        30,
        "imgs/tas3.jpg",
        "Stijlvolle witte tas",
        true
    ]
];

// Navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    const shopNowButton = document.getElementById('js--shopnow');
    const banner = document.querySelector('.banner__content__img');
    const bannerText = document.querySelector('.banner__content__text');

    if (shopNowButton) {
        shopNowButton.addEventListener('click', () => {
            window.location.href = 'product-overzicht.html';
        });
    }

    if (banner) {
        banner.addEventListener('click', () => {
            window.location.href = 'product-overzicht.html';
        });
    }

    if (bannerText) {
        bannerText.addEventListener('click', () => {
            window.location.href = 'product-overzicht.html';
        });
    }
});

// Products code (only execute if product container exists)
const productContainer = document.querySelector('.product-container');
if (productContainer) {
    productContainer.innerHTML = ""; // Clear container

    products.forEach(product => {
        const [naam, prijs, afbeelding, beschrijving, beschikbaar] = product;
        let cardHTML = `
            <div class="${beschikbaar ? 'product' : 'product-outofstock'}">
                <img src="${afbeelding}" alt="" class="product__img">
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

    // Cart functionality
    const badge = document.getElementById('js--cart-badge');
    const addButtons = document.querySelectorAll('.product__button');
    const removeBtn = document.getElementById('js--cart-badge__verwijder');
    let cartCount = 0;

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

    if (removeBtn) {
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
}

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





