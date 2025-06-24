document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeItem(${index})">Verwijderen</button>
                </div>
            `;
            cartItems.innerHTML += cartItemHTML;
        });
        
        cartTotalPrice.textContent = `€${total.toFixed(2)}`;
        updateCartBadge();
    }
    
    function updateCartBadge() {
        const badge = document.getElementById('js--cart-badge');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    window.updateQuantity = function(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart[index].quantity = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };
    
    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };
    
    updateCartDisplay();
});