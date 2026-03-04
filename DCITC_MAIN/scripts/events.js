        
        const DateTime = luxon.DateTime;
        let currentCalendarDate = DateTime.now();
        const modalElement = document.getElementById('event-modal');
        const notificationCenter = document.getElementById('notification-center');
        const contentWrapper = document.getElementById('content-wrapper'); // Get main wrapper
        let countdownInterval = null; // To store the interval ID

        // --- Mock Event Data --- (Keep your mockEvents array here)
        const mockEvents = [
             { id: 1, title: "Global Tech Conference 2025", date: "2025-06-05", time: "09:00", duration: "3 days", location: "Virtual", type: "conference", featured: true, price: "paid", virtual: true, inPerson: false, description: "Join the world's largest tech gathering. Explore innovations in AI, cloud, and more.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Global+Tech+Conf', schedule: [{time: "09:00", title: "Opening Keynote", speaker: "Alex Chen"}, {time: "10:30", title: "AI Ethics Panel", speaker: "Dr. Anya Sharma"}], speakers: [{name: "Alex Chen", role: "CEO, Innovatech", image: "https://placehold.co/200x200/0083b0/ffffff?text=AC"}, {name: "Dr. Anya Sharma", role: "AI Ethicist", image: "https://placehold.co/200x200/0083b0/ffffff?text=AS"}] },
             { id: 2, title: "UX/UI Design Workshop", date: "2025-04-28", time: "10:00", duration: "1 day", location: "Creative Hub, Downtown", type: "workshop", featured: false, price: "paid", virtual: false, inPerson: true, description: "Master the principles of effective interface design with hands-on exercises.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=UX/UI+Workshop', schedule: [{time: "10:00", title: "Intro to UX Principles"}, {time: "13:00", title: "Prototyping Session"}], speakers: [{name: "Ben Carter", role: "Lead Designer", image: "https://placehold.co/200x200/0083b0/ffffff?text=BC"}] },
             { id: 3, title: "AI in Healthcare Webinar", date: "2025-05-10", time: "14:00", duration: "2 hours", location: "Online", type: "webinar", featured: false, price: "free", virtual: true, inPerson: false, description: "Discover how AI is transforming patient care, diagnostics, and drug discovery.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=AI+Healthcare', speakers: [{name: "Dr. Eva Rostova", role: "Medical AI Researcher", image: "https://placehold.co/200x200/0083b0/ffffff?text=ER"}] },
             { id: 4, title: "Frontend Developers Meetup", date: "2025-04-20", time: "18:30", duration: "3 hours", location: "Tech Cafe", type: "meetup", featured: false, price: "free", virtual: false, inPerson: true, description: "Network with local frontend developers, share projects, and discuss the latest trends.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Frontend+Meetup' },
             { id: 5, title: "Cloud Computing Workshop", date: "2025-05-22", time: "09:30", duration: "1 day", location: "Online", type: "workshop", featured: false, price: "paid", virtual: true, inPerson: false, description: "Learn about modern cloud infrastructure, serverless, and containerization.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Cloud+Workshop' },
             { id: 6, title: "Cybersecurity Summit", date: "2025-07-15", time: "09:00", duration: "4 days", location: "Grand Convention Center", type: "conference", featured: true, price: "paid", virtual: false, inPerson: true, description: "Protecting digital assets in an evolving threat landscape. Keynotes, workshops, and expo.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Cyber+Summit' },
             { id: 7, title: "Machine Learning Fundamentals", date: "2025-06-12", time: "10:00", duration: "6 hours", location: "Online", type: "workshop", featured: false, price: "free", virtual: true, inPerson: false, description: "From theory to practical implementations using Python libraries.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=ML+Workshop' },
             { id: 8, title: "Digital Marketing Trends Webinar", date: "2025-04-30", time: "11:00", duration: "1.5 hours", location: "Online", type: "webinar", featured: false, price: "free", virtual: true, inPerson: false, description: "Stay ahead: Explore the latest strategies in SEO, content marketing, and social media.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Marketing+Trends' },
             { id: 9, title: "Startup Networking Night", date: "2025-05-18", time: "19:00", duration: "3 hours", location: "The Innovation Loft", type: "meetup", featured: false, price: "free", virtual: false, inPerson: true, description: "Connect with founders, investors, and mentors in the local startup ecosystem.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Startup+Night' },
             { id: 10, title: "The Future of Work", date: "2025-04-22", time: "13:00", duration: "1 hour", location: "Online", type: "webinar", featured: false, price: "free", virtual: true, inPerson: false, description: "Expert panel discusses remote work strategies, hybrid models, and employee well-being.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Future+of+Work' },
             { id: 11, title: "Web3 Developer Conference", date: "2025-08-05", time: "10:00", duration: "3 days", location: "Metaverse & NYC", type: "conference", featured: true, price: "paid", virtual: true, inPerson: true, description: "Building the decentralized web: Explore blockchain, NFTs, DAOs, and the metaverse.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Web3+Conf' },
             { id: 12, title: "Tech Innovation Summit 2025", date: "2025-05-15", time: "09:00", duration: "3 days", location: "San Francisco, CA", type: "conference", featured: true, price: "paid", virtual: false, inPerson: true, description: "The premier tech conference for innovators and entrepreneurs. Join us for three days of immersive learning and networking.", image: 'https://placehold.co/800x400/00b4db/0c0c14?text=Innovation+Summit' }
         ];

        // --- Initialization ---
        document.addEventListener('DOMContentLoaded', () => {
            AOS.init({ duration: 800, once: true, offset: 50 }); // Adjusted offset
            initializeParticles('particles-js'); // Main background particles
            initializeParticles('footer-particles-js', true); // Footer particles with interactivity
            setupEventListeners();
            renderCalendar();
            updateEventCount();
            startCountdown(); // Start the featured event countdown
            populateDraggableEvents();
            filterAndDisplayEvents(); // Initial display
        });

        // --- ParticleJS Configuration ---
        function initializeParticles(elementId, interactive = false) {
            if (typeof particlesJS !== 'undefined' && document.getElementById(elementId)) {
                const config = { // Base Config
                    particles: { number: { value: elementId === 'particles-js' ? 80: 40, density: { enable: true, value_area: 800 } }, color: { value: elementId === 'particles-js' ? 'var(--primary-color)' : 'var(--secondary-color)' }, shape: { type: 'circle' }, opacity: { value: 0.4, random: true }, size: { value: elementId === 'particles-js' ? 3 : 2.5, random: true }, line_linked: { enable: true, distance: elementId === 'particles-js' ? 150 : 120, color: elementId === 'particles-js' ? 'var(--primary-color)' : 'var(--secondary-color)', opacity: elementId === 'particles-js' ? 0.2 : 0.3, width: 1 }, move: { enable: true, speed: elementId === 'particles-js' ? 2 : 1.8, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false } },
                    interactivity: { detect_on: 'canvas', events: { onhover: { enable: interactive, mode: 'grab' }, onclick: { enable: interactive, mode: 'push' }, resize: true }, modes: { grab: { distance: 130, line_linked: { opacity: 0.7 } }, push: { particles_nb: 3 } } },
                    retina_detect: true
                };
                // Update colors based on current theme before initializing
                const rootStyle = getComputedStyle(document.documentElement);
                config.particles.color.value = rootStyle.getPropertyValue(elementId === 'particles-js' ? '--primary-color' : '--secondary-color').trim();
                config.particles.line_linked.color = config.particles.color.value;

                particlesJS(elementId, config);
            } else if (!document.getElementById(elementId)) {
                 console.warn(`Particles element #${elementId} not found.`);
            } else {
                 console.error("particlesJS not loaded");
            }
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
                document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
            });

            overlay.addEventListener("click", function () { closeMobileMenu(); });
            navItems.forEach(item => item.addEventListener("click", function() { closeMobileMenu(); }));

            function closeMobileMenu() {
                 navLinks.classList.remove("active");
                 hamburger.classList.remove("open");
                 overlay.classList.remove("active");
                 document.body.style.overflow = "";
            }

             const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Default to index if path is root
             navItems.forEach(item => {
                 const itemPage = item.getAttribute('href').split('/').pop();
                 item.classList.toggle('active', currentPage === itemPage || (currentPage === '' && itemPage === 'index.html'));
             });


            window.addEventListener("scroll", function() {
                navbarContainer.classList.toggle("scrolled", window.scrollY > 50);
            });
        } else {
            console.warn("Navbar elements not found.");
        }

        // --- Theme Toggle (Dark/Light Mode) ---
        const themeToggle = document.getElementById('themeToggle');
        const rootElement = document.documentElement;
        // Prefer system theme, fallback to dark
        let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? false : true;
        // Check local storage override
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            isDarkMode = storedTheme === 'dark';
        }

        function applyTheme() {
            rootElement.classList.toggle('light', !isDarkMode);
            if (themeToggle) themeToggle.classList.toggle('light', !isDarkMode);
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            // Re-initialize particles with potentially new colors
            initializeParticles('particles-js');
            initializeParticles('footer-particles-js', true);
        }
        applyTheme(); // Apply initial theme

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                isDarkMode = !isDarkMode;
                applyTheme();
            });
        }
         // Listen for system theme changes
         window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
             if (!localStorage.getItem('theme')) { // Only change if user hasn't manually set
                 isDarkMode = !event.matches;
                 applyTheme();
             }
         });

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


        // --- Event Listeners Setup ---
        function setupEventListeners() {
            document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', handleViewToggle));
            document.querySelectorAll('.sort-btn').forEach(btn => btn.addEventListener('click', handleSortFilter));
            document.querySelectorAll('.event-tag').forEach(tag => tag.addEventListener('click', handleTagFilter));
            document.querySelector('.search-input')?.addEventListener('input', handleSearch);
            modalElement?.querySelector('.modal-close')?.addEventListener('click', closeModal);
            modalElement?.addEventListener('click', (e) => { if (e.target === modalElement) closeModal(); });
            modalElement?.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', handleModalTabSwitch));
            document.getElementById('prev-month')?.addEventListener('click', () => changeMonth(-1));
            document.getElementById('next-month')?.addEventListener('click', () => changeMonth(1));
            document.getElementById('today')?.addEventListener('click', goToToday);
            document.getElementById('events-grid')?.addEventListener('click', handleEventCardClick);
            document.getElementById('draggable-events')?.addEventListener('click', handleEventCardClick);
            document.querySelector('.featured-events')?.addEventListener('click', handleEventCardClick); // Add listener for featured event clicks
            document.querySelector('.draggable-prev')?.addEventListener('click', () => scrollDraggable(-1));
            document.querySelector('.draggable-next')?.addEventListener('click', () => scrollDraggable(1));
            setupDraggableScroll();
            document.getElementById('view-all-recommended')?.addEventListener('click', (e) => {
                e.preventDefault();
                // Example: Set filter to 'all' and switch to grid view
                document.querySelector('.sort-btn[data-sort="all"]')?.click();
                document.querySelector('.view-btn[data-view="grid"]')?.click();
                document.querySelector('.section-header')?.scrollIntoView({behavior: 'smooth'});
                showNotification('Showing All Events', 'Filter reset to show all available events.', 'info');
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalElement?.classList.contains('active')) {
                    closeModal();
                }
            });
        }

        // --- Event Handlers ---
        function handleViewToggle(event) {
            const btn = event.currentTarget;
            const view = btn.dataset.view;
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const gridView = document.getElementById('events-grid');
            const calendarView = document.getElementById('calendar-view');

            if (view === 'grid') {
              if(gridView) gridView.style.display = 'grid';
              if(calendarView) calendarView.style.display = 'none';
            } else {
              if(gridView) gridView.style.display = 'none';
              if(calendarView) calendarView.style.display = 'block';
              renderCalendar(); // Re-render calendar
            }
        }

        function handleSortFilter(event) {
            const btn = event.currentTarget;
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndDisplayEvents();
        }

        function handleTagFilter(event) {
            const tag = event.currentTarget;
            document.querySelectorAll('.event-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            filterAndDisplayEvents();
        }

        function handleSearch() { filterAndDisplayEvents(); }

        function handleEventCardClick(event) {
            // Find the closest ancestor that is a card or button triggering the modal
            const card = event.target.closest('.event-card, .draggable-item, .standalone-event');
            const button = event.target.closest('.event-button, .standalone-button');
            let eventId = null;

            // Prioritize button click if it's inside a card
            if (button) {
                const parentCard = button.closest('[data-event-id]'); // Find nearest parent with event ID
                if (parentCard) {
                    eventId = parseInt(parentCard.dataset.eventId, 10);
                }
            }
            // If no button was clicked, or button wasn't in a card, check the card itself
            else if (card && card.dataset.eventId) {
                 eventId = parseInt(card.dataset.eventId, 10);
            }


            if (eventId !== null) {
                const eventData = mockEvents.find(e => e.id === eventId);
                if (eventData) {
                    openModal(eventData);
                } else {
                     console.warn("Event data not found for ID:", eventId);
                     showNotification('Error', 'Could not find event details.', 'error');
                }
            }
            // else: Click was likely on empty space within the container, do nothing.
        }


        function handleModalTabSwitch(event) {
            const btn = event.currentTarget;
            const tabId = btn.dataset.tab;
            if (!modalElement) return;

            modalElement.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            modalElement.querySelectorAll('.tab-content').forEach(c => {
                c.classList.remove('active');
                c.hidden = true;
                c.removeAttribute('aria-hidden'); // Ensure aria-hidden is removed if previously set
            });

            const contentToShow = modalElement.querySelector(`#tab-${tabId}`);
            if(contentToShow) {
                contentToShow.classList.add('active');
                contentToShow.hidden = false;
            }

            // Set aria-hidden on inactive tabs for better accessibility
            modalElement.querySelectorAll('.tab-content:not(.active)').forEach(c => {
                c.setAttribute('aria-hidden', 'true');
            });
        }

        // --- Filtering and Display Logic ---
        function filterAndDisplayEvents() {
            const gridContainer = document.getElementById('events-grid');
            if (!gridContainer) return;

            const selectedSort = document.querySelector('.sort-btn.active')?.dataset.sort || 'all';
            const selectedTag = document.querySelector('.event-tag.active')?.dataset.filter || 'all';
            const searchQuery = document.querySelector('.search-input')?.value.toLowerCase().trim() || '';

            gridContainer.innerHTML = ''; // Clear grid
            let visibleCount = 0;
            const fragment = document.createDocumentFragment(); // Use fragment for better performance

            mockEvents.forEach((event, index) => {
                const typeMatch = selectedSort === 'all' || event.type === selectedSort;
                const tagMatch = checkTagFilter(event, selectedTag);
                const searchMatch = searchQuery === '' ||
                                    event.title.toLowerCase().includes(searchQuery) ||
                                    (event.description && event.description.toLowerCase().includes(searchQuery)) || // Check if description exists
                                    event.type.toLowerCase().includes(searchQuery) ||
                                    event.location.toLowerCase().includes(searchQuery); // Added location search

                if (typeMatch && tagMatch && searchMatch) {
                    const card = createEventCard(event, index);
                    fragment.appendChild(card);
                    visibleCount++;
                }
            });

            gridContainer.appendChild(fragment); // Append all cards at once
            updateEventCount(visibleCount);
            AOS.refresh(); // Refresh AOS for new items
        }


        function checkTagFilter(event, filter) {
            if (filter === 'all') return true;
            if (filter === 'upcoming') return DateTime.fromISO(event.date) >= DateTime.now().startOf('day');
            if (filter === 'featured') return event.featured === true;
            if (filter === 'free') return event.price === 'free';
            if (filter === 'paid') return event.price === 'paid';
            if (filter === 'virtual') return event.virtual === true;
            if (filter === 'in-person') return event.inPerson === true;
            return false;
        }

        function createEventCard(event, index) {
             const gridClasses = getGridPlacementClass(index + 1);
             const card = document.createElement('div');
             card.className = `event-card ${gridClasses}`;
             card.dataset.aos = "fade-up";
             card.dataset.aosDelay = (index % 6) * 50 + 100;
             card.dataset.type = event.type;
             card.dataset.featured = event.featured;
             card.dataset.price = event.price;
             card.dataset.virtual = event.virtual;
             card.dataset.inPerson = event.inPerson;
             card.dataset.eventId = event.id; // Crucial for modal linking

             if (event.featured) card.classList.add('featured');

              // Apply background image conditionally
             if (event.image && (gridClasses === 'event-1' || gridClasses === 'event-6' || gridClasses === 'event-11')) {
                 card.style.backgroundImage = `linear-gradient(45deg, rgba(var(--bg-body-rgb), 0.8), rgba(var(--bg-body-rgb), 0.6)), url('${event.image}')`;
                 card.style.backgroundSize = 'cover';
                 card.style.backgroundPosition = 'center';
                 card.style.color = 'var(--text-on-dark-surface)'; // Ensure text is readable
                 card.onerror = () => { // Basic image error handling for background
                      card.style.backgroundImage = `linear-gradient(45deg, rgba(var(--bg-body-rgb), 0.8), rgba(var(--bg-body-rgb), 0.6)), url('https://placehold.co/600x400/cccccc/333333?text=Img+Error')`;
                 }
             }

             const eventDate = DateTime.fromISO(event.date);
             const formattedDate = eventDate.isValid ? eventDate.toFormat('LLL dd, yyyy') : 'Date TBD';
             const eventTime = event.time ? `at ${formatTime(event.time)}` : '';

             card.innerHTML = `
                 ${isNewEvent(event.date) ? '<div class="new-badge">New</div>' : ''}
                 <div class="event-header">
                     <div class="date-badge">
                          <i class="fas fa-calendar-alt"></i>
                          ${formattedDate} ${eventTime}
                     </div>
                 </div>
                 <div class="event-content-main"> <h3 class="event-title">${event.title}</h3>
                    <p class="event-subtitle">${event.description ? truncateText(event.description, 80) : 'More details available.'}</p>
                 </div>
                 <div class="event-footer">
                     <div class="event-type">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</div>
                     <button class="event-button" title="View Event Details">
                         Details <i class="fas fa-arrow-right"></i>
                     </button>
                 </div>
             `;
             return card;
        }


        function getGridPlacementClass(itemNumber) {
            // Define specific placements
            const placements = {
                1: 'event-1', 2: 'event-2', 3: 'event-3', 4: 'event-4', 5: 'event-5',
                6: 'event-6', 7: 'event-7', 8: 'event-8', 9: 'event-9', 10: 'event-10',
                11: 'event-11'
            };
            // Return specific class or a default fallback
            return placements[itemNumber] || 'event-default';
        }

        function isNewEvent(eventDateStr) {
            const eventDate = DateTime.fromISO(eventDateStr);
            // Check if date is valid and within the last 7 days from now
            return eventDate.isValid && DateTime.now().diff(eventDate, 'days').days <= 7 && DateTime.now().diff(eventDate, 'days').days >= 0;
        }

        function formatTime(timeStr) {
            // Handles HH:mm or HH:mm:ss
            const dt = DateTime.fromISO(`1970-01-01T${timeStr}`);
            return dt.isValid ? dt.toFormat('h:mm a') : '';
        }

        function truncateText(text, maxLength) {
            if (!text) return ''; // Handle null or undefined text
            return text.length > maxLength ? text.substring(0, maxLength).trim() + '...' : text;
        }

        function updateEventCount(count = null) {
            const countElement = document.getElementById('event-count');
            if (!countElement) return;
            // If count is not provided, calculate from visible cards in the grid
            const currentCount = count ?? document.querySelectorAll('#events-grid .event-card').length;
            countElement.textContent = currentCount;
            updateTagCounts(); // Update tag counts whenever total count changes
        }

        function updateTagCounts() {
            const tags = document.querySelectorAll('.event-tag[data-filter]');
            tags.forEach(tag => {
                const filter = tag.dataset.filter;
                let count = 0;
                if (filter === 'all') {
                    count = mockEvents.length;
                } else {
                    count = mockEvents.filter(event => checkTagFilter(event, filter)).length;
                }
                const countSpan = tag.querySelector('span');
                if (countSpan) countSpan.textContent = count;
            });
        }

        // --- Calendar Logic ---
        function renderCalendar() {
            const calendarGrid = document.getElementById('calendar-grid-body');
            const monthYearTitle = document.getElementById('calendar-month-year');
            if (!calendarGrid || !monthYearTitle) return;

            monthYearTitle.textContent = currentCalendarDate.toFormat('LLLL yyyy'); // Correct format
            calendarGrid.innerHTML = `
                <div class="calendar-weekday">Sun</div> <div class="calendar-weekday">Mon</div>
                <div class="calendar-weekday">Tue</div> <div class="calendar-weekday">Wed</div>
                <div class="calendar-weekday">Thu</div> <div class="calendar-weekday">Fri</div>
                <div class="calendar-weekday">Sat</div>`;

            const firstDayOfMonth = currentCalendarDate.startOf('month');
            const lastDayOfMonth = currentCalendarDate.endOf('month');
            // Luxon weekday: 1 (Mon) to 7 (Sun). We want 0 (Sun) to 6 (Sat) for grid start.
            const firstDayWeekday = firstDayOfMonth.weekday % 7;
            const today = DateTime.now().startOf('day');

            // Add empty cells for days before the first of the month
            for (let i = 0; i < firstDayWeekday; i++) {
                calendarGrid.insertAdjacentHTML('beforeend', '<div class="calendar-day different-month"></div>');
            }

            // Add cells for each day of the month
            for (let day = firstDayOfMonth; day <= lastDayOfMonth; day = day.plus({ days: 1 })) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.dataset.date = day.toISODate();

                const dateSpan = document.createElement('span');
                dateSpan.className = 'calendar-date';
                dateSpan.textContent = day.day;
                dayElement.appendChild(dateSpan);

                if (day.hasSame(today, 'day')) dayElement.classList.add('current-day');

                const eventsOnDay = mockEvents.filter(event => DateTime.fromISO(event.date).hasSame(day, 'day'));
                if (eventsOnDay.length > 0) {
                    dayElement.classList.add('has-events');
                    dayElement.dataset.events = JSON.stringify(eventsOnDay.map(e => ({ id: e.id, title: e.title, time: e.time, type: e.type })));

                    const eventsContainer = document.createElement('div');
                    eventsContainer.className = 'calendar-events';
                    eventsOnDay.slice(0, 3).forEach(event => {
                        const eventDot = document.createElement('div');
                        eventDot.className = 'calendar-event-dot';
                        eventDot.style.backgroundColor = getEventTypeColor(event.type);
                        eventDot.title = event.title; // Add tooltip
                        eventsContainer.appendChild(eventDot);
                    });
                     if (eventsOnDay.length > 3) {
                        eventsContainer.insertAdjacentHTML('beforeend', `<div class="calendar-more-events">+${eventsOnDay.length - 3}</div>`);
                     }
                    dayElement.appendChild(eventsContainer);

                    const popup = createCalendarPopup(eventsOnDay);
                    dayElement.appendChild(popup);
                    dayElement.addEventListener('click', handleCalendarDayClick); // Add click listener only if there are events
                } else {
                     dayElement.style.cursor = 'default'; // No pointer if no events
                }
                calendarGrid.appendChild(dayElement);
            }

            // Add empty cells for days after the last of the month to complete the grid
            const totalDaysRendered = firstDayWeekday + lastDayOfMonth.day;
            const nextMultipleOf7 = Math.ceil(totalDaysRendered / 7) * 7;
            for (let i = totalDaysRendered; i < nextMultipleOf7; i++) {
                 calendarGrid.insertAdjacentHTML('beforeend', '<div class="calendar-day different-month"></div>');
            }
        }

        function getEventTypeColor(type) {
             // Use CSS variables for consistency if possible, otherwise fallback colors
             const rootStyle = getComputedStyle(document.documentElement);
             const colors = {
                 conference: rootStyle.getPropertyValue('--primary-color').trim() || '#00b4db',
                 workshop: '#ff9f43',
                 webinar: '#74b9ff',
                 meetup: '#55efc4',
                 social: '#a29bfe',
                 other: rootStyle.getPropertyValue('--text-secondary').trim() || '#aaaaaa'
             };
             return colors[type] || colors['other'];
        }

        function createCalendarPopup(events) {
             const popup = document.createElement('div');
             popup.className = 'calendar-event-popup';
             events.slice(0, 4).forEach(event => { // Show max 4 in popup
                 popup.insertAdjacentHTML('beforeend', `
                     <div class="popup-event" data-event-id="${event.id}"> ${event.time ? `<span class="popup-time">${formatTime(event.time)}</span>` : ''}
                         <p class="popup-title">${event.title}</p>
                     </div>
                 `);
             });
              if (events.length > 4) {
                  popup.insertAdjacentHTML('beforeend', `<div class="popup-event"><p class="popup-title">... and ${events.length - 4} more</p></div>`);
              }
             // Add click listener to popup events if needed later
             // popup.addEventListener('click', handlePopupEventClick);
             return popup;
        }


        function handleCalendarDayClick(event) {
             const dayElement = event.currentTarget;
             // Prevent opening modal if clicking directly on a popup item (if popup click is handled separately)
             // if (event.target.closest('.calendar-event-popup')) return;

             const eventsData = JSON.parse(dayElement.dataset.events || '[]');
             if (eventsData.length > 0) {
                 // Open modal with the first event on that day
                 const firstEventId = eventsData[0].id;
                 const fullEventData = mockEvents.find(e => e.id === firstEventId);
                 if (fullEventData) openModal(fullEventData);
             }
        }


        function changeMonth(offset) { currentCalendarDate = currentCalendarDate.plus({ months: offset }); renderCalendar(); }
        function goToToday() { currentCalendarDate = DateTime.now(); renderCalendar(); }

        // --- Modal Logic ---
        function openModal(eventData) {
             if (!eventData || !modalElement) return;

             modalElement.querySelector('#modal-title-h2').textContent = eventData.title;
             modalElement.querySelector('#modal-event-date').textContent = `${DateTime.fromISO(eventData.date).toFormat('DDDD')} ${eventData.time ? `at ${formatTime(eventData.time)}` : ''}`;
             modalElement.querySelector('#modal-event-location').textContent = eventData.location;
             modalElement.querySelector('#modal-event-type').textContent = eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1);
             modalElement.querySelector('#modal-event-description').textContent = eventData.description || 'No description available.';

             const imageElement = modalElement.querySelector('#modal-event-image');
             if (eventData.image) {
                 imageElement.style.backgroundImage = `url('${eventData.image}')`;
                 imageElement.style.display = 'block';
                 imageElement.onerror = () => { // Basic image error handling
                      imageElement.style.backgroundImage = `url('https://placehold.co/800x250/cccccc/333333?text=Image+Error')`;
                 }
             } else {
                 imageElement.style.display = 'none'; // Hide if no image
             }

             // Populate Schedule
             const scheduleList = modalElement.querySelector('#modal-schedule-list');
             scheduleList.innerHTML = (!eventData.schedule || eventData.schedule.length === 0)
                 ? '<p>No schedule details available.</p>'
                 : eventData.schedule.map(item => `
                     <div class="schedule-item">
                         <div class="schedule-time">${formatTime(item.time)}</div>
                         <div class="schedule-info">
                             <h4 class="schedule-title">${item.title}</h4>
                             ${item.speaker ? `<p class="schedule-speaker">${item.speaker}</p>` : ''}
                         </div>
                     </div>`).join('');

             // Populate Speakers
             const speakersGrid = modalElement.querySelector('#modal-speakers-grid');
             speakersGrid.innerHTML = (!eventData.speakers || eventData.speakers.length === 0)
                 ? '<p>No speaker information available.</p>'
                 : eventData.speakers.map(speaker => `
                     <div class="speaker-card">
                         <img src="${speaker.image || 'https://placehold.co/200x200/cccccc/333333?text=?'}" class="speaker-image" alt="${speaker.name}" loading="lazy" onerror="this.src='https://placehold.co/200x200/cccccc/333333?text=?'; this.onerror=null;">
                         <div class="speaker-info">
                             <h4 class="speaker-name">${speaker.name}</h4>
                             <p class="speaker-role">${speaker.role}</p>
                         </div>
                     </div>`).join('');

             // Reset tabs to 'About'
             handleModalTabSwitch({ currentTarget: modalElement.querySelector('#tab-btn-about') });

             modalElement.classList.add('active');
             document.body.style.overflow = 'hidden'; // Prevent background scroll
             modalElement.querySelector('.modal-close').focus(); // Focus close button for accessibility
        }


        function closeModal() {
             if (!modalElement) return;
             modalElement.classList.remove('active');
             document.body.style.overflow = ''; // Restore background scroll
        }


        // --- Countdown Timer ---
        function startCountdown() {
            // Clear any existing interval
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            updateCountdown(); // Run immediately
            countdownInterval = setInterval(updateCountdown, 1000); // Then run every second
        }

        function updateCountdown() {
             const countdownContainer = document.getElementById('summit-countdown');
             if (!countdownContainer) {
                 if (countdownInterval) clearInterval(countdownInterval); // Stop if container gone
                 return;
             }
             const summitEvent = mockEvents.find(e => e.id === 12); // Find the specific event (ID 12)
             if (!summitEvent) {
                 countdownContainer.innerHTML = '<span>Featured event details not found.</span>';
                 if (countdownInterval) clearInterval(countdownInterval);
                 return;
             }
             const targetDateStr = `${summitEvent.date}T${summitEvent.time || '00:00:00'}`; // Combine date and time
             const targetDate = DateTime.fromISO(targetDateStr);

             if (!targetDate.isValid) {
                 countdownContainer.innerHTML = '<span>Invalid event date.</span>';
                  if (countdownInterval) clearInterval(countdownInterval);
                 return;
             }

             const now = DateTime.now();
             const diff = targetDate.diff(now, ['days', 'hours', 'minutes', 'seconds', 'milliseconds']);

             if (diff.valueOf() <= 0) {
                 countdownContainer.innerHTML = '<span style="font-weight: bold; color: var(--primary-color);">Event has started!</span>';
                 if (countdownInterval) clearInterval(countdownInterval); // Stop countdown when event starts
             } else {
                 const parts = diff.toObject();
                 // Use Math.floor to get whole numbers
                 document.getElementById('countdown-days').textContent = Math.floor(parts.days);
                 document.getElementById('countdown-hours').textContent = Math.floor(parts.hours).toString().padStart(2, '0');
                 document.getElementById('countdown-mins').textContent = Math.floor(parts.minutes).toString().padStart(2, '0');
                 document.getElementById('countdown-secs').textContent = Math.floor(parts.seconds).toString().padStart(2, '0');
             }
        }

        // --- Draggable Events Section ---
        function populateDraggableEvents() {
             const container = document.getElementById('draggable-events');
             if (!container) return;
             container.innerHTML = ''; // Clear existing
             const upcomingEvents = mockEvents
                 .filter(event => DateTime.fromISO(event.date) >= DateTime.now().startOf('day') && !event.featured) // Filter upcoming, non-featured
                 .sort((a, b) => DateTime.fromISO(a.date) - DateTime.fromISO(b.date)) // Sort by date
                 .slice(0, 5); // Limit to 5

             upcomingEvents.forEach(event => {
                 const item = document.createElement('div');
                 item.className = 'draggable-item';
                 item.dataset.eventId = event.id; // Add event ID
                 const eventDate = DateTime.fromISO(event.date);
                 const formattedDate = eventDate.isValid ? eventDate.toFormat('LLL dd') : 'Date TBD';

                 item.innerHTML = `
                     <div class="event-card-horizontal">
                         <div class="event-image" style="background-image: url('${event.image || 'https://placehold.co/300x180/cccccc/333333?text=Event'}')" onerror="this.style.backgroundImage='url(https://placehold.co/300x180/cccccc/333333?text=Event)'"></div>
                         <div class="event-card-content">
                             <div class="date-badge">
                                 <i class="fas fa-calendar-alt"></i>
                                 ${formattedDate} ${event.time ? `@ ${formatTime(event.time)}` : ''}
                             </div>
                             <h4 class="event-title">${truncateText(event.title, 35)}</h4>
                             <p class="event-subtitle">${truncateText(event.description, 45)}</p>
                             <div class="event-footer">
                                 <div class="event-type">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</div>
                                 <button class="event-button" title="View Event Details">Details</button>
                             </div>
                         </div>
                     </div>
                 `;
                 container.appendChild(item);
             });
        }

        function scrollDraggable(direction) {
             const container = document.getElementById('draggable-events');
             if (!container) return;
             // Scroll by approx one card width + gap
             const cardWidth = container.querySelector('.draggable-item')?.offsetWidth || 330;
             const gap = parseInt(getComputedStyle(container).gap) || 15;
             const scrollAmount = (cardWidth + gap) * direction;
             container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }

        function setupDraggableScroll() {
             const slider = document.getElementById('draggable-events');
             if (!slider) return;
             let isDown = false, startX, scrollLeft;

             const startDragging = (e) => {
                 isDown = true;
                 slider.classList.add('dragging');
                 startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
                 scrollLeft = slider.scrollLeft;
                 slider.style.cursor = 'grabbing';
             };
             const stopDragging = () => {
                 if (!isDown) return;
                 isDown = false;
                 slider.classList.remove('dragging');
                 slider.style.cursor = 'grab';
             };
             const whileDragging = (e) => {
                 if (!isDown) return;
                 e.preventDefault(); // Prevent text selection etc.
                 const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
                 const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
                 slider.scrollLeft = scrollLeft - walk;
             };

             // Mouse events
             slider.addEventListener('mousedown', startDragging);
             slider.addEventListener('mouseleave', stopDragging);
             slider.addEventListener('mouseup', stopDragging);
             slider.addEventListener('mousemove', whileDragging);
             // Touch events
             slider.addEventListener('touchstart', startDragging, { passive: true }); // Use passive where possible
             slider.addEventListener('touchend', stopDragging);
             slider.addEventListener('touchcancel', stopDragging);
             slider.addEventListener('touchmove', whileDragging, { passive: false }); // Need false to preventDefault

             slider.addEventListener('dragstart', (e) => e.preventDefault()); // Prevent default image dragging
             slider.style.cursor = 'grab'; // Initial cursor
        }


        // --- Notifications ---
        function showNotification(title, message, type = 'info', duration = 4000) {
             if (!notificationCenter) return;
             const notification = document.createElement('div');
             notification.className = `notification ${type}`;
             notification.setAttribute('role', 'alert'); // Accessibility

             let iconClass = 'fa-info-circle'; // Default info icon
             if(type === 'success') iconClass = 'fa-check-circle';
             if(type === 'error') iconClass = 'fa-exclamation-circle';

             notification.innerHTML = `
                 <div class="notification-icon"><i class="fas ${iconClass}"></i></div>
                 <div class="notification-content">
                     <h4 class="notification-title">${title}</h4>
                     <p class="notification-message">${message}</p>
                 </div>
                 <button class="notification-close" aria-label="Close Notification"><i class="fas fa-times"></i></button>
             `;

             const closeButton = notification.querySelector('.notification-close');
             let timeoutId = null; // Store timeout ID

             const removeNotification = () => {
                 if (timeoutId) clearTimeout(timeoutId); // Clear timeout if closed manually
                 notification.style.animation = 'slideOutNotification 0.5s forwards ease-out';
                 // Remove element after animation completes
                 notification.addEventListener('animationend', () => notification.remove(), { once: true });
             }

             closeButton.addEventListener('click', removeNotification);
             notificationCenter.appendChild(notification);
             timeoutId = setTimeout(removeNotification, duration); // Auto-close after duration
        }

        // Add slideOut animation if not already in CSS
         const styleSheet = document.styleSheets[0];
         try {
             let hasSlideOut = false;
             for (let i = 0; i < styleSheet.cssRules.length; i++) {
                 if (styleSheet.cssRules[i].type === CSSRule.KEYFRAMES_RULE && styleSheet.cssRules[i].name === 'slideOutNotification') {
                     hasSlideOut = true;
                     break;
                 }
             }
             if (!hasSlideOut) {
                 styleSheet.insertRule(`@keyframes slideOutNotification { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }`, styleSheet.cssRules.length);
             }
         } catch (e) { console.warn("Could not insert keyframe rule for slideOutNotification.", e); }

        // --- SweetAlert Theming ---
        const swalStyle = document.createElement('style');
        swalStyle.textContent = `
            .swal-themed-popup { background: var(--card-background) !important; color: var(--text-primary) !important; border-radius: var(--border-radius-lg) !important; backdrop-filter: blur(5px); border: 1px solid var(--border-color-dark); }
            .swal-themed-title { color: var(--primary-color) !important; }
            .swal-themed-html { color: var(--text-primary) !important; }
            .swal-themed-close { color: var(--text-secondary) !important; transition: color 0.3s ease; }
            .swal-themed-close:hover { color: var(--primary-color) !important; }
            .swal-themed-button { background-color: var(--primary-color) !important; color: var(--text-on-primary) !important; }
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

        // --- Initial Load Actions ---
        filterAndDisplayEvents(); // Display events on load
