// Toggle button
const toggleButton = document.getElementById('theme-toggle');

// Apply Theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Check and apply the saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Event listener for the toggle button
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Save the current theme to localStorage
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});
