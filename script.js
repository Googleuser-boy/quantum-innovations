// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons on page load
    lucide.createIcons();

    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const navLinksContainer = document.getElementById('navbarNav'); // The div containing nav links
    const navItems = document.querySelectorAll('.nav-item');
    const menuToggle = document.getElementById('menuToggle');
    const signInBtn = document.getElementById('signInBtn');
    const contactForm = document.getElementById('contactForm');
    const currentYearSpan = document.getElementById('currentYear');

    // --- Set Current Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Dark Mode Toggle Logic ---
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');

        // Optional: Save user preference to localStorage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        // Re-create Lucide icons to ensure their stroke/fill updates correctly
        lucide.createIcons();
    });

    // Check for saved theme preference on initial load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        // Ensure light-theme is applied if no preference or 'light' is saved
        body.classList.add('light-theme');
    }
    // Initial creation of icons based on loaded theme
    lucide.createIcons();


    // --- Smooth Scrolling for Navigation ---
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump

            const targetId = item.getAttribute('href'); // Get the target section ID (e.g., "#home")
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link (if open)
                if (window.innerWidth < 768 && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // --- Sign In Button Action (Example) ---
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            // In a real application, this would typically open a modal login form
            // or redirect to an authentication page.
            alert('Sign In functionality coming soon! This would usually lead to a login/signup process.');
        });
    }

    // --- Contact Form Submission Handler (Example) ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would collect form data and send it to a backend server
            // For now, we'll simulate a successful submission.
            alert('Your message has been sent successfully! We will get back to you soon.');

            // Clear the form after submission
            contactForm.reset();
        });
    }

    // --- Dynamic Active Nav Item on Scroll ---
    const sections = document.querySelectorAll('main section'); // Target all main content sections
    const headerHeight = document.querySelector('.main-header').offsetHeight; // Get header height for offset

    const options = {
        root: null, // Use the viewport as the root
        rootMargin: `-${headerHeight}px 0px -50% 0px`, // Adjust threshold based on header height, and make sections active when more visible
        threshold: 0 // As soon as any part of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all nav items
                navItems.forEach(item => item.classList.remove('active'));

                // Add 'active' class to the corresponding nav item
                const activeId = entry.target.id;
                const correspondingNavItem = document.querySelector(`.nav-item[data-section="${activeId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    }, options);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
});
