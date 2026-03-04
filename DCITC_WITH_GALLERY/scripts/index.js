// --- Initialization ---
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 50, // Trigger animations a bit sooner
  });

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
      document.body.style.overflow = navLinks.classList.contains(
        "active"
      )
        ? "hidden"
        : "";
    });

    // Close menu function
    function closeMobileMenu() {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    // Close menu when clicking overlay
    overlay.addEventListener("click", closeMobileMenu);

    // Close menu when clicking on a link
    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Smooth scroll for internal links
        const targetId = item.getAttribute("href");
        if (targetId.startsWith("#")) {
          e.preventDefault();
          closeMobileMenu();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Adjust scroll position slightly to account for sticky navbar height
            const navbarHeight = navbarContainer.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 15; // 15px extra offset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        } else {
           // For external links, just close the menu
           closeMobileMenu();
        }
      });
    });

    // Active link highlighting based on scroll position
    function highlightActiveLink() {
      let fromTop = window.scrollY + navbarContainer.offsetHeight + 50; // Offset for activation

      navItems.forEach(link => {
          const sectionId = link.getAttribute('href');
          if (sectionId.startsWith('#')) {
              const section = document.querySelector(sectionId);
              if (section) {
                  if (
                      section.offsetTop <= fromTop &&
                      section.offsetTop + section.offsetHeight > fromTop
                  ) {
                      link.classList.add('active');
                  } else {
                      link.classList.remove('active');
                  }
              } else {
                 link.classList.remove('active'); // Remove active if section not found
              }
          } else {
              // Handle external links if needed (e.g., based on current page)
              const currentPage = window.location.pathname.split('/').pop();
              const itemPage = sectionId.split('/').pop();
              if (currentPage === itemPage || (currentPage === '' && itemPage === 'index.html')) {
                   link.classList.add('active');
              } else {
                   link.classList.remove('active');
              }
          }
      });

       // Special case for bottom of page - activate last link
       if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) { // Near bottom
           navItems.forEach(link => link.classList.remove('active'));
           const lastInternalLink = Array.from(navItems).reverse().find(link => link.getAttribute('href').startsWith('#'));
           if (lastInternalLink) {
               lastInternalLink.classList.add('active');
           }
       }
    }

    // Scroll event for sticky navbar and active link highlighting
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbarContainer.classList.add("scrolled");
      } else {
        navbarContainer.classList.remove("scrolled");
      }
      highlightActiveLink(); // Highlight link on scroll
    });

    highlightActiveLink(); // Initial check on load

  } else {
    console.warn(
      "Navbar elements not found. Navbar functionality might be limited."
    );
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

  // --- Hero Section Particles & Typewriter ---
  if (document.getElementById("particles")) {
    particlesJS("particles", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00b4db" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true, anim: { enable: false } },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#00b4db", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false },
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } },
      },
      retina_detect: true,
    });
  }

  class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.isDeleting = false;
      this.type();
    }
    type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.txtElement.textContent = this.txt;
      let typeSpeed = 100;
      if (this.isDeleting) typeSpeed /= 2;
      if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  const txtElement = document.getElementById("typewriter");
  if (txtElement) {
    const words = ["INFORMATIO" , "IT CLUB"];
    const wait = 2000;
    new TypeWriter(txtElement, words, wait);
  }

  // --- Department Section Counter & Filter ---
  const countUpElements = document.querySelectorAll(".count-up");
  const observerOptions = { threshold: 0.3 };

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetValue = parseInt(element.getAttribute("data-count"));
        if (isNaN(targetValue)) return;

        let currentValue = 0;
        const duration = 2000;
        const increment = Math.max(1, Math.ceil(targetValue / (duration / 16))); // Ensure increment is at least 1

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
          } else {
            element.textContent = currentValue;
          }
        }, 16);
        countUpObserver.unobserve(element);
      }
    });
  }, observerOptions);

  countUpElements.forEach((element) => {
    countUpObserver.observe(element);
  });

  const filterButtonsDept = document.querySelectorAll(".filter-bar .filter-button");
  const departmentCards = document.querySelectorAll(".department-card");

  filterButtonsDept.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtonsDept.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.getAttribute("data-filter");

      departmentCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        const shouldShow = filter === "all" || cardCategory === filter;

        // Use AOS classes for reveal/hide if possible, otherwise use opacity/display
        if (shouldShow) {
          card.style.display = "flex"; // Use flex as it's the default display
          setTimeout(() => { // Allow display change before animation
             card.style.opacity = 1;
             card.style.transform = "translateY(0)";
             // card.setAttribute('data-aos', 'fade-up'); // Re-trigger AOS if needed
             // AOS.refreshHard(); // Force AOS refresh
          }, 50);
        } else {
           card.style.opacity = 0;
           card.style.transform = "translateY(20px)";
           setTimeout(() => {
              card.style.display = "none";
           }, 300); // Match transition duration
           // card.removeAttribute('data-aos'); // Remove AOS attribute
        }
      });
    });
  });

  // --- Tech Tuesday Slider ---
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const slider = document.querySelector(".slider");
  const progressBar = document.querySelector(".progress-bar");
  const indicatorsContainer = document.querySelector(".indicators");
  let autoplayTimer;
  let isAnimating = false;
  let isMobile = window.innerWidth <= 768;

  function initSlider() {
      if (!slider || slides.length === 0 || !indicatorsContainer) return; // Exit if elements missing

      indicatorsContainer.innerHTML = ''; // Clear existing indicators
      for (let i = 0; i < totalSlides; i++) {
          const indicator = document.createElement("div");
          indicator.classList.add("indicator");
          if (i === 0) indicator.classList.add("active");
          indicator.addEventListener("click", () => {
              if (isAnimating) return;
              navigateToSlide(i);
          });
          indicatorsContainer.appendChild(indicator);
      }

      updateThemeColors(); // Initial theme update
      createParticles(); // Create particles for slides
      initThreeJsBackground(); // Init 3D background
      checkMobileStatus(); // Check if mobile view
      initTiltEffect(); // Init tilt effect for images
      startAutoplay(); // Start autoplay

      // Add event listeners only if elements exist
      const prevArrow = document.querySelector(".prev-arrow");
      const nextArrow = document.querySelector(".next-arrow");
      if (prevArrow) prevArrow.addEventListener("click", handlePrevClick);
      if (nextArrow) nextArrow.addEventListener("click", handleNextClick);

      document.addEventListener("keydown", handleKeyDown);

      const sliderContainer = document.querySelector(".slider-container");
      if (sliderContainer) {
          sliderContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
          sliderContainer.addEventListener("touchend", handleTouchEnd, { passive: true });
          sliderContainer.addEventListener("mouseenter", stopAutoplay);
          sliderContainer.addEventListener("mouseleave", startAutoplay);
      }

      window.addEventListener("resize", handleResize);
      handleResize(); // Initial check for tilt effect
  }

  function updateThemeColors() {
if (slides.length === 0 || currentSlide >= slides.length) return;
const currentSlideElement = slides[currentSlide];
const primaryColor = currentSlideElement.getAttribute("data-primary");
const secondaryColor = currentSlideElement.getAttribute("data-secondary");
const primaryRgb = currentSlideElement.getAttribute("data-rgb");

const sliderSection = document.querySelector('.slider-section');
if (sliderSection) {
  if (primaryColor) sliderSection.style.setProperty("--primary-color", primaryColor);
  if (secondaryColor) sliderSection.style.setProperty("--secondary-color", secondaryColor);
  if (primaryRgb) sliderSection.style.setProperty("--primary-rgb", primaryRgb);
  if (primaryColor) sliderSection.style.setProperty("--button-background", primaryColor);
  if (secondaryColor) sliderSection.style.setProperty("--button-hover", secondaryColor);
}

if (progressBar) {
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  progressBar.style.width = `${progress}%`;
}

if (indicatorsContainer) {
  const indicators = indicatorsContainer.querySelectorAll(".indicator");
  indicators.forEach((ind, i) => {
      ind.classList.toggle("active", i === currentSlide);
  });
}
}

  function navigateToSlide(index) {
      if (slides.length === 0 || !slider) return;
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      isAnimating = true;
      currentSlide = index;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;

      updateThemeColors();
      resetAutoplay();

      // Animate slide content (optional, using GSAP if available)
      const currentSlideContent = slides[currentSlide].querySelector('.slide-content');
      if (typeof gsap !== 'undefined' && currentSlideContent) {
           gsap.fromTo(currentSlideContent.children,
               { opacity: 0, y: 30 },
               { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
           );
      }


      setTimeout(() => { isAnimating = false; }, 800); // Match transition duration
  }

  function createParticles() {
      slides.forEach((slide) => {
          const background = slide.querySelector(".slide-background");
          if (!background) return;
          background.innerHTML = ''; // Clear previous particles
          
          // Fewer particles on mobile for better performance
          const particleCount = isMobile ? 10 : (window.innerWidth < 992 ? 20 : 30);

          for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement("div");
              particle.classList.add("particle");
              const size = Math.random() * (isMobile ? 20 : 30) + 5; // Smaller particles on mobile
              const posX = Math.random() * 100;
              const posY = Math.random() * 100 + 100;
              const delay = Math.random() * 5;
              const duration = Math.random() * 10 + 10;
              particle.style.width = `${size}px`;
              particle.style.height = `${size}px`;
              particle.style.left = `${posX}%`;
              particle.style.bottom = `${-posY}%`; // Start below
              particle.style.opacity = Math.random() * 0.5 + 0.1;
              particle.style.animationDuration = `${duration}s`;
              particle.style.animationDelay = `${delay}s`;
              background.appendChild(particle);
          }
      });
  }

  function initThreeJsBackground() {
      const container = document.getElementById("canvas-container");
      if (!container || typeof THREE === 'undefined') return;
      container.innerHTML = ''; // Clear previous canvas

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = window.innerWidth < 768 ? 500 : 1000;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 50;
      }
      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({ size: 0.1, color: 0x00b4db, transparent: true, opacity: 0.5 });
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      camera.position.z = 30;

      let animationFrameId;
      function animate() {
          animationFrameId = requestAnimationFrame(animate);
          particlesMesh.rotation.x += 0.0001;
          particlesMesh.rotation.y += 0.0001;
          renderer.render(scene, camera);
      }
      animate();

       // Cleanup function
       window.addEventListener('beforeunload', () => {
           cancelAnimationFrame(animationFrameId);
           renderer.dispose();
           // Dispose geometries and materials if needed
       });

      window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
      });
  }

  function startAutoplay() {
      stopAutoplay(); // Clear existing timer
      if (slides.length > 1) { // Only autoplay if more than one slide
          autoplayTimer = setInterval(() => {
              if (!isAnimating) { navigateToSlide(currentSlide + 1); }
          }, 5000);
      }
  }
  function stopAutoplay() { clearInterval(autoplayTimer); }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  function initTiltEffect() {
      if (window.innerWidth > 992 && typeof $ !== 'undefined' && $.fn.tilt) {
          $(".slide-image:not(.tilt-initialized)").tilt({
              maxTilt: 5, perspective: 1000, scale: 1.05, speed: 1000, glare: true, maxGlare: 0.1
          }).addClass('tilt-initialized');
      } else if (typeof $ !== 'undefined' && $.fn.tilt) {
          $(".slide-image.tilt-initialized").tilt().tilt.destroy.call($(".slide-image.tilt-initialized")).removeClass('tilt-initialized');
      }
  }

  function handlePrevClick() { if (!isAnimating) navigateToSlide(currentSlide - 1); }
  function handleNextClick() { if (!isAnimating) navigateToSlide(currentSlide + 1); }
  function handleKeyDown(e) {
      if (isAnimating) return;
      if (e.key === "ArrowLeft") navigateToSlide(currentSlide - 1);
      else if (e.key === "ArrowRight") navigateToSlide(currentSlide + 1);
  }

  let touchStartX = 0;
  let touchEndX = 0;
  function handleTouchStart(e) { touchStartX = e.changedTouches[0].screenX; }
  function handleTouchEnd(e) {
      if (isAnimating) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }
  function handleSwipe() {
      const threshold = 50;
      if (touchStartX - touchEndX > threshold) navigateToSlide(currentSlide + 1);
      else if (touchEndX - touchStartX > threshold) navigateToSlide(currentSlide - 1);
  }

  function handleResize() {
      checkMobileStatus(); // Check if mobile view changed
      initTiltEffect(); 
      
      // Adjust slider section height based on content if in mobile view
      if (isMobile) {
          const sliderSection = document.querySelector('.slider-section');
          const currentSlideElement = slides[currentSlide];
          if (sliderSection && currentSlideElement) {
              const slideContent = currentSlideElement.querySelector('.slide-content');
              if (slideContent) {
                  // Give some extra room for navigation controls
                  const extraSpace = window.innerWidth <= 360 ? 80 : 60;
                  const minHeight = (slideContent.offsetHeight + extraSpace) + 'px';
                  sliderSection.style.minHeight = minHeight;
              }
          }
      }
      
      // Force re-render the current slide
      if (!isAnimating && slider) {
          slider.style.transition = 'none';
          slider.style.transform = `translateX(-${currentSlide * 100}%)`;
          // Trigger reflow
          void slider.offsetWidth;
          slider.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
      }
  }

  function checkMobileStatus() {
      const wasMobile = isMobile;
      isMobile = window.innerWidth <= 768;
      
      // If we switched between mobile/desktop, update UI accordingly
      if (wasMobile !== isMobile) {
          const sliderSection = document.querySelector('.slider-section');
          if (sliderSection) {
              if (isMobile) {
                  sliderSection.style.height = 'auto';
              } else {
                  sliderSection.style.height = '100vh';
                  sliderSection.style.minHeight = '';
              }
          }
          
          createParticles(); // Recreate particles with appropriate count
      }
  }

  // Initialize the slider
  initSlider();


  // --- Events Section Filter & Load More ---
  const eventFilterButtons = document.querySelectorAll(".events-filters .filter-btn");
  const eventCardsContainer = document.querySelector(".events-cards");
  const allEventCards = eventCardsContainer ? Array.from(eventCardsContainer.querySelectorAll(".event-card")) : [];
  const emptyState = document.querySelector(".empty-state");
  const loadMoreBtn = document.querySelector(".load-more-btn");
  const viewAllBtns = document.querySelectorAll(".view-all-btn"); // Includes header button
  const eventsPerPage = 6; // Number of events to show initially/load more
  let currentEventFilter = "all events";
  let visibleEventCount = 0;

  function filterAndDisplayEvents() {
      if (!eventCardsContainer) return;
      visibleEventCount = 0;
      allEventCards.forEach((card, index) => {
          const category = card.getAttribute("data-category")?.toLowerCase() || "";
          const matchesFilter = currentEventFilter === "all events" || category === currentEventFilter.replace(/s$/, ""); // Handle plural 's'

          if (matchesFilter && visibleEventCount < eventsPerPage) {
              card.style.display = "flex"; // Use flex as it's the card display type
              visibleEventCount++;
          } else {
              card.style.display = "none";
          }
      });

      // Show/hide empty state and load more button
      if (emptyState) emptyState.style.display = visibleEventCount === 0 ? "block" : "none";
      if (loadMoreBtn) {
          const totalMatching = allEventCards.filter(card => {
              const cat = card.getAttribute("data-category")?.toLowerCase() || "";
              return currentEventFilter === "all events" || cat === currentEventFilter.replace(/s$/, "");
          }).length;
          loadMoreBtn.style.display = visibleEventCount < totalMatching ? "block" : "none";
          loadMoreBtn.disabled = false;
          loadMoreBtn.textContent = "Load More Events";
      }

      // Re-apply AOS animations if needed (optional)
      if (typeof AOS !== 'undefined') {
           AOS.refreshHard();
      }
  }

  if (eventFilterButtons.length > 0) {
      eventFilterButtons.forEach((button) => {
          button.addEventListener("click", function () {
              eventFilterButtons.forEach((btn) => btn.classList.remove("active"));
              this.classList.add("active");
              currentEventFilter = this.textContent.toLowerCase();
              visibleEventCount = 0; // Reset visible count for filtering
              filterAndDisplayEvents();
          });
      });
  }

  if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
          this.disabled = true;
          this.textContent = "Loading...";
          let newlyShown = 0;
          let currentVisible = allEventCards.filter(card => card.style.display === 'flex').length;

          allEventCards.forEach((card) => {
              if (card.style.display === 'none' && newlyShown < eventsPerPage) {
                   const category = card.getAttribute("data-category")?.toLowerCase() || "";
                   const matchesFilter = currentEventFilter === "all events" || category === currentEventFilter.replace(/s$/, "");
                   if(matchesFilter) {
                       card.style.display = "flex";
                       if (typeof AOS !== 'undefined') { // Apply AOS to newly loaded items
                           card.setAttribute('data-aos', 'fade-up');
                       }
                       newlyShown++;
                   }
              }
          });

           if (typeof AOS !== 'undefined') {
                AOS.refreshHard(); // Refresh AOS after adding new items
           }

          // Update button state after a short delay to simulate loading
          setTimeout(() => {
              const totalMatching = allEventCards.filter(card => {
                  const cat = card.getAttribute("data-category")?.toLowerCase() || "";
                  return currentEventFilter === "all events" || cat === currentEventFilter.replace(/s$/, "");
              }).length;
              const nowVisible = allEventCards.filter(card => card.style.display === 'flex').length;

              if (nowVisible >= totalMatching) {
                  loadMoreBtn.style.display = "none";
              } else {
                  loadMoreBtn.disabled = false;
                  loadMoreBtn.textContent = "Load More Events";
              }
          }, 500); // Simulate load time
      });
  }

  if (viewAllBtns.length > 0) {
      viewAllBtns.forEach(btn => {
          btn.addEventListener("click", function () {
              // In a real app, redirect or show all events
              alert("Showing all events (or redirecting to events page)...");
              // Example: Set filter to 'all' and display
              if (eventFilterButtons.length > 0) {
                  eventFilterButtons.forEach(b => b.classList.remove('active'));
                  eventFilterButtons[0].classList.add('active'); // Assume first is 'All'
                  currentEventFilter = 'all events';
                  filterAndDisplayEvents();
                  // Scroll to events section if needed
                  document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
              }
          });
      });
  }

  // Initial display
  filterAndDisplayEvents();

  // --- Contact Form ---
  const contactForm = document.querySelector(".form-container");
  if (contactForm) {
      const formInputs = contactForm.querySelectorAll(".form-control");
      const submitBtn = contactForm.querySelector(".btn-submit");
      const cancelBtn = contactForm.querySelector(".btn-cancel");

      // Add ripple effect to form buttons
      contactForm.querySelectorAll(".btn").forEach((btn) => {
          btn.addEventListener("click", function (e) {
              // Prevent ripple if button is disabled (e.g., during submit)
              if (btn.disabled) return;

              const rect = e.target.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const ripple = document.createElement("span");
              ripple.className = "ripple";
              ripple.style.left = `${x}px`;
              ripple.style.top = `${y}px`;
              this.appendChild(ripple);
              setTimeout(() => { ripple.remove(); }, 600);
          });
      });

       // Floating label and focus effect
       formInputs.forEach(input => {
           const label = input.nextElementSibling; // Assumes label follows input
           if (label && label.tagName === 'LABEL') {
               input.addEventListener('focus', () => {
                   input.parentElement.classList.add('focused');
               });
               input.addEventListener('blur', () => {
                   if (input.value === '') {
                       input.parentElement.classList.remove('focused');
                   }
               });
               // Initial check in case of pre-filled values
               if (input.value !== '') {
                   input.parentElement.classList.add('focused');
               }
           }
       });


      // Cancel button functionality
      if (cancelBtn) {
          cancelBtn.addEventListener("click", (e) => {
              e.preventDefault();
              contactForm.reset(); // Reset the form
              formInputs.forEach(input => {
                   input.parentElement.classList.remove('focused'); // Reset floating label
                   clearError(input); // Clear any validation errors
              });
          });
      }

      // Form submission with validation
      if (submitBtn) {
          submitBtn.addEventListener("click", (e) => {
              e.preventDefault();
              let isValid = true;
              formInputs.forEach(input => {
                  if (input.required && !validateInput(input)) {
                      isValid = false;
                  }
              });

              if (isValid) {
                  submitBtn.disabled = true;
                  submitBtn.classList.add("submitting");
                  const originalText = submitBtn.innerHTML;
                  submitBtn.innerHTML = '<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>';

                  // Simulate form submission
                  setTimeout(() => {
                      submitBtn.innerHTML = "SENT ✓";
                      submitBtn.style.background = "#28c840"; // Green success color
                      submitBtn.classList.remove("submitting");

                      // Show success notification
                      showNotification("Your message has been sent successfully!");

                      setTimeout(() => {
                          contactForm.reset();
                          formInputs.forEach(input => {
                               input.parentElement.classList.remove('focused');
                               clearError(input);
                          });
                          submitBtn.innerHTML = originalText;
                          submitBtn.style.background = ""; // Reset background
                          submitBtn.disabled = false;
                      }, 3000); // Reset after 3 seconds
                  }, 2000); // Simulate 2-second submission
              }
          });
      }

      // Real-time validation on blur (optional)
      formInputs.forEach(input => {
           input.addEventListener('blur', () => {
                if (input.required || input.value.trim() !== '') {
                     validateInput(input);
                }
           });
           input.addEventListener('input', () => clearError(input)); // Clear error on typing
      });
  }

  function validateInput(input) {
      clearError(input); // Clear previous errors first
      const value = input.value.trim();
      let isValid = true;
      let errorMessage = '';

      if (input.required && value === '') {
          isValid = false;
          errorMessage = `${input.labels[0]?.textContent || 'This field'} is required`;
      } else if (input.type === 'email' && value !== '' && !isValidEmail(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
      } else if (input.type === 'tel' && value !== '' && !isValidPhone(value)) {
           isValid = false;
           errorMessage = 'Please enter a valid phone number';
      } else if (input.tagName === 'TEXTAREA' && input.required && value.length < 10) {
           isValid = false;
           errorMessage = 'Message must be at least 10 characters';
      }


      if (!isValid) {
          showError(input, errorMessage);
      }
      return isValid;
  }

  function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function isValidPhone(phone) { return /^[\d\s+()-]{8,20}$/.test(phone); } // Basic phone validation

  function showError(input, message) {
       const formGroup = input.parentElement;
       let errorElement = formGroup.querySelector(".error-message");
       if (!errorElement) {
           errorElement = document.createElement('div');
           errorElement.className = 'error-message';
           formGroup.appendChild(errorElement);
       }
       errorElement.textContent = message;
       errorElement.classList.add('show'); // Make error visible
       input.style.borderColor = "#ff3860"; // Error border color
       input.classList.add("shake");
       setTimeout(() => input.classList.remove("shake"), 500);
  }

  function clearError(input) {
       const formGroup = input.parentElement;
       const errorElement = formGroup.querySelector(".error-message");
       if (errorElement) {
           errorElement.classList.remove('show'); // Hide error
           errorElement.textContent = ''; // Clear text
       }
       input.style.borderColor = ""; // Reset border color
  }

  // Success Notification Function
  function showNotification(message) {
       const notification = document.createElement("div");
       notification.className = "success-notification";
       notification.innerHTML = `<div class="success-icon">✓</div><div class="success-message">${message}</div>`;
       document.body.appendChild(notification);

       // Trigger transition
       setTimeout(() => { notification.classList.add('show'); }, 100);

       // Auto-remove after a few seconds
       setTimeout(() => {
           notification.classList.remove('show');
           setTimeout(() => { document.body.removeChild(notification); }, 300); // Remove after fade out
       }, 4000);
  }


  // --- Footer Functionality ---
  // Particles.js for Footer
  if (document.getElementById("footer-particles-js")) {
    particlesJS("footer-particles-js", {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#0083b0" }, // Use secondary color for footer
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 120, color: "#0083b0", opacity: 0.3, width: 1 },
        move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out", bounce: false },
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, resize: true },
        modes: { grab: { distance: 130, line_linked: { opacity: 0.7 } } },
      },
      retina_detect: true,
    });
  }

  // Back to top button
  const backToTopButton = document.getElementById("footer-backToTop");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Social icons tooltip (simple title attribute)
  document.querySelectorAll(".footer-social-icon").forEach((icon) => {
    const tooltipText = icon.getAttribute("data-tooltip");
    if (tooltipText) {
      icon.setAttribute("title", tooltipText); // Use native title for simplicity
    }
  });

}); // End DOMContentLoaded
