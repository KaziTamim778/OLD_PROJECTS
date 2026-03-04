# CyberTech Enterprise - Premium Cybernetic Enhancements E-Commerce

A futuristic, cyberpunk-themed e-commerce website for premium cybernetic enhancements and technology products. Built with modern web technologies featuring stunning animations and a dark, tech-inspired aesthetic.

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

- **Cyberpunk Aesthetic**: Dark space theme with neon accents and futuristic design
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **E-Commerce Functionality**: Complete shopping cart and product browsing experience
- **Advanced Animations**: Scroll animations, 3D effects, and interactive UI elements
- **Product Catalog**: Extensive product listings with filtering and categorization
- **Services Showcase**: Detailed services pages with interactive sliders
- **Contact System**: Interactive contact forms with map integration
- **Inventory Management**: Visual inventory display with tooltips and 3D elements

## 📁 Project Structure

```
CyberEnterprise/
├── index.html                 # Home page - Hero and featured content
├── about.html                 # About page - Company information
├── products.html              # Products catalog with filtering
├── services.html              # Services offered
├── inventory.html             # Inventory display with 3D elements
├── cart.html                  # Shopping cart page
├── contact.html               # Contact form with map
├── navbar.html                # Navigation component demo
├── navbar.css                 # Navigation styles
├── navbar.js                  # Navigation functionality
├── footer.css                 # Footer styles
├── footer.html                # Footer component
├── footer.js                  # Footer functionality
│
├── css/
│   └── style.css              # Global stylesheet
│
├── js/
│   └── main.js                # Main JavaScript functionality
│
└── assets/
    ├── products/              # Product images
    └── testimonials/          # Testimonial images
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required

### Installation

1. Clone or download the project files
```bash
git clone <repository-url>
cd CyberEnterprise
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
| `index.html` | Landing page with hero section, featured products, and testimonials |
| `about.html` | Company history, mission, values, and team information |
| `products.html` | Product catalog with categories, filters, and detailed listings |
| `services.html` | Services offered including installation, maintenance, upgrades |
| `inventory.html` | Visual inventory management with 3D interactive elements |
| `cart.html` | Shopping cart with order summary and checkout |
| `contact.html` | Contact form with location map and company details |

### JavaScript Files

| File | Purpose |
|------|---------|
| `main.js` | Core functionality: AOS init, mobile menu, Swiper carousels, smooth scroll |
| `navbar.js` | Navigation bar interactivity and mobile menu toggle |
| `footer.js` | Footer dynamic functionality |

### CSS Files

| File | Purpose |
|------|---------|
| `style.css` | Global styles and base styling |
| `navbar.css` | Navigation bar styling with animations |
| `footer.css` | Footer component styling |

## 📖 Pages Overview

### Home Page (`index.html`)
- Animated hero section with call-to-action
- Featured products carousel
- Testimonials slider
- Quick links to main sections

### About Page (`about.html`)
- Company origin story
- Mission and vision statements
- Core values
- Team profiles with 3D effects

### Products Page (`products.html`)
- Product grid with category filters
- Price range sliders
- Detailed product cards
- Add to cart functionality

### Services Page (`services.html`)
- Service categories carousel
- Detailed service descriptions
- Pricing information
- Booking/inquiry options

### Inventory Page (`inventory.html`)
- 3D inventory visualization
- Interactive tooltips (Tippy.js)
- Stock level indicators
- Draggable elements (GSAP)

### Cart Page (`cart.html`)
- Cart item management
- Quantity adjustments
- Order summary
- Checkout process

### Contact Page (`contact.html`)
- Contact form with validation
- Interactive map (Leaflet)
- Company contact details
- Social media links

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, Animations
- **Tailwind CSS**: Utility-first styling
- **JavaScript (ES6+)**: Modern JavaScript features
- **External Libraries**:
  - **AOS**: Animate On Scroll library
  - **Swiper**: Touch slider
  - **GSAP**: GreenSock Animation Platform
  - **Three.js**: 3D graphics
  - **Tippy.js**: Tooltips
  - **Leaflet**: Interactive maps
  - **Animate.css**: CSS animation library
  - **noUiSlider**: Price range sliders

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space Black | `#0A0E17` | Primary background |
| Cybernetic Blue | `#00C2FF` | Primary accent |
| Titanium Silver | `#D8DEE9` | Body text |
| Neon Green | `#39FF14` | Success states, CTAs |
| Neural Purple | `#BF5AF2` | Secondary accent |
| Surgical White | `#F8F9FC` | Headings |
| Hydraulic Red | `#FF3B30` | Alerts, warnings |
| Alloy Gray | `#4A4E57` | Borders, dividers |

### Typography

- **Headings**: Orbitron (futuristic sans-serif)
- **Body**: Titillium Web (clean sans-serif)
- **Code/Tech**: JetBrains Mono (monospace)
- **Accent**: Audiowide (display font)

## 💻 Usage

### Adding New Products

1. Add product images to `assets/products/`
2. Update `products.html` with new product cards
3. Configure product data in the corresponding script

### Customization

1. **Colors**: Modify CSS custom properties in `:root`
2. **Fonts**: Update Google Fonts links in HTML head
3. **Animations**: Adjust AOS and GSAP configurations in `main.js`

## 📝 License

This project is licensed under the MIT License.

---

**Last Updated**: March 2026

For questions or support, please contact the development team.
