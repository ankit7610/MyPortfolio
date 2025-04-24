// --- Navigation Toggle ---
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navLinksA = document.querySelectorAll('.nav-links a');

function toggleNavbar() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Hamburger click listener
hamburger.addEventListener('click', toggleNavbar);

// Close nav when a link is clicked
navLinksA.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) { // Only run if nav is open
             navLinks.classList.remove('active');
             hamburger.classList.remove('active');
        }
    });
});

// Close nav when clicking outside
document.addEventListener('click', (event) => {
    // Check if nav is active and the click is outside both the nav and the hamburger
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(event.target) &&
        event.target !== hamburger &&
        !hamburger.contains(event.target)) {
        toggleNavbar();
    }
});


// --- Scroll Effects ---
const scrollToTop = document.getElementById('scroll-to-top');
const navbar = document.getElementById('navbar'); // Get navbar element
const scrollThresholdNavbar = 50; // Pixels to scroll before changing navbar style
const scrollThresholdTopButton = 100; // Pixels for scroll-to-top button

window.addEventListener('scroll', () => {
    // Scroll-to-top button visibility
    if (window.scrollY > scrollThresholdTopButton) {
        scrollToTop.classList.add('active');
    } else {
        scrollToTop.classList.remove('active');
    }

    // ADDED: Navbar style change on scroll
    if (window.scrollY > scrollThresholdNavbar) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll-to-top button click listener
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// --- Typing Animation for Hero Section ---
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-animation');
    // Make sure the element exists before trying to use it
    if (typingElement) {
        const text = "Hello, I'm Ankit Kaushik";
        let displayedText = "";
        let isTyping = true;
        let index = 0;
        let timeoutId; // To clear timeout on component unmount (if needed in frameworks)

        function step() {
            // Clear previous timeout if any
            clearTimeout(timeoutId);

            if (isTyping) {
                if (index < text.length) {
                    displayedText += text[index];
                    index++;
                    typingElement.textContent = displayedText;
                    timeoutId = setTimeout(step, 100); // Typing speed
                } else {
                    // Pause at the end
                    timeoutId = setTimeout(() => {
                        isTyping = false;
                        step();
                    }, 2000); // Pause duration before deleting
                }
            } else {
                if (index > 0) {
                    displayedText = displayedText.slice(0, -1);
                    index--;
                    typingElement.textContent = displayedText;
                    timeoutId = setTimeout(step, 60); // Deleting speed
                } else {
                    // Pause when empty
                    timeoutId = setTimeout(() => {
                        isTyping = true;
                        step();
                    }, 500); // Pause duration before re-typing
                }
            }
        }
        // Start the animation
        step();
    } else {
        console.warn("Typing animation element (.typing-animation) not found.");
    }
});


// --- Section Animation on Scroll ---
const sections = document.querySelectorAll('.section-animate');

// Check if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => { // Pass observerInstance
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target); // Optional: Stop observing once visible
            }
        });
    }, {
        threshold: 0.15 // Slightly later trigger point
    });

    sections.forEach(section => {
        observer.observe(section);
    });
} else {
    // Fallback for older browsers: make all sections visible immediately
    console.warn("IntersectionObserver not supported. Showing all animated sections.");
    sections.forEach(section => {
        section.classList.add('visible');
    });
}