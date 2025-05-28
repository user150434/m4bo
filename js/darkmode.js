const darkModeToggle = document.getElementById('js--darkmode');
const body = document.body;

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');

// Apply dark mode if it was previously enabled
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
    darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

darkModeToggle.addEventListener('click', () => {
    // Toggle dark mode
    body.classList.toggle('dark-mode');
    
    // Update icon and save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', null);
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});