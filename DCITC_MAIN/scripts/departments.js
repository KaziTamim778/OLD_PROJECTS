// Wait for document to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize loader
  const loader = document.querySelector('.loader');
  window.addEventListener('load', function() {
    setTimeout(function() {
      if(loader) loader.classList.add('hidden');
    }, 500); // Shortened loader time
  });

  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Initialize Particles.js for Main Background
  if (document.getElementById('particles-js')) {
     particlesJS('particles-js', { /* Configuration... */
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00b4db" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00b4db", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
     });
  }

  // Initialize Particles.js for Footer Background
  if (document.getElementById('footer-particles-js')) {
      particlesJS('footer-particles-js', { /* Configuration... */
            "particles": {
               "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
               "color": { "value": "#0083b0" },
               "shape": { "type": "circle" },
               "opacity": { "value": 0.4, "random": true },
               "size": { "value": 2.5, "random": true },
               "line_linked": { "enable": true, "distance": 120, "color": "#0083b0", "opacity": 0.3, "width": 1 },
               "move": { "enable": true, "speed": 1.8, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 130, "line_linked": { "opacity": 0.7 } },
                    "push": { "particles_nb": 3 },
                    "repulse": { "distance": 100, "duration": 0.4 },
                    "bubble": { "distance": 200, "size": 20, "duration": 2, "opacity": 8, "speed": 3 }
                }
            },
            "retina_detect": true
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
       const currentPage = window.location.pathname.split('/').pop();
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
          if (window.scrollY > 50) {
              navbarContainer.classList.add("scrolled");
          } else {
              navbarContainer.classList.remove("scrolled");
          }
      });

  } else {
      console.warn("Navbar elements not found.");
  }

   // --- Theme Toggle (Dark/Light Mode) ---
   const themeToggle = document.getElementById('themeToggle');
   const rootElement = document.documentElement;
   let isDarkMode = !rootElement.classList.contains('light');

   function applyTheme() {
       rootElement.classList.toggle('light', !isDarkMode);
       if (themeToggle) {
           themeToggle.classList.toggle('light', !isDarkMode);
       }
   }
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   applyTheme();
   if (themeToggle) {
       themeToggle.addEventListener('click', () => {
           isDarkMode = !isDarkMode;
           applyTheme();
       });
   }

  // --- Department Filtering ---
  const filterButtons = document.querySelectorAll('.filter-button');
  const departmentCardElements = document.querySelectorAll('.department-card');
  const departmentGrid = document.querySelector('.departments-grid'); // Target grid for height adjustment

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      let visibleCount = 0;
      const currentHeight = departmentGrid.offsetHeight; // Get current height
      departmentGrid.style.height = `${currentHeight}px`; // Set fixed height for transition

      departmentCardElements.forEach(card => {
         const category = card.getAttribute('data-category');
         const matches = (filter === 'all' || category === filter);

         if (matches) {
            card.style.display = 'block';
            card.style.opacity = 0; // Start fade-in
            card.style.transform = 'translateY(10px)';
             setTimeout(() => {
                 card.style.opacity = 1;
                 card.style.transform = 'translateY(0)';
             }, 50); // Small delay for effect
             visibleCount++;
         } else {
             card.style.opacity = 0;
             card.style.transform = 'translateY(-10px)';
             setTimeout(() => {
                 card.style.display = 'none';
             }, 300); // Hide after fade-out
         }
      });

      // Adjust grid height after filtering
      setTimeout(() => {
           departmentGrid.style.height = 'auto'; // Reset height after animation
      }, 350);

      // Handle empty state (optional)
      // const emptyState = document.querySelector('.empty-state');
      // if(emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });

  // --- Counter Animation ---
  const countUpElements = document.querySelectorAll('.count-up');
  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetValue = parseInt(element.getAttribute('data-count'));
        if (isNaN(targetValue)) return;

        let currentValue = 0;
        const duration = 1500; // 1.5 seconds
        const frameDuration = 16;
        const totalFrames = duration / frameDuration;
        const increment = targetValue / totalFrames;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(currentValue);
          }
        }, frameDuration);

        countUpObserver.unobserve(element);
      }
    });
  }, { threshold: 0.3 });

  countUpElements.forEach(element => {
    countUpObserver.observe(element);
  });

  // --- Accordion ---
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
         header.addEventListener('click', () => {
             const currentlyActive = document.querySelector('.accordion-item.active');
             if (currentlyActive && currentlyActive !== item) {
                 currentlyActive.classList.remove('active');
             }
             item.classList.toggle('active');
         });
    }
  });

  // --- CTA Button Join Form ---
  const ctaJoinButton = document.getElementById('joinButton'); // Using the ID from CTA section
   if (ctaJoinButton) {
       ctaJoinButton.addEventListener('click', function(e) {
           e.preventDefault();
           showJoinForm(); // Reusing the showJoinForm function
       });
   }

   // --- Footer Back-to-Top ---
    const backToTopButton = document.getElementById("footer-backToTop");
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            backToTopButton.classList.toggle("visible", window.pageYOffset > 200);
        });
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

  // --- SweetAlert Theming ---
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

    // --- Join Form Function (Reused) ---
    function showJoinForm() {
         const primaryColor = getComputedStyle(rootElement).getPropertyValue('--primary-color').trim();
         Swal.fire({
            title: 'Get Involved', // Changed title slightly for context
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
                         <label for="swal-interest-dept" style="display: block; margin-bottom: 5px;">Interested Department:</label>
                         <select id="swal-interest-dept" class="swal2-select" required>
                             <option value="">Select Department</option>
                             <option value="Web Development">Web Development</option>
                             <option value="UI/UX Design">UI/UX Design</option>
                             <option value="AI/ML">AI & Machine Learning</option>
                             <option value="Digital Marketing">Digital Marketing</option>
                             <option value="Other">Other</option>
                         </select>
                     </div>
                     <div style="text-align: left;">
                         <label for="swal-message" style="display: block; margin-bottom: 5px;">Your Message (Optional):</label>
                         <textarea id="swal-message" class="swal2-textarea" placeholder="Tell us a bit about your interest..."></textarea>
                     </div>
                 </form>
             `,
             showCancelButton: true,
             confirmButtonText: 'Submit Inquiry',
             cancelButtonText: 'Cancel',
             confirmButtonColor: primaryColor,
             customClass: { popup: 'swal-themed-popup', title: 'swal-themed-title', htmlContainer: 'swal-themed-html', confirmButton: 'swal-themed-button', cancelButton: 'swal-themed-button-cancel' },
             preConfirm: () => {
                 const name = document.getElementById('swal-name').value;
                 const email = document.getElementById('swal-email').value;
                 const interest = document.getElementById('swal-interest-dept').value;
                 const message = document.getElementById('swal-message').value;

                 if (!name || !email || !interest) {
                     Swal.showValidationMessage(`Please fill out name, email, and interested department.`);
                     return false;
                 }
                  if (!/\S+@\S+\.\S+/.test(email)) {
                      Swal.showValidationMessage(`Please enter a valid email address`);
                      return false;
                  }
                 return { name, email, interest, message };
             }
         }).then((result) => {
             if (result.isConfirmed) {
                 Swal.fire({
                     title: 'Inquiry Submitted!',
                     html: `
                         <p style="margin-bottom: 15px;">Thank you for your interest, ${result.value.name}!</p>
                         <p>We've received your inquiry about the ${result.value.interest} department and will be in touch soon via ${result.value.email}.</p>
                     `,
                     icon: 'success',
                     confirmButtonColor: primaryColor,
                     customClass: { popup: 'swal-themed-popup', title: 'swal-themed-title', htmlContainer: 'swal-themed-html', confirmButton: 'swal-themed-button' }
                 });
             }
         });
    }


}); // End DOMContentLoaded