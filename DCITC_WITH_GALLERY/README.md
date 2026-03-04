# DCITC With Gallery - Enhanced Multi-Page Website

An enhanced, multi-page version of the Dhaka College Information & Technology Club website featuring a dedicated image gallery, multiple sections, and advanced animations. Built with modern web technologies for optimal user experience.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [File Descriptions](#file-descriptions)
- [Pages Overview](#pages-overview)
- [Technologies Used](#technologies-used)
- [Design System](#design-system)
- [Usage](#usage)
- [License](#license)

## ✨ Features

- **Multi-Page Architecture**: Organized content across dedicated pages
- **Image Gallery**: Full-featured gallery with modal lightbox
- **Theme Toggle**: Light/Dark mode switching
- **Particle Backgrounds**: Animated particle.js effects
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Advanced Animations**: AOS, GSAP, and Vanilla Tilt effects
- **3D Elements**: Three.js integration for visual effects
- **Interactive Navigation**: Hamburger menu with overlay
- **Sweet Alerts**: Enhanced notification system

## 📁 Project Structure

```
DCITC_WITH_GALLERY/
├── index.html                 # Home page
├── about.html                 # About page
├── departments.html           # Departments listing
├── events.html                # Events page
├── executives.html            # Executive team directory
├── gallery.html               # Image gallery
├── projects.html              # Projects showcase
│
├── scripts/                   # JavaScript functionality
│   ├── index.js               # Home page scripts
│   ├── about.js               # About page scripts
│   ├── departments.js         # Departments page scripts
│   ├── events.js              # Events page scripts
│   ├── executives.js          # Executives page scripts
│   ├── gallery.js             # Gallery page scripts
│   ├── projects.js            # Projects page scripts
│   └── placeholder-fix.js     # Image placeholder utilities
│
├── styles/                    # CSS stylesheets
│   ├── global.css             # Global styles (all pages)
│   ├── index.css              # Home page styles
│   ├── about.css              # About page styles
│   ├── departments.css        # Departments page styles
│   ├── events.css             # Events page styles
│   ├── executives.css         # Executives page styles
│   ├── gallery.css            # Gallery page styles
│   └── projects.css           # Projects page styles
│
└── public/                    # Static assets
    ├── gallery/               # Gallery images
    ├── logo/                  # Logo files
    ├── panel/                 # Panel images
    ├── slider/                # Slider images
    └── tech_tuesday/          # Tech Tuesday event images
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local server recommended for best experience

### Installation

1. Clone or download the project files
```bash
git clone <repository-url>
cd DCITC_WITH_GALLERY
```

2. Start a local development server:
   - **Using Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - **Using Node.js (http-server)**:
     ```bash
     npx http-server
     ```
   - **Using VS Code Live Server extension**:
     - Right-click on `index.html` and select "Open with Live Server"

3. Open your browser and navigate to `http://localhost:8000`

## 📄 File Descriptions

### HTML Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page with hero, featured sections, and navigation |
| `about.html` | Organization information, mission, and team intro |
| `departments.html` | Department listings with descriptions |
| `events.html` | Upcoming and past events display |
| `executives.html` | Executive team profiles and bios |
| `gallery.html` | Image gallery with lightbox modal |
| `projects.html` | Project showcases and portfolio |

### JavaScript Files

| File | Purpose |
|------|---------|
| `index.js` | Home page interactivity, particles, GSAP animations |
| `about.js` | About page animations and functionality |
| `departments.js` | Department filtering and interactions |
| `events.js` | Event management and display logic |
| `executives.js` | Executive profile management |
| `gallery.js` | Gallery grid, modal lightbox, image loading |
| `projects.js` | Project filtering and display |
| `placeholder-fix.js` | Handles broken images and placeholders |

### CSS Files

| File | Purpose |
|------|---------|
| `global.css` | Universal styles, navigation, footer, theme variables |
| `index.css` | Home page specific styling |
| `about.css` | About page specific styling |
| `departments.css` | Departments page layout |
| `events.css` | Events page styling |
| `executives.css` | Executive profiles styling |
| `gallery.css` | Gallery grid and modal styles |
| `projects.css` | Projects page styling |

### Assets

| Directory | Contents |
|-----------|----------|
| `public/gallery/` | Gallery images for lightbox display |
| `public/logo/` | Organization logo variants |
| `public/panel/` | Panel/component graphics |
| `public/slider/` | Hero slider images |
| `public/tech_tuesday/` | Tech Tuesday event photos |

## 📖 Pages Overview

### Home Page (`index.html`)
- Animated hero section with particles background
- Theme toggle (light/dark mode)
- Featured departments overview
- Latest events preview
- Quick navigation

### About Page (`about.html`)
- Organization history
- Mission and vision
- Core values
- Team introduction with tilt effects

### Departments Page (`departments.html`)
- Department listings
- Team member profiles
- Department-specific resources
- Contact information

### Events Page (`events.html`)
- Upcoming events calendar
- Event details and descriptions
- Registration information
- Past events archive

### Executives Page (`executives.html`)
- Executive profiles with photos
- Professional backgrounds
- Contact information
- Organizational hierarchy

### Gallery Page (`gallery.html`)
- Responsive image grid
- Lightbox modal for full-size viewing
- Navigation arrows in modal
- Close button and keyboard support
- Dynamic image loading

### Projects Page (`projects.html`)
- Project showcases
- Technology stacks
- Project descriptions
- Outcomes and impact

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)**: Modern JavaScript
- **External Libraries**:
  - **Particles.js**: Animated backgrounds
  - **AOS**: Animate On Scroll
  - **GSAP + ScrollTrigger**: Advanced animations
  - **Three.js**: 3D visual effects
  - **Vanilla Tilt / Tilt.js**: 3D tilt effects
  - **SweetAlert2**: Beautiful alerts
  - **Font Awesome 6.4.0**: Icons
  - **Google Fonts**: Inter, Montserrat, Poppins

## 🎨 Design System

### Typography

- **Primary Font**: Inter (clean, modern)
- **Secondary Font**: Montserrat (headings)
- **Accent Font**: Poppins (UI elements)

### Theme Support

The website supports both light and dark themes:
- **Dark Mode**: Default theme with dark backgrounds
- **Light Mode**: Inverted colors for day use
- **Toggle**: Accessible via nav theme switch

## 💻 Usage

### Theme Toggle

The theme toggle in the navigation switches between light and dark modes. User preference is stored in localStorage.

### Gallery Modal

- **Click**: Open image in full-size modal
- **Arrows**: Navigate between images
- **Escape**: Close modal
- **Click Outside**: Close modal

### Adding New Pages

1. Create `page-name.html` following existing structure
2. Create `scripts/page-name.js` for functionality
3. Create `styles/page-name.css` for styling
4. Add navigation links in all HTML files

### Adding Gallery Images

1. Place images in `public/gallery/`
2. Images are automatically loaded by `gallery.js`
3. Supported formats: JPG, PNG, WebP

## 🤝 Contributing

1. Create a feature branch
2. Make changes following code standards
3. Test across browsers
4. Submit pull request

## 📝 License

This project is licensed under the MIT License.

---

**Last Updated**: March 2026

For questions or support, contact the DCITC development team.
