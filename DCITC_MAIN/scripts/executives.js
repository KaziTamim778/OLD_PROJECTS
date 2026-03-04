document.addEventListener('DOMContentLoaded', function() {
    // --- Initialization ---

    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      mirror: false
    });

    // Loading animation Hiding
    const loader = document.querySelector('.loader');
    window.addEventListener('load', function() {
         setTimeout(function() {
            if(loader) loader.classList.add('fade-out');
          }, 1000); // Adjusted timing
    });

    // Initialize Main particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
         particlesJS('particles-js', {
              "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#00b4db" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#0083b0", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } } }, "retina_detect": true
          });
    } else {
        console.warn("Particles.js library or #particles-js element not found.");
    }

     // Initialize Footer particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('footer-particles-js')) {
          particlesJS('footer-particles-js', {
               "particles": { "number": { "value": 40, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#0083b0" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true }, "size": { "value": 2.5, "random": true }, "line_linked": { "enable": true, "distance": 120, "color": "#0083b0", "opacity": 0.3, "width": 1 }, "move": { "enable": true, "speed": 1.8, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 130, "line_linked": { "opacity": 0.7 } }, "push": { "particles_nb": 3 } } }, "retina_detect": true
           });
     } else {
         console.warn("Particles.js library or #footer-particles-js element not found.");
     }

    // Initialize Tilt.js for cards
    if (typeof $.fn.tilt === 'function') {
        $('.team-card').tilt({
            glare: true,
            maxGlare: .1,
            maxTilt: 5,
            scale: 1.02
        });
    } else {
         console.warn("jQuery or Tilt.js not loaded correctly.");
    }

    // Configure toastr notifications
    if (typeof toastr !== 'undefined') {
          toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": true, "positionClass": "toast-bottom-right", "preventDuplicates": true, "showDuration": "300", "hideDuration": "1000", "timeOut": "3000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
          };
    } else {
        console.warn("Toastr library not loaded.");
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
        overlay.addEventListener("click", function () { closeMobileMenu(); });

        // Close menu when clicking on a link
        navItems.forEach(item => {
            item.addEventListener("click", function() { closeMobileMenu(); });
        });

        function closeMobileMenu() {
             navLinks.classList.remove("active");
             hamburger.classList.remove("open");
             overlay.classList.remove("active");
             document.body.style.overflow = "";
        }

        // Active link highlighting based on current page filename
         const currentPage = window.location.pathname.split('/').pop() || 'index.html';
         navItems.forEach(item => {
             const itemPage = item.getAttribute('href').split('/').pop();
             item.classList.toggle('active', currentPage === itemPage || (currentPage === '' && itemPage === 'index.html'));
         });

        // Scroll event for sticky navbar
        window.addEventListener("scroll", function() {
            navbarContainer.classList.toggle("scrolled", window.scrollY > 50);
        });
    } else {
        console.warn("Navbar elements not found.");
    }

        // --- Theme Toggle (Dark/Light Mode) ---
        const themeToggle = document.getElementById("themeToggle");
        const rootElement = document.documentElement; // Target <html> for class toggle
        let isDarkMode = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

        function applyTheme() {
            rootElement.classList.toggle('light', !isDarkMode);
            if (themeToggle) {
                themeToggle.setAttribute('aria-checked', isDarkMode);
            }
            // Update particles color if needed (optional, requires re-init or color update function)
        }

        // Set initial state
        applyTheme();

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                isDarkMode = !isDarkMode;
                applyTheme();
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
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

    // --- Executives Page Specific JS ---
    const yearButtons = document.querySelectorAll('.year-btn');
    const departmentButtons = document.querySelectorAll('.department-btn');
    const searchInput = document.querySelector('.search-input');
    const teamCards = document.querySelectorAll('.team-card');
    const yearContentSections = document.querySelectorAll('.year-content');
    const facultySection = document.querySelector('.faculty-section');
    const noResultsMessage = document.querySelector('.no-results');
    const modal = document.getElementById('teamModal');
    const modalCloseButton = modal?.querySelector('.close');
    let currentCardIndex = -1; // For modal navigation
    const allCards = Array.from(teamCards); // Create array for indexing

    // Filter function (Corrected Version)
    function filterTeamMembers() {
      const searchValue = searchInput?.value.toLowerCase() || '';
      const activeYear = document.querySelector('.year-btn.active')?.dataset.year;
      const activeDepartment = document.querySelector('.department-btn.active')?.dataset.department || 'all';
      const departmentFilterContainer = document.querySelector('.department-filter-container');

      // 1. Show/Hide Year Sections
      yearContentSections.forEach(section => {
          section.style.display = (section.dataset.year === activeYear) ? 'block' : 'none';
      });
      if (facultySection) facultySection.style.display = 'block';

      // 2. Show/Hide Department Filters
      if (departmentFilterContainer) {
           departmentFilterContainer.style.display = (activeYear === '2023-2024') ? 'flex' : 'none';
      }

      // 3. Filter Individual Cards WITHIN Visible Sections
      let visibleCount = 0;
      teamCards.forEach((card, index) => {
        const isFaculty = card.closest('.faculty-section');
        const cardYearSection = card.closest('.year-content');
        const cardYear = cardYearSection?.dataset.year;

        if (isFaculty || cardYear === activeYear) {
            const memberData = card.dataset.memberJson ? JSON.parse(card.dataset.memberJson) : {};
            const name = (memberData.name || '').toLowerCase();
            const position = (memberData.position || '').toLowerCase();
            const department = (memberData.department || '').toLowerCase();
            const bio = (memberData.bio || '').toLowerCase();

            const matchesSearch = searchValue === '' || name.includes(searchValue) || position.includes(searchValue) || department.includes(searchValue) || bio.includes(searchValue);

            let matchesDepartment = true;
             if (!isFaculty && activeYear === '2023-2024' && activeDepartment !== 'all') {
                 matchesDepartment = (memberData.department === activeDepartment);
             }

            if (matchesSearch && matchesDepartment) {
                card.style.display = 'block';
                visibleCount++;
                if (cardYear === activeYear) {
                    card.style.animationDelay = `${(visibleCount % 10) * 0.05}s`;
                    card.classList.remove('card-appear-animation');
                    void card.offsetWidth;
                    card.classList.add('card-appear-animation');
                }
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'none';
        }
      });

      // 4. Show/Hide No Results Message
       if (noResultsMessage) {
           const activeYearSectionIsVisible = document.querySelector(`.year-content[data-year="${activeYear}"]`)?.style.display === 'block';
           noResultsMessage.style.display = (visibleCount === 0 && activeYearSectionIsVisible) ? 'block' : 'none';
       }
    }

    // Add Card Animation Style if not present
    if (!document.getElementById('card-appear-style')) {
         const style = document.createElement('style');
         style.id = 'card-appear-style';
         style.textContent = `.card-appear-animation { animation: cardAppear 0.5s forwards; }`;
         document.head.appendChild(style);
     }

    // Add Event Listeners for Filters
    yearButtons.forEach(button => {
      button.addEventListener('click', function() {
        yearButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        // Reset department filter when year changes
        departmentButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.department-btn[data-department="all"]')?.classList.add('active');
        filterTeamMembers();
         if (typeof toastr !== 'undefined') toastr.info(`Showing team for ${this.dataset.year}`);
      });
    });

    departmentButtons.forEach(button => {
      button.addEventListener('click', function() {
        departmentButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterTeamMembers();
      });
    });

    searchInput?.addEventListener('input', filterTeamMembers); // Use 'input' for real-time filtering


    // --- Modal Logic ---
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberDataString = this.dataset.memberJson;
            if (!memberDataString || !modal) return;

            try {
                const memberData = JSON.parse(memberDataString);

                // Populate modal
                modal.querySelector('#modalName').textContent = memberData.name || 'N/A';
                modal.querySelector('#modalPosition').textContent = memberData.position || 'N/A';
                modal.querySelector('#modalDepartment').textContent = memberData.department || 'N/A';
                modal.querySelector('#modalBio').textContent = memberData.bio || 'No biography available.';
                const imgSrc = this.querySelector('img')?.src || 'https://placehold.co/300x400/00b4db/ffffff';
                modal.querySelector('#modalImage').src = imgSrc;
                modal.querySelector('#modalImage').alt = memberData.name || 'Team Member';

                // Handle optional fields
                 ['Email', 'Skills', 'Achievement', 'Location', 'Phone', 'Website'].forEach(field => {
                     const lowerField = field.toLowerCase();
                     const container = modal.querySelector(`#modal${field}Container`);
                     const element = modal.querySelector(`#modal${field}`);
                     if (container && element) {
                          container.style.display = memberData[lowerField] ? 'flex' : 'none';
                          if (memberData[lowerField]) {
                               element.textContent = Array.isArray(memberData[lowerField]) ? memberData[lowerField].join(', ') : memberData[lowerField];
                          }
                     }
                });


                // Populate Social Links
                 const socialLinksContainer = modal.querySelector('#modalSocialLinks');
                 if (socialLinksContainer) {
                     socialLinksContainer.innerHTML = ''; // Clear previous
                     if (memberData.social && typeof memberData.social === 'object') {
                         Object.entries(memberData.social).forEach(([platform, url]) => {
                             if (url && url !== '#') {
                                 let iconClass = `fas fa-link`; // Default
                                 // Add more platform checks if needed
                                 if (platform.includes('linkedin')) iconClass = 'fab fa-linkedin-in';
                                 else if (platform.includes('github')) iconClass = 'fab fa-github';
                                 else if (platform.includes('twitter')) iconClass = 'fab fa-twitter';
                                 else if (platform.includes('email')) iconClass = 'fas fa-envelope';
                                 else if (platform.includes('website')) iconClass = 'fas fa-globe';
                                 else if (platform.includes('researchgate')) iconClass = 'fab fa-researchgate';
                                 else if (platform.includes('hackerrank')) iconClass = 'fab fa-hackerrank';
                                 else if (platform.includes('leetcode')) iconClass = 'fas fa-code';
                                 else if (platform.includes('codepen')) iconClass = 'fab fa-codepen';
                                 else if (platform.includes('hackthebox')) iconClass = 'fas fa-box';
                                 else if (platform.includes('security')) iconClass = 'fas fa-shield-alt';
                                 else if (platform.includes('behance')) iconClass = 'fab fa-behance';
                                 else if (platform.includes('dribbble')) iconClass = 'fab fa-dribbble';
                                 else if (platform.includes('instagram')) iconClass = 'fab fa-instagram';
                                 else if (platform.includes('pinterest')) iconClass = 'fab fa-pinterest';
                                 else if (platform.includes('kaggle')) iconClass = 'fab fa-kaggle';
                                 else if (platform.includes('medium')) iconClass = 'fab fa-medium';


                                 const link = document.createElement('a');
                                 link.href = url.startsWith('mailto:') ? url : (url.startsWith('http') ? url : `//${url}`); // Basic URL prepending
                                 link.target = "_blank";
                                 link.rel = "noopener noreferrer";
                                 link.className = 'social-link'; // Use specific modal social link class if needed
                                 link.innerHTML = `<i class="${iconClass}"></i>`;
                                 link.title = platform.charAt(0).toUpperCase() + platform.slice(1);
                                 socialLinksContainer.appendChild(link);
                             }
                         });
                     }
                 }

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                currentCardIndex = allCards.indexOf(this);

            } catch (e) {
                console.error("Error parsing member data:", e, memberDataString);
                if (typeof toastr !== 'undefined') toastr.error('Could not load member details.');
            }
        });
    });

    // Close modal function
    function closeModal() {
      if (!modal) return;
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }

    // Modal Close Listeners
    modalCloseButton?.addEventListener('click', closeModal);
    modal?.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && modal?.classList.contains('show')) closeModal(); });

    // Modal navigation functionality
    const prevButton = document.getElementById('prevTeamMember');
    const nextButton = document.getElementById('nextTeamMember');

    function navigateTeamMember(direction) {
        if (currentCardIndex === -1 || !modal || !modal.classList.contains('show')) return;
        
        // Get only visible cards that match current filters
        const visibleCards = Array.from(teamCards).filter(card => card.style.display !== 'none');
        if (visibleCards.length <= 1) return; // No navigation if only one card
        
        // Find current card's position in visible cards
        const currentVisibleIndex = visibleCards.findIndex(card => allCards.indexOf(card) === currentCardIndex);
        if (currentVisibleIndex === -1) return;
        
        // Calculate new index with wrapping
        let newVisibleIndex;
        if (direction === 'next') {
            newVisibleIndex = (currentVisibleIndex + 1) % visibleCards.length;
        } else {
            newVisibleIndex = (currentVisibleIndex - 1 + visibleCards.length) % visibleCards.length;
        }
        
        // Get the new card and update the current index
        const newCard = visibleCards[newVisibleIndex];
        currentCardIndex = allCards.indexOf(newCard);
        
        // Get data from the new card
        const memberDataString = newCard.dataset.memberJson;
        if (!memberDataString) return;
        
        try {
            const memberData = JSON.parse(memberDataString);
            const modalContent = modal.querySelector('.modal-content');
            
            // Add transition class
            modalContent.classList.add('updating');
            
            // Wait for transition to complete before updating content
            setTimeout(() => {
                // Update core modal content
                modal.querySelector('#modalName').textContent = memberData.name || 'N/A';
                modal.querySelector('#modalPosition').textContent = memberData.position || 'N/A';
                modal.querySelector('#modalDepartment').textContent = memberData.department || 'N/A';
                modal.querySelector('#modalBio').textContent = memberData.bio || 'No biography available.';
                const imgSrc = newCard.querySelector('img')?.src || '/api/placeholder/300/400';
                modal.querySelector('#modalImage').src = imgSrc;
                modal.querySelector('#modalImage').alt = memberData.name || 'Team Member';
                
                // Handle optional fields
                ['Email', 'Skills', 'Achievement', 'Location', 'Phone', 'Website'].forEach(field => {
                    const lowerField = field.toLowerCase();
                    const container = modal.querySelector(`#modal${field}Container`);
                    const element = modal.querySelector(`#modal${field}`);
                    if (container && element) {
                        container.style.display = memberData[lowerField] ? 'flex' : 'none';
                        if (memberData[lowerField]) {
                            element.textContent = Array.isArray(memberData[lowerField]) 
                                ? memberData[lowerField].join(', ') 
                                : memberData[lowerField];
                        }
                    }
                });
                
                // Update social links
                const socialLinksContainer = modal.querySelector('#modalSocialLinks');
                if (socialLinksContainer) {
                    socialLinksContainer.innerHTML = ''; // Clear previous
                    
                    if (memberData.social && typeof memberData.social === 'object') {
                        Object.entries(memberData.social).forEach(([platform, url]) => {
                            if (url && url !== '#') {
                                let iconClass = 'fas fa-link'; // Default
                                
                                // Platform checks (using existing logic)
                                if (platform.includes('linkedin')) iconClass = 'fab fa-linkedin-in';
                                else if (platform.includes('github')) iconClass = 'fab fa-github';
                                else if (platform.includes('twitter')) iconClass = 'fab fa-twitter';
                                else if (platform.includes('email')) iconClass = 'fas fa-envelope';
                                else if (platform.includes('website')) iconClass = 'fas fa-globe';
                                else if (platform.includes('researchgate')) iconClass = 'fab fa-researchgate';
                                else if (platform.includes('hackerrank')) iconClass = 'fab fa-hackerrank';
                                else if (platform.includes('leetcode')) iconClass = 'fas fa-code';
                                else if (platform.includes('codepen')) iconClass = 'fab fa-codepen';
                                else if (platform.includes('hackthebox')) iconClass = 'fas fa-box';
                                else if (platform.includes('security')) iconClass = 'fas fa-shield-alt';
                                else if (platform.includes('behance')) iconClass = 'fab fa-behance';
                                else if (platform.includes('dribbble')) iconClass = 'fab fa-dribbble';
                                else if (platform.includes('instagram')) iconClass = 'fab fa-instagram';
                                else if (platform.includes('pinterest')) iconClass = 'fab fa-pinterest';
                                else if (platform.includes('kaggle')) iconClass = 'fab fa-kaggle';
                                else if (platform.includes('medium')) iconClass = 'fab fa-medium';
                                
                                const link = document.createElement('a');
                                link.href = url.startsWith('mailto:') ? url : (url.startsWith('http') ? url : `//${url}`);
                                link.target = "_blank";
                                link.rel = "noopener noreferrer";
                                link.className = 'social-link';
                                link.innerHTML = `<i class="${iconClass}"></i>`;
                                link.title = platform.charAt(0).toUpperCase() + platform.slice(1);
                                socialLinksContainer.appendChild(link);
                            }
                        });
                    }
                }
                
                // Remove transition class
                modalContent.classList.remove('updating');
                
                // Announce to screen readers
                const liveRegion = document.createElement('div');
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('class', 'sr-only');
                liveRegion.textContent = `Now showing ${memberData.name}, ${memberData.position}`;
                document.body.appendChild(liveRegion);
                setTimeout(() => document.body.removeChild(liveRegion), 1000);
                
            }, 150); // Brief transition time
            
        } catch (e) {
            console.error("Error parsing team member data during navigation:", e);
            if (typeof toastr !== 'undefined') toastr.error('Could not navigate to team member.');
        }
    }
    
    // Event listeners for navigation buttons
    prevButton?.addEventListener('click', () => navigateTeamMember('prev'));
    nextButton?.addEventListener('click', () => navigateTeamMember('next'));
    
    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', function(e) {
        if (!modal?.classList.contains('show')) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                navigateTeamMember('prev');
                e.preventDefault();
                break;
            case 'ArrowRight':
                navigateTeamMember('next');
                e.preventDefault();
                break;
        }
    });


    // Add SweetAlert Theming CSS (Optional but good for consistency)
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


    // --- Initialize filters on load ---
    filterTeamMembers();

}); // End DOMContentLoaded

