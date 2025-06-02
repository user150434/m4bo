removeBtn.addEventListener('click', () => {
    if (cartCount > 0) {
        cartCount--;
        badge.textContent = cartCount;
        if (cartCount === 0) {
            badge.style.display = 'none';
            removeBtn.style.display = 'none'; // Hide delete button
        }
    }
});