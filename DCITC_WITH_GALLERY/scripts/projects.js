document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Initialize Particles.js for Main Background
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } }, // Slightly fewer particles
        color: { value: "#00b4db" }, // Use primary color
        shape: { type: "circle" },
        opacity: {
          value: 0.4,
          random: true,
          anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false },
        },
        size: { value: 2.5, random: true, anim: { enable: false } },
        line_linked: {
          enable: true,
          distance: 160,
          color: "#0083b0",
          opacity: 0.25,
          width: 1,
        }, // Use secondary color, adjust opacity
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 150, line_linked: { opacity: 0.6 } },
          push: { particles_nb: 3 },
        },
      },
      retina_detect: true,
    });
  }

  // Initialize Particles.js for Footer Background (Copied from about.txt)
  if (document.getElementById("footer-particles-js")) {
    particlesJS("footer-particles-js", {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#0083b0" }, // Footer particle color
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: 2.5, random: true },
        line_linked: {
          enable: true,
          distance: 120,
          color: "#0083b0",
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.8,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 130, line_linked: { opacity: 0.7 } },
          push: { particles_nb: 3 },
        },
      },
      retina_detect: true,
    });
  }

  // --- Navbar Functionality (Copied from about.txt) ---
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
      // Toggle body scroll based on menu state
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking overlay
    overlay.addEventListener("click", function () {
      closeMobileMenu();
    });

    // Close menu when clicking on a link (for single-page apps or smooth scroll)
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Check if it's a hash link for the current page or a different page
        if (
          item.getAttribute("href").startsWith("#") ||
          item.getAttribute("href").split("/").pop() ===
            window.location.pathname.split("/").pop()
        ) {
          if (navLinks.classList.contains("active")) {
            closeMobileMenu();
          }
        }
        // No need to explicitly remove active class here, handled by page load logic below
      });
    });

    function closeMobileMenu() {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
      overlay.classList.remove("active");
      document.body.style.overflow = ""; // Restore scroll
    }

    // Active link highlighting based on current page filename
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html"; // Default to index if path is '/'
    navItems.forEach((item) => {
      const itemPage =
        item.getAttribute("href").split("/").pop() || "index.html";
      // Use includes for flexibility (e.g., projects_v02.txt vs projects_v03.html)
      // Be more specific if needed
      if (currentPage.includes("project") && itemPage.includes("project")) {
        item.classList.add("active");
      } else if (currentPage === itemPage) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Scroll event for sticky navbar
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        // Adjust scroll distance if needed
        navbarContainer.classList.add("scrolled");
      } else {
        navbarContainer.classList.remove("scrolled");
      }
    });
  } else {
    console.warn(
      "Navbar elements not found. Navbar functionality might be limited."
    );
  }

  // --- Theme Toggle (Dark/Light Mode - Copied from about.txt) ---
  const themeToggle = document.getElementById("themeToggle");
  const rootElement = document.documentElement; // Target <html> for class toggle

  // Function to apply the theme based on the isDarkMode variable
  function applyTheme(isDarkMode) {
    rootElement.classList.toggle("light", !isDarkMode);
    if (themeToggle) {
      // Visually update the toggle button itself if needed (optional)
      // Example: themeToggle.setAttribute('aria-pressed', isDarkMode);
    }
    // Update particles based on theme (optional)
    // You might need to destroy and reinitialize particlesJS with different colors
  }

  // Function to get the preferred theme
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
    // Default to dark theme if no preference or OS preference
    // return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    return "dark"; // Defaulting to dark as per original :root
  }

  let currentTheme = getPreferredTheme();
  let isDarkMode = currentTheme === "dark";

  // Apply the initial theme when the page loads
  applyTheme(isDarkMode);

  // Add event listener to the toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      isDarkMode = !isDarkMode; // Toggle the state
      currentTheme = isDarkMode ? "dark" : "light";
      localStorage.setItem("theme", currentTheme); // Store the preference
      applyTheme(isDarkMode); // Apply the new theme
    });
  }

  // --- Category filtering (Original Projects Page JS) ---
  const categoryButtons = document.querySelectorAll(".category-button");
  const projectSections = document.querySelectorAll(".projects-section");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      // Show/hide project sections based on category
      projectSections.forEach((section) => {
        // Check if the section matches the category OR if 'all' is selected
        const shouldShow =
          category === "all" ||
          section.getAttribute("data-category") === category;
        section.style.display = shouldShow ? "block" : "none";

        // Apply AOS animation if showing, remove if hiding (optional, for smoother transitions)
        if (shouldShow) {
          section.querySelectorAll("[data-aos]").forEach((el) => {
            el.classList.add("aos-animate"); // Re-trigger animation if needed
          });
        } else {
          section.querySelectorAll("[data-aos]").forEach((el) => {
            el.classList.remove("aos-animate");
          });
        }
      });

      // Refresh AOS to recognize the changes in element visibility/position
      setTimeout(() => {
        AOS.refreshHard(); // Use refreshHard for potentially drastic layout changes
      }, 50); // Short delay to allow display changes to render
    });
  });

  // --- Initialize CountUp.js for stat numbers (Original Projects Page JS) ---
  const countUpOptions = {
    duration: 2.5,
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
  };

  // Function to start countUp animation when element is in view
  function startCountUpAnimation(targetId, endVal) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check if animation already ran
            if (!targetElement.dataset.counted) {
              new CountUp(targetId, endVal, countUpOptions).start();
              targetElement.dataset.counted = "true"; // Mark as counted
            }
            observer.unobserve(targetElement); // Stop observing once animated
          }
        });
      },
      { threshold: 0.5 }
    ); // Trigger when 50% visible

    observer.observe(targetElement);
  }

  // Start animations for overview stats
  startCountUpAnimation("total-projects", 17);
  startCountUpAnimation("total-contributors", 28);
  startCountUpAnimation("total-commits", 186);
  startCountUpAnimation("active-projects", 12);

  // --- Footer Back-to-Top Button (Copied from about.txt) ---
  const backToTopButton = document.getElementById("footer-backToTop");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        // Show after scrolling 300px
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

  // --- Add Image Error Handling ---
  const projectImages = document.querySelectorAll(".project-image");
  projectImages.forEach((img) => {
    img.onerror = function () {
      // Hide the broken image
      this.style.display = "none";
      // Find the next sibling (the fallback div) and display it
      const fallback = this.nextElementSibling;
      if (fallback && fallback.classList.contains("project-image-fallback")) {
        fallback.style.display = "flex";
      }
    };
  });
}); // End DOMContentLoaded
