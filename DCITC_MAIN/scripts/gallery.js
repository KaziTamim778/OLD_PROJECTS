document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  
    // Initialize Main Particles.js
    if (document.getElementById("particles-js")) {
      particlesJS("particles-js", {
        /* Configuration... */
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#00b4db" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00b4db",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
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
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    }
  
    // Initialize Footer Particles.js
    if (document.getElementById("footer-particles-js")) {
      particlesJS("footer-particles-js", {
        /* Configuration... */
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: "#0083b0" },
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
            repulse: { distance: 100, duration: 0.4 },
            bubble: {
              distance: 200,
              size: 20,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
          },
        },
        retina_detect: true,
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
      menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("open");
        overlay.classList.toggle("active");
        document.body.style.overflow = navLinks.classList.contains("active")
          ? "hidden"
          : "";
      });
  
      overlay.addEventListener("click", function () {
        closeMobileMenu();
      });
      navItems.forEach((item) =>
        item.addEventListener("click", function () {
          closeMobileMenu();
        })
      );
  
      function closeMobileMenu() {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
  
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      navItems.forEach((item) => {
        const itemPage = item.getAttribute("href").split("/").pop();
        // Highlight if the filenames match, or if it's the root path and the link is index.html
        item.classList.toggle(
          "active",
          currentPage === itemPage ||
            (currentPage === "" && itemPage === "index.html")
        );
      });
  
      window.addEventListener("scroll", function () {
        navbarContainer.classList.toggle("scrolled", window.scrollY > 50);
      });
    } else {
      console.warn("Navbar elements not found.");
    }
  
    // --- Theme Toggle (Dark/Light Mode) ---
    const themeToggle = document.getElementById("themeToggle");
    const rootElement = document.documentElement;
    let isDarkMode = !rootElement.classList.contains("light");
  
    function applyTheme() {
      rootElement.classList.toggle("light", !isDarkMode);
      if (themeToggle) themeToggle.classList.toggle("light", !isDarkMode);
    }
    applyTheme(); // Apply initial theme
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        applyTheme();
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
  
    // --- Gallery Functionality ---
    class EnhancedGallery {
      constructor() {
        this.galleryGrid = document.getElementById("gallery-grid");
        this.modal = document.getElementById("gallery-modal");
        this.modalImage = document.getElementById("modal-image");
        this.modalTitle = document.getElementById("modal-title");
        this.closeButton = document.getElementById("modal-close");
        this.prevButton = document.getElementById("prev-button");
        this.nextButton = document.getElementById("next-button");
        this.thumbnailTrack = document.getElementById("thumbnail-track");
        this.thumbnailContainer = document.getElementById("thumbnail-container");
        this.thumbnailToggle = document.getElementById("thumbnail-toggle");
        this.slideshowButton = document.getElementById("slideshow-button");
        this.fullscreenButton = document.getElementById("fullscreen-button");
        this.imageCounter = document.getElementById("image-counter");
        this.imageDimensions = document.getElementById("image-dimensions");
  
        this.images = [];
        this.currentIndex = 0;
        this.slideshowActive = false;
        this.slideshowInterval = null;
        this.isFullscreen = false;
  
        if (!this.galleryGrid || !this.modal || !this.modalImage) {
          console.error("Gallery elements missing, cannot initialize.");
          return;
        }
  
        this.closeButton?.addEventListener("click", this.closeModal.bind(this));
        this.prevButton?.addEventListener("click", this.prevImage.bind(this));
        this.nextButton?.addEventListener("click", this.nextImage.bind(this));
        this.thumbnailToggle?.addEventListener(
          "click",
          this.toggleThumbnails.bind(this)
        );
        this.slideshowButton?.addEventListener(
          "click",
          this.toggleSlideshow.bind(this)
        );
        this.fullscreenButton?.addEventListener(
          "click",
          this.toggleFullscreen.bind(this)
        );
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener(
          "fullscreenchange",
          this.handleFullscreenChange.bind(this)
        );
  
        this.loadImages();
      }
  
      loadImages() {
        // Image data (manually assigned featured: true randomly)
        const imageFiles = [
          { path: "/Public/Gallery/FB 001.jpg", title: "Image 001", featured: true },
          { path: "/Public/Gallery/FB 002.jpg", title: "Image 002" },
          { path: "/Public/Gallery/FB 003.jpg", title: "Image 003", featured: true },
          { path: "/Public/Gallery/FB 004.jpg", title: "Image 004" },
          { path: "/Public/Gallery/FB 005.jpg", title: "Image 005" },
          { path: "/Public/Gallery/FB 006.jpg", title: "Image 006", featured: true },
          { path: "/Public/Gallery/FB 007.jpg", title: "Image 007" },
          { path: "/Public/Gallery/FB 008.jpg", title: "Image 008" },
          { path: "/Public/Gallery/FB 009.jpg", title: "Image 009" },
          { path: "/Public/Gallery/FB 010.jpg", title: "Image 010" },
          { path: "/Public/Gallery/FB 011.jpg", title: "Image 011", featured: true },
          { path: "/Public/Gallery/FB 012.jpg", title: "Image 012" },
          { path: "/Public/Gallery/FB 013.jpg", title: "Image 013" },
          { path: "/Public/Gallery/FB 014.jpg", title: "Image 014", featured: true },
          { path: "/Public/Gallery/FB 015.jpg", title: "Image 015" },
          { path: "/Public/Gallery/FB 016.jpg", title: "Image 016" },
          { path: "/Public/Gallery/FB 017.jpg", title: "Image 017", featured: true },
          { path: "/Public/Gallery/FB 018.jpg", title: "Image 018" },
          { path: "/Public/Gallery/FB 019.jpg", title: "Image 019" },
          { path: "/Public/Gallery/FB 020.jpg", title: "Image 020" },
          { path: "/Public/Gallery/FB 021.jpg", title: "Image 021" },
          { path: "/Public/Gallery/FB 022.jpg", title: "Image 022" },
          { path: "/Public/Gallery/FB 023.jpg", title: "Image 023", featured: true },
          { path: "/Public/Gallery/FB 024.jpg", title: "Image 024" },
          { path: "/Public/Gallery/FB 025.jpg", title: "Image 025" },
          { path: "/Public/Gallery/FB 026.jpg", title: "Image 026", featured: true },
          { path: "/Public/Gallery/FB 027.jpg", title: "Image 027" },
          { path: "/Public/Gallery/FB 028.jpg", title: "Image 028" },
          { path: "/Public/Gallery/FB 029.jpg", title: "Image 029", featured: true },
          { path: "/Public/Gallery/FB 030.jpg", title: "Image 030" },
          { path: "/Public/Gallery/FB 031.jpg", title: "Image 031" },
          { path: "/Public/Gallery/FB 032.jpg", title: "Image 032", featured: true },
          { path: "/Public/Gallery/FB 033.jpg", title: "Image 033" },
          { path: "/Public/Gallery/FB 034.jpg", title: "Image 034" },
          { path: "/Public/Gallery/FB 035.jpg", title: "Image 035", featured: true },
          { path: "/Public/Gallery/FB 036.jpg", title: "Image 036" },
          { path: "/Public/Gallery/FB 037.jpg", title: "Image 037" },
          { path: "/Public/Gallery/FB 038.jpg", title: "Image 038"},
          { path: "/Public/Gallery/FB 039.jpg", title: "Image 039" },
          { path: "/Public/Gallery/FB 040.jpg", title: "Image 040" },
          { path: "/Public/Gallery/FB 041.jpg", title: "Image 041", featured: true },
          { path: "/Public/Gallery/FB 042.jpg", title: "Image 042" },
          { path: "/Public/Gallery/FB 043.jpg", title: "Image 043" },
          { path: "/Public/Gallery/FB 044.jpg", title: "Image 044", featured: true },
          { path: "/Public/Gallery/FB 045.jpg", title: "Image 045" },
          { path: "/Public/Gallery/FB 046.jpg", title: "Image 046" },
          { path: "/Public/Gallery/FB 047.jpg", title: "Image 047", featured: true },
          { path: "/Public/Gallery/FB 048.jpg", title: "Image 048" },
          { path: "/Public/Gallery/FB 049.jpg", title: "Image 049" },
          { path: "/Public/Gallery/FB 050.jpg", title: "Image 050", featured: true },
          { path: "/Public/Gallery/FB 051.jpg", title: "Image 051" },
          { path: "/Public/Gallery/FB 052.jpg", title: "Image 052" },
          { path: "/Public/Gallery/FB 053.jpg", title: "Image 053" },
          { path: "/Public/Gallery/FB 054.jpg", title: "Image 054" },
          { path: "/Public/Gallery/FB 055.jpg", title: "Image 055" },
          { path: "/Public/Gallery/FB 056.jpg", title: "Image 056" },
          { path: "/Public/Gallery/FB 057.jpg", title: "Image 057" },
          { path: "/Public/Gallery/FB 058.jpg", title: "Image 058" },
          { path: "/Public/Gallery/FB 059.jpg", title: "Image 059" },
          { path: "/Public/Gallery/FB 060.jpg", title: "Image 060" },
          { path: "/Public/Gallery/FB 061.jpg", title: "Image 061" },
          { path: "/Public/Gallery/FB 062.jpg", title: "Image 062" },
          { path: "/Public/Gallery/FB 063.jpg", title: "Image 063" , featured: true, },
          { path: "/Public/Gallery/FB 064.jpg", title: "Image 064" },
          { path: "/Public/Gallery/FB 065.jpg", title: "Image 065" },
          { path: "/Public/Gallery/FB 066.jpg", title: "Image 066" },
          { path: "/Public/Gallery/FB 067.jpg", title: "Image 067" },
          { path: "/Public/Gallery/FB 068.jpg", title: "Image 068" , featured: true, },
          { path: "/Public/Gallery/FB 069.jpg", title: "Image 069" },
          { path: "/Public/Gallery/FB 070.jpg", title: "Image 070" },
          { path: "/Public/Gallery/FB 071.jpg", title: "Image 071" },
          { path: "/Public/Gallery/FB 072.jpg", title: "Image 072" },
          { path: "/Public/Gallery/FB 073.jpg", title: "Image 073" },
          { path: "/Public/Gallery/FB 074.jpg", title: "Image 074" , featured: true, },
          { path: "/Public/Gallery/FB 075.jpg", title: "Image 075" },
          { path: "/Public/Gallery/FB 076.jpg", title: "Image 076" },
          { path: "/Public/Gallery/FB 077.jpg", title: "Image 077" },
          { path: "/Public/Gallery/FB 078.jpg", title: "Image 078" },
          { path: "/Public/Gallery/FB 079.jpg", title: "Image 079" },
          { path: "/Public/Gallery/FB 080.jpg", title: "Image 080" },
          { path: "/Public/Gallery/FB 081.jpg", title: "Image 081" },
          { path: "/Public/Gallery/FB 082.jpg", title: "Image 082" , featured: true, },
          { path: "/Public/Gallery/FB 083.jpg", title: "Image 083" },
          { path: "/Public/Gallery/FB 084.jpg", title: "Image 084"  , featured: true,},
          { path: "/Public/Gallery/FB 085.jpg", title: "Image 085" },
          { path: "/Public/Gallery/FB 086.jpg", title: "Image 086" },
          { path: "/Public/Gallery/FB 087.jpg", title: "Image 087" },
          { path: "/Public/Gallery/FB 088.jpg", title: "Image 088" , featured: true, },
          { path: "/Public/Gallery/FB 089.jpg", title: "Image 089" },
          { path: "/Public/Gallery/FB 090.jpg", title: "Image 090" },
          { path: "/Public/Gallery/FB 091.jpg", title: "Image 091" },
          { path: "/Public/Gallery/FB 092.jpg", title: "Image 092" },
          { path: "/Public/Gallery/FB 093.jpg", title: "Image 093" },
          { path: "/Public/Gallery/FB 094.jpg", title: "Image 094" },
          { path: "/Public/Gallery/FB 095.jpg", title: "Image 095" },
          { path: "/Public/Gallery/FB 096.jpg", title: "Image 096" },
          { path: "/Public/Gallery/FB 097.jpg", title: "Image 097" },
          { path: "/Public/Gallery/FB 098.jpg", title: "Image 098" },
          { path: "/Public/Gallery/FB 099.jpg", title: "Image 099" },
          { path: "/Public/Gallery/FB 100.jpg", title: "Image 100" },
          { path: "/Public/Gallery/FB 101.jpg", title: "Image 101" },
          { path: "/Public/Gallery/FB 102.jpg", title: "Image 102" },
          { path: "/Public/Gallery/FB 103.jpg", title: "Image 103" },
          { path: "/Public/Gallery/FB 104.jpg", title: "Image 104" },
          { path: "/Public/Gallery/FB 105.jpg", title: "Image 105" },
          { path: "/Public/Gallery/FB 106.jpg", title: "Image 106" },
          { path: "/Public/Gallery/FB 107.jpg", title: "Image 107" },
          { path: "/Public/Gallery/FB 108.jpg", title: "Image 108" },
          { path: "/Public/Gallery/FB 109.jpg", title: "Image 109" },
          { path: "/Public/Gallery/FB 110.jpg", title: "Image 110" },
          { path: "/Public/Gallery/FB 111.jpg", title: "Image 111" , featured: true, },
          { path: "/Public/Gallery/FB 112.jpg", title: "Image 112" },
          { path: "/Public/Gallery/FB 113.jpg", title: "Image 113" },
          { path: "/Public/Gallery/FB 114.jpg", title: "Image 114" },
          { path: "/Public/Gallery/FB 115.jpg", title: "Image 115" },
          { path: "/Public/Gallery/FB 116.jpg", title: "Image 116" },
          { path: "/Public/Gallery/FB 117.jpg", title: "Image 117" },
          { path: "/Public/Gallery/FB 118.jpg", title: "Image 118" },
          { path: "/Public/Gallery/FB 119.jpg", title: "Image 119" },
          { path: "/Public/Gallery/FB 120.jpg", title: "Image 120" , featured: true, },
          { path: "/Public/Gallery/FB 121.jpg", title: "Image 121"  , featured: true,},
          { path: "/Public/Gallery/FB 122.jpg", title: "Image 122" },
          { path: "/Public/Gallery/FB 123.jpg", title: "Image 123" },
          { path: "/Public/Gallery/FB 124.jpg", title: "Image 124" },
          { path: "/Public/Gallery/FB 125.jpg", title: "Image 125" },
          { path: "/Public/Gallery/FB 126.jpg", title: "Image 126" },
          { path: "/Public/Gallery/FB 127.jpg", title: "Image 127" },
          { path: "/Public/Gallery/FB 128.jpg", title: "Image 128" },
          { path: "/Public/Gallery/FB 129.jpg", title: "Image 129" },
          { path: "/Public/Gallery/FB 130.jpg", title: "Image 130" },
          { path: "/Public/Gallery/FB 131.webp", title: "Image 131" },
          { path: "/Public/Gallery/FB 132.jpg", title: "Image 132" },
          { path: "/Public/Gallery/FB 133.jpg", title: "Image 133" },
          { path: "/Public/Gallery/FB 134.jpg", title: "Image 134" },
          { path: "/Public/Gallery/FB 135.jpg", title: "Image 135" },
          { path: "/Public/Gallery/FB 136.jpg", title: "Image 136" },
          { path: "/Public/Gallery/FB 137.jpg", title: "Image 137" },
          { path: "/Public/Gallery/FB 138.jpg", title: "Image 138" },
          { path: "/Public/Gallery/FB 139.jpg", title: "Image 139" },
          { path: "/Public/Gallery/FB 140.jpg", title: "Image 140" },
          { path: "/Public/Gallery/FB 141.jpg", title: "Image 141" },
          { path: "/Public/Gallery/FB 142.jpg", title: "Image 142" },
          { path: "/Public/Gallery/FB 143.jpg", title: "Image 143" }
        ];
        this.images = imageFiles;
        this.renderGallery();
      }
  
      renderGallery() {
        this.galleryGrid.innerHTML = "";
        this.images.forEach((image, index) => {
          const item = document.createElement("div");
          item.className = `gallery-item${image.featured ? " featured" : ""}`;
          item.dataset.aos = "fade-up"; // Add AOS animation
          item.dataset.aosDelay = (index % 6) * 50; // Stagger delay
  
          item.innerHTML = `
                      <img src="${image.path}" alt="${
            image.title || "Gallery image"
          }" loading="lazy"> <!-- Added lazy loading -->
                      <div class="image-overlay">
                          <h3 class="image-title">${
                            image.title || "Image " + (index + 1)
                          }</h3>
                      </div>
                  `;
  
          item.addEventListener("click", () => this.openModal(index));
          this.galleryGrid.appendChild(item);
        });
        AOS.refresh(); // Refresh AOS after adding items
      }
  
      renderThumbnails() {
        if (!this.thumbnailTrack) return;
        this.thumbnailTrack.innerHTML = "";
        this.images.forEach((image, index) => {
          const thumbnail = document.createElement("div");
          thumbnail.className = `thumbnail${
            index === this.currentIndex ? " active" : ""
          }`;
          thumbnail.innerHTML = `<img src="${image.path}" alt="${
            image.title || "Thumbnail " + (index + 1)
          }" loading="lazy">`;
          thumbnail.addEventListener("click", () => {
            this.currentIndex = index;
            this.updateModalImage();
          });
          this.thumbnailTrack.appendChild(thumbnail);
        });
      }
  
      highlightActiveThumbnail() {
        if (!this.thumbnailTrack) return;
        const thumbnails = this.thumbnailTrack.querySelectorAll(".thumbnail");
        thumbnails.forEach((thumb, idx) => {
          thumb.classList.toggle("active", idx === this.currentIndex);
          if (idx === this.currentIndex) {
            thumb.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
        });
      }
  
      openModal(index) {
        this.currentIndex = index;
        this.renderThumbnails();
        this.updateModalImage();
        this.modal.classList.add("active");
        document.body.style.overflow = "hidden";
        this.updateButtonStates();
      }
  
      closeModal() {
        this.stopSlideshow();
        if (this.isFullscreen) this.toggleFullscreen(); // Exit fullscreen if active
        this.modal.classList.remove("active");
        document.body.style.overflow = "";
      }
  
      updateModalImage() {
        if (
          !this.modalImage ||
          !this.modalTitle ||
          !this.imageCounter ||
          this.images.length === 0
        )
          return;
  
        const image = this.images[this.currentIndex];
        this.modalImage.classList.remove("fade");
        void this.modalImage.offsetWidth;
        this.modalImage.classList.add("fade");
  
        this.modalImage.src = image.path;
        this.modalImage.alt = image.title || "Gallery image";
        this.modalTitle.textContent =
          image.title || "Image " + (this.currentIndex + 1);
        this.imageCounter.textContent = `${this.currentIndex + 1} / ${
          this.images.length
        }`;
  
        // Preload next/prev images for smoother transition
        this.preloadAdjacentImages();
  
        // Get image dimensions after it loads
        const tempImg = new Image();
        tempImg.onload = () => {
          if (this.imageDimensions)
            this.imageDimensions.textContent = `${tempImg.naturalWidth} × ${tempImg.naturalHeight}`;
          image.dimensions = `${tempImg.naturalWidth} × ${tempImg.naturalHeight}`; // Cache dimensions
        };
        tempImg.onerror = () => {
          if (this.imageDimensions)
            this.imageDimensions.textContent = "Dimensions N/A";
        };
        tempImg.src = image.path;
  
        this.highlightActiveThumbnail();
        this.updateButtonStates(); // Update button states when image changes
        // Reset slideshow timer if it was running
        if (this.slideshowActive) {
          this.stopSlideshow();
          this.startSlideshow();
        }
      }
  
      preloadAdjacentImages() {
        const prevIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        if (prevIndex !== this.currentIndex)
          new Image().src = this.images[prevIndex].path;
        if (nextIndex !== this.currentIndex)
          new Image().src = this.images[nextIndex].path;
      }
  
      prevImage() {
        this.currentIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateModalImage();
      }
  
      nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateModalImage();
      }
  
      toggleThumbnails() {
        if (!this.thumbnailContainer || !this.thumbnailToggle) return;
        const isHidden = this.thumbnailContainer.classList.toggle("hidden");
        this.thumbnailToggle.innerHTML = isHidden
          ? '<i class="fas fa-th"></i>'
          : '<i class="fas fa-times"></i>';
        this.thumbnailToggle.title = isHidden
          ? "Show Thumbnails"
          : "Hide Thumbnails";
      }
  
      toggleSlideshow() {
        if (!this.slideshowButton) return;
        this.slideshowActive = !this.slideshowActive;
        if (this.slideshowActive) this.startSlideshow();
        else this.stopSlideshow();
        this.updateButtonStates();
      }
  
      startSlideshow() {
        this.slideshowActive = true;
        this.slideshowInterval = setInterval(() => this.nextImage(), 3000);
      }
  
      stopSlideshow() {
        this.slideshowActive = false;
        clearInterval(this.slideshowInterval);
      }
  
      toggleFullscreen() {
        if (!this.modal) return;
        if (!document.fullscreenElement) {
          this.modal.requestFullscreen().catch((err) => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
          });
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
  
      handleFullscreenChange() {
        this.isFullscreen = !!document.fullscreenElement;
        if (this.modal)
          this.modal.classList.toggle("fullscreen-mode", this.isFullscreen);
        this.updateButtonStates();
      }
  
      updateButtonStates() {
        if (this.slideshowButton) {
          this.slideshowButton.innerHTML = this.slideshowActive
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
          this.slideshowButton.title = this.slideshowActive
            ? "Pause Slideshow"
            : "Start Slideshow";
        }
        if (this.fullscreenButton) {
          this.fullscreenButton.innerHTML = this.isFullscreen
            ? '<i class="fas fa-compress"></i>'
            : '<i class="fas fa-expand"></i>';
          this.fullscreenButton.title = this.isFullscreen
            ? "Exit Fullscreen"
            : "Enter Fullscreen";
        }
        if (this.thumbnailToggle) {
          const isHidden = this.thumbnailContainer?.classList.contains("hidden");
          this.thumbnailToggle.innerHTML = isHidden
            ? '<i class="fas fa-th-large"></i>'
            : '<i class="fas fa-times"></i>'; // Use different icons maybe
          this.thumbnailToggle.title = isHidden
            ? "Show Thumbnails"
            : "Hide Thumbnails";
        }
      }
  
      handleKeyDown(e) {
        if (!this.modal?.classList.contains("active")) return;
  
        switch (e.key) {
          case "Escape":
            this.closeModal();
            break;
          case "ArrowLeft":
            this.prevImage();
            break;
          case "ArrowRight":
            this.nextImage();
            break;
          case " ":
            this.toggleSlideshow();
            e.preventDefault();
            break;
          case "f":
          case "F":
            this.toggleFullscreen();
            break;
          case "t":
          case "T":
            this.toggleThumbnails();
            break;
        }
      }
    }
  
    // Initialize the enhanced gallery
    const gallery = new EnhancedGallery();
  });
