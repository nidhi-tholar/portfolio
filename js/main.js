/* Toggle Theme */

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

/* navlinks and scroll */

const content = document.querySelector('.content');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelector('.nav-links');
const navLinksLinks = document.querySelectorAll('.nav-links a');

// Function to add 'scrolled' class when the content is scrolled
let isScrolling;
function handleScroll() {
    // Clear the previous timeout if another scroll event occurs
    window.clearTimeout(isScrolling);

    // Add 'scrolled' class when the user scrolls down
    if (content.scrollTop > 50) {
        navLinks.classList.add('scrolled');
    } else {
        navLinks.classList.remove('scrolled');
    }

    // Set a timeout to remove 'scrolled' class after scrolling ends
    isScrolling = setTimeout(() => {
        navLinks.classList.remove('scrolled');
    }, 100); // Delay before removing the 'scrolled' class after scrolling stops
}

// Listen for scroll events on the .content container
content.addEventListener('scroll', handleScroll);

// Add active class to the clicked nav link
navLinksLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all links
        navLinksLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the clicked link
        link.classList.add('active');
    });
});

/* IntersectionObserver for active link when section is in view */

// Set up the IntersectionObserver
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        // If the section is fully in view (threshold set to 1), add 'active' class to the link
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
            navLinksLinks.forEach(link => link.classList.remove('active')); // Remove 'active' from all links
            navLink.classList.add('active'); // Add 'active' to the current link
        }
    });
}, {
    threshold: 1.0, // Ensure the entire section is in the viewport (100%)
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});
