// --- Initialization ---
    document.addEventListener('DOMContentLoaded', function() {

        // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Initialize Preloader Hiding
        window.addEventListener('load', function() {
            setTimeout(function() {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(function() {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 1000); // Adjust delay as needed
        });

        // Initialize Particles.js for About Page Background
        if (document.getElementById('particles-js')) {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#00b4db" },
                    shape: { type: "circle", stroke: { width: 0, color: "#000000" }, },
                    opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                    size: { value: 3, random: true, },
                    line_linked: { enable: true, distance: 150, color: "#00b4db", opacity: 0.2, width: 1 },
                    move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
                    modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
                },
                retina_detect: true
            });
        }

        // Initialize Particles.js for Footer Background (with interactivity)
        if (document.getElementById('footer-particles-js')) {
             particlesJS('footer-particles-js', {
                 "particles": {
                    "number": { "value": 40, "density": { "enable": true, "value_area": 800 } }, // Slightly more for interactivity
                    "color": { "value": "#0083b0" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.4, "random": true },
                    "size": { "value": 2.5, "random": true }, // Slightly larger for grabbing
                    "line_linked": { "enable": true, "distance": 120, "color": "#0083b0", "opacity": 0.3, "width": 1 },
                    "move": { "enable": true, "speed": 1.8, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
                 },
                 "interactivity": {
                     "detect_on": "canvas",
                     "events": {
                         "onhover": { "enable": true, "mode": "grab" }, // Re-enabled grab
                         "onclick": { "enable": true, "mode": "push" }, // Re-enabled push
                         "resize": true
                     },
                     "modes": {
                         "grab": { "distance": 130, "line_linked": { "opacity": 0.7 } }, // Adjusted grab distance/opacity
                         "push": { "particles_nb": 3 }, // Adjusted push amount
                         "repulse": { "distance": 100, "duration": 0.4 }, // Keep repulse mode available if needed later
                         "bubble": { "distance": 200, "size": 20, "duration": 2, "opacity": 8, "speed": 3 } // Keep bubble mode available
                     }
                 },
                 "retina_detect": true
             });
        }

        // Initialize Vanilla Tilt for 3D hover effect on logo
        const tiltElement = document.querySelector("#tilt");
        if (tiltElement && typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(tiltElement, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
            });
        }

        // --- Navbar Functionality ---
        const menuBtn = document.getElementById("nav-menuBtn");
        const hamburger = document.getElementById("nav-hamburger");
        const navLinks = document.getElementById("nav-navLinks");
        const overlay = document.getElementById("nav-overlay");
        const navbarContainer = document.getElementById("nav-navbarContainer");
        const navItems = document.querySelectorAll(".nav-links a");

        if (menuBtn && hamburger && navLinks && overlay && navbarContainer) {
            // Hamburger menu toggle
            menuBtn.addEventListener("click", function () {
                navLinks.classList.toggle("active");
                hamburger.classList.toggle("open");
                overlay.classList.toggle("active");
                document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
            });

            // Close menu when clicking overlay
            overlay.addEventListener("click", function () {
                closeMobileMenu();
            });

            // Close menu when clicking on a link
            navItems.forEach(item => {
                item.addEventListener("click", function() {
                    closeMobileMenu();
                });
            });

            function closeMobileMenu() {
                 navLinks.classList.remove("active");
                 hamburger.classList.remove("open");
                 overlay.classList.remove("active");
                 document.body.style.overflow = "";
            }

            // Active link highlighting based on current page filename
             const currentPage = window.location.pathname.split('/').pop(); // Gets 'About.html', 'index.html', etc.
             navItems.forEach(item => {
                 const itemPage = item.getAttribute('href').split('/').pop();
                 if (currentPage === itemPage || (currentPage === '' && itemPage === 'index.html')) {
                     item.classList.add('active');
                 } else {
                     item.classList.remove('active');
                 }
             });

            // Scroll event for sticky navbar
            window.addEventListener("scroll", function() {
                if (window.scrollY > 50) { // Adjust scroll distance if needed
                    navbarContainer.classList.add("scrolled");
                } else {
                    navbarContainer.classList.remove("scrolled");
                }
            });

        } else {
            console.warn("Navbar elements not found. Navbar functionality might be limited.");
        }


        // --- Stats Counter Animation ---
        const stats = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.stats-section');
        let animationStarted = false;

        function animateStats() {
            if (!statsSection || animationStarted) return;

            const sectionPosition = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (sectionPosition < screenPosition) {
                animationStarted = true;

                stats.forEach(stat => {
                    const targetValue = parseInt(stat.getAttribute('data-count'));
                    if (isNaN(targetValue)) return; // Skip if data-count is not a number

                    let currentValue = 0;
                    const duration = 2000; // 2 seconds
                    const frameDuration = 16; // Approx 60fps
                    const totalFrames = duration / frameDuration;
                    const increment = targetValue / totalFrames;

                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            stat.textContent = targetValue + (targetValue >= 10 ? "+" : ""); // Add + if >= 10
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(currentValue);
                        }
                    }, frameDuration);
                });
            }
        }
        window.addEventListener('scroll', animateStats);
        animateStats(); // Check on load as well


        // --- Testimonials Carousel ---
        const track = document.querySelector('.testimonial-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        let currentIndex = 0;
        let testimonialInterval;

        function updateCarousel() {
            if (!track || slides.length === 0) return;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, index) => {
                if (dot) dot.classList.toggle('active', index === currentIndex);
            });
        }

        function startTestimonialAutoplay() {
             stopTestimonialAutoplay(); // Clear existing interval first
             testimonialInterval = setInterval(() => {
                 currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                 updateCarousel();
             }, 5000); // Auto slide every 5 seconds
        }

        function stopTestimonialAutoplay() {
             clearInterval(testimonialInterval);
        }

        if (track && slides.length > 0) {
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
                    updateCarousel();
                    resetTestimonialAutoplay();
                });
            }
            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                    updateCarousel();
                    resetTestimonialAutoplay();
                });
            }
            dots.forEach((dot, index) => {
                if (dot) {
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                        resetTestimonialAutoplay();
                    });
                }
            });

            // Initialize carousel state and start autoplay
             updateCarousel();
             startTestimonialAutoplay();

            // Pause on hover
            const carousel = document.querySelector('.testimonial-carousel');
            if (carousel) {
                 carousel.addEventListener('mouseenter', stopTestimonialAutoplay);
                 carousel.addEventListener('mouseleave', startTestimonialAutoplay);
            }
        }

        function resetTestimonialAutoplay() {
             stopTestimonialAutoplay();
             startTestimonialAutoplay();
        }

        // --- Accordion Functionality ---
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all other items first
                    accordionItems.forEach(otherItem => {
                         if (otherItem !== item) {
                             otherItem.classList.remove('active');
                         }
                    });

                    // Toggle the clicked item
                    item.classList.toggle('active');
                });
            }
        });


        // --- Theme Toggle (Dark/Light Mode) ---
        const themeToggle = document.getElementById('themeToggle');
        const rootElement = document.documentElement; // Target <html> for class toggle
        let isDarkMode = !rootElement.classList.contains('light'); // Check initial state

        function applyTheme() {
            rootElement.classList.toggle('light', !isDarkMode);
            if (themeToggle) {
                themeToggle.classList.toggle('light', !isDarkMode); // Sync button appearance
            }
        }

        // Set initial state based on preference or default
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // Uncomment below to respect OS preference initially
        // isDarkMode = localStorage.getItem('theme') ? localStorage.getItem('theme') === 'dark' : prefersDark;
        applyTheme(); // Apply initial theme

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                isDarkMode = !isDarkMode;
                applyTheme();
                // localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Optional: Persist choice
            });
        }

        // --- Floating Action Button (FAB) Functionality ---
        const fab = document.getElementById('fab');
        if (fab) {
            fab.addEventListener('click', function() {
                 const fabBgColor = getComputedStyle(rootElement).getPropertyValue('--card-background').includes('rgba')
                               ? (isDarkMode ? '#1a1a1a' : '#ffffff') // Use solid if card bg is transparent
                               : getComputedStyle(rootElement).getPropertyValue('--card-background');
                 const fabTextColor = getComputedStyle(rootElement).getPropertyValue('--text-primary');
                 const fabPrimaryColor = getComputedStyle(rootElement).getPropertyValue('--primary-color');
                 const fabSecondaryColor = getComputedStyle(rootElement).getPropertyValue('--secondary-color');

                Swal.fire({
                    title: 'Quick Actions',
                    html: `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: center;">
                            <button id="contactBtn" class="swal-button">Contact Us</button>
                            <button id="joinBtn" class="swal-button">Join Club</button>
                            <button id="projectsBtn" class="swal-button">Our Projects</button>
                            <button id="eventsBtn" class="swal-button">Upcoming Events</button>
                        </div>
                        <style>
                         .swal-button { padding: 10px; background: ${fabPrimaryColor}; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background 0.3s ease; }
                         .swal-button:hover { background: ${fabSecondaryColor}; }
                        </style>
                    `,
                    showConfirmButton: false,
                    background: fabBgColor,
                    color: fabTextColor,
                    backdrop: `rgba(0,0,0,0.7)`,
                    showCloseButton: true,
                    customClass: { // Ensure SweetAlert uses theme colors
                         popup: 'swal-themed-popup',
                         title: 'swal-themed-title',
                         htmlContainer: 'swal-themed-html',
                         closeButton: 'swal-themed-close'
                    },
                    didOpen: () => {
                        document.getElementById('contactBtn')?.addEventListener('click', () => {
                            Swal.fire({
                                title: 'Contact Us',
                                html: `
                                    <p style="text-align: left; margin-bottom: 15px;">Email: contact@dcitc.edu.bd</p>
                                    <p style="text-align: left; margin-bottom: 15px;">Phone: +880 1712-345678</p>
                                    <p style="text-align: left;">Location: Dhaka College, New Market, Dhaka-1205</p>
                                `,
                                confirmButtonColor: fabPrimaryColor,
                                background: fabBgColor,
                                color: fabTextColor,
                                customClass: { popup: 'swal-themed-popup', title: 'swal-themed-title', htmlContainer: 'swal-themed-html' }
                            });
                        });
                        document.getElementById('joinBtn')?.addEventListener('click', () => showJoinForm());
                        document.getElementById('projectsBtn')?.addEventListener('click', () => {
                             Swal.fire({
                                title: 'Our Projects',
                                html: `<div style="text-align: left;">
                                        <p style="margin-bottom: 10px;"><strong>Smart Campus App</strong> - A mobile application for campus navigation and event notifications.</p>
                                        <p style="margin-bottom: 10px;"><strong>E-Learning Platform</strong> - A web platform for sharing educational resources among students.</p>
                                        <p style="margin-bottom: 10px;"><strong>Dhaka College Archive</strong> - Digital preservation of historical documents and photographs.</p>
                                      </div>`,
                                confirmButtonColor: fabPrimaryColor,
                                background: fabBgColor,
                                color: fabTextColor,
                                customClass: { popup: 'swal-themed-popup', title: 'swal-themed-title', htmlContainer: 'swal-themed-html' }
                             });
                        });
                         document.getElementById('eventsBtn')?.addEventListener('click', () => {
                              Swal.fire({
                                 title: 'Upcoming Events',
                                  html: `<div style="text-align: left;">
                                        <p style="margin-bottom: 10px;"><strong>Oct 15, 2024</strong> - Web Development Workshop</p>
                                        <p style="margin-bottom: 10px;"><strong>Nov 5, 2024</strong> - Annual Hackathon</p>
                                        <p style="margin-bottom: 10px;"><strong>Nov 20, 2024</strong> - Tech Talk: AI in Healthcare</p>
                                        </div>`,
                                 confirmButtonColor: fabPrimaryColor,
                                 background: fabBgColor,
                                 color: fabTextColor,
                                 customClass: { popup: 'swal-themed-popup', title: 'swal-themed-title', htmlContainer: 'swal-themed-html' }
                              });
                         });
                    }
                });
            });
        }

         // Add CSS rules for themed SweetAlert
         const swalStyle = document.createElement('style');
         swalStyle.textContent = `
             .swal-themed-popup { background: var(--card-background) !important; color: var(--text-primary) !important; border-radius: var(--border-radius-lg) !important; backdrop-filter: blur(5px); }
             .swal-themed-title { color: var(--primary-color) !important; }
             .swal-themed-html { color: var(--text-primary) !important; }
             .swal-themed-close { color: var(--text-secondary) !important; transition: color 0.3s ease; }
             .swal-themed-close:hover { color: var(--primary-color) !important; }
             .swal-themed-button { background-color: var(--primary-color) !important; }
             .swal-themed-button-cancel { background-color: var(--bg-surface-2) !important; color: var(--text-secondary) !important; }
             .swal-themed-button:focus, .swal-themed-button-cancel:focus { box-shadow: 0 0 0 3px var(--bg-focus-ring) !important; }
             /* Style SweetAlert input fields based on theme */
             .swal2-input, .swal2-select, .swal2-textarea {
                 background-color: var(--bg-surface-2) !important;
                 color: var(--text-primary) !important;
                 border: 1px solid var(--border-color-medium) !important;
             }
             .swal2-input:focus, .swal2-select:focus, .swal2-textarea:focus {
                 border-color: var(--primary-color) !important;
                 box-shadow: 0 0 0 3px var(--bg-focus-ring) !important;
             }
         `;
         document.head.appendChild(swalStyle);


        // --- Join Button Functionality ---
        const joinButton = document.getElementById('joinButton');
        if (joinButton) {
            joinButton.addEventListener('click', function(e) {
                e.preventDefault();
                showJoinForm();
            });
        }

        function showJoinForm() {
            // Use CSS variables directly in SweetAlert's customClass
            const primaryColor = getComputedStyle(rootElement).getPropertyValue('--primary-color').trim();

            Swal.fire({
                title: 'Join Dhaka College IT Club',
                html: `
                    <form id="joinForm" novalidate>
                        <div style="margin-bottom: 15px; text-align: left;">
                            <label for="swal-name" style="display: block; margin-bottom: 5px;">Full Name:</label>
                            <input type="text" id="swal-name" class="swal2-input" placeholder="Enter your full name" required>
                        </div>
                        <div style="margin-bottom: 15px; text-align: left;">
                            <label for="swal-email" style="display: block; margin-bottom: 5px;">Email:</label>
                            <input type="email" id="swal-email" class="swal2-input" placeholder="Enter your email" required>
                        </div>
                        <div style="margin-bottom: 15px; text-align: left;">
                            <label for="swal-phone" style="display: block; margin-bottom: 5px;">Phone Number:</label>
                            <input type="tel" id="swal-phone" class="swal2-input" placeholder="Enter your phone number" required>
                        </div>
                        <div style="margin-bottom: 15px; text-align: left;">
                            <label for="swal-department" style="display: block; margin-bottom: 5px;">Department:</label>
                            <select id="swal-department" class="swal2-select" required>
                                <option value="">Select Department</option>
                                <option value="Science">Science</option>
                                <option value="Commerce">Commerce</option>
                                <option value="Arts">Arts</option>
                            </select>
                        </div>
                        <div style="text-align: left;">
                            <label for="swal-interest" style="display: block; margin-bottom: 5px;">Area of Interest:</label>
                            <select id="swal-interest" class="swal2-select" required>
                                <option value="">Select Interest</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Apps">Mobile Apps</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Game Development">Game Development</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                            </select>
                        </div>
                    </form>
                `,
                showCancelButton: true,
                confirmButtonText: 'Submit Application',
                cancelButtonText: 'Maybe Later',
                confirmButtonColor: primaryColor,
                customClass: { popup: 'swal-themed-popup', title: 'swal-themed-title', htmlContainer: 'swal-themed-html', confirmButton: 'swal-themed-button', cancelButton: 'swal-themed-button-cancel' },
                preConfirm: () => {
                    const name = document.getElementById('swal-name').value;
                    const email = document.getElementById('swal-email').value;
                    const phone = document.getElementById('swal-phone').value;
                    const department = document.getElementById('swal-department').value;
                    const interest = document.getElementById('swal-interest').value;

                    if (!name || !email || !phone || !department || !interest) {
                        Swal.showValidationMessage(`Please fill out all fields`);
                        return false;
                    }
                     if (!/\S+@\S+\.\S+/.test(email)) {
                         Swal.showValidationMessage(`Please enter a valid email address`);
                         return false;
                     }
                    return { name, email, phone, department, interest };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Application Submitted!',
                        html: `
                            <p style="margin-bottom: 15px;">Thank you for your interest in joining DCITC, ${result.value.name}!</p>
                            <p>We've received your application and will contact you soon at ${result.value.email} with further details.</p>
                        `,
                        icon: 'success',
                        confirmButtonColor: primaryColor,
                        customClass: { popup: 'swal-themed-popup', title: 'swal-themed-title', htmlContainer: 'swal-themed-html', confirmButton: 'swal-themed-button' }
                    });
                }
            });
        }


        // --- GSAP Animations ---
        if (typeof gsap !== 'undefined') {
            // Animate cards border on hover
            document.querySelectorAll('.about-card').forEach(card => {
                const border = card.querySelector('.card-border');
                if (border) {
                    let borderTween = gsap.to(border, {
                        height: '100%',
                        duration: 0.5,
                        ease: 'power2.out',
                        opacity: 0.1,
                        paused: true
                    });

                    card.addEventListener('mouseenter', () => borderTween.play());
                    card.addEventListener('mouseleave', () => borderTween.reverse());
                }
            });

            // Animate logo on hover
            const logoContainer = document.querySelector('.logo-container');
            const logoGlow = document.querySelector('.logo-glow');
            const logoImg = document.querySelector('.logo-img');

            if (logoContainer && logoGlow && logoImg) {
                 let logoTween = gsap.timeline({ paused: true })
                     .to(logoGlow, { opacity: 0.8, scale: 1.2, duration: 0.5 }, 0)
                     .to(logoImg, { scale: 1.1, rotation: 5, duration: 0.5 }, 0);

                logoContainer.addEventListener('mouseenter', () => logoTween.play());
                logoContainer.addEventListener('mouseleave', () => logoTween.reverse());
            }
        }

        // --- Footer Back-to-Top Button ---
        const backToTopButton = document.getElementById("footer-backToTop");

        if (backToTopButton) {
            window.addEventListener("scroll", () => {
                if (window.pageYOffset > 200) { // Show after scrolling 200px
                    backToTopButton.classList.add("visible");
                } else {
                    backToTopButton.classList.remove("visible");
                }
            });

            backToTopButton.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            });
        }

    }); // End DOMContentLoaded

