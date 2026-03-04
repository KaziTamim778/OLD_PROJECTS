# DCITC Session - Web Development Presentation

An interactive, tech-themed presentation/slides application for web development workshops and educational sessions. Features a futuristic design with particle backgrounds and smooth scroll-based navigation.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [File Descriptions](#file-descriptions)
- [Slides Overview](#slides-overview)
- [Technologies Used](#technologies-used)
- [Design System](#design-system)
- [Usage](#usage)
- [License](#license)

## ✨ Features

- **Interactive Slides**: Scroll-based navigation through presentation content
- **Particle Background**: Animated particle.js background effect
- **Tech Aesthetic**: Futuristic design with neon accents
- **Code Snippets**: Syntax-highlighted code examples
- **Responsive Design**: Works on various screen sizes
- **Meme Integration**: Engaging meme slides for lighter moments
- **Smooth Animations**: GSAP-powered transitions
- **Terminal Style**: Code decoration with terminal aesthetics

## 📁 Project Structure

```
DCITC_SESSION/
└── index.html                 # Complete presentation (single file)
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required (all CDN-based)

### Installation

1. Clone or download the project files
```bash
git clone <repository-url>
cd DCITC_SESSION
```

2. Open `index.html` directly in your browser, or use a local server:
   - **Using Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - **Using VS Code Live Server**:
     - Right-click on `index.html` and select "Open with Live Server"

## 📄 File Descriptions

### Core File

| File | Purpose |
|------|---------|
| `index.html` | Complete presentation with embedded CSS and content |

The entire presentation is contained in a single HTML file with:
- Embedded CSS styles
- Slide content structure
- External library imports via CDN

## 📖 Slides Overview

The presentation covers web development fundamentals:

### Introduction Slides
- Welcome and overview
- Presenter introduction

### HTML Slides
- HTML structure and syntax
- Semantic elements
- Common tags and attributes

### CSS Slides
- Styling fundamentals
- Selectors and properties
- Layout techniques (Flexbox, Grid)
- Responsive design principles

### JavaScript Slides
- Programming basics
- DOM manipulation
- Event handling
- Interactive examples

### Practice Slides
- Hands-on exercises
- Code challenges
- Best practices

### Meme Slides
- Fun breaks between sections
- Developer humor
- Engagement content

## 🛠 Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, animations, backdrop filters
- **JavaScript (ES6+)**: Modern JavaScript features
- **External Libraries**:
  - **Particles.js**: Animated background particles
  - **GSAP**: GreenSock Animation Platform
  - **Font Awesome 6.4.0**: Icons
  - **Google Fonts**: JetBrains Mono, Roboto

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0f1121` | Main background |
| Primary Blue | `#4da8ff` | Headings, accents |
| Cyan | `#66fcf1` | Subheadings, bullets |
| Pink | `#ff5d8f` | Emphasis, highlights |
| Text | `#e1e5f2` | Body text |

### Typography

- **Headings**: JetBrains Mono (monospace, tech feel)
- **Body**: Roboto (clean sans-serif)
- **Code**: JetBrains Mono (monospace)

### Visual Elements

- Semi-transparent slide backgrounds with backdrop blur
- Neon glow effects on headings
- Terminal-style code decorations
- Particle animation overlay

## 💻 Usage

### Navigation

- **Scroll**: Navigate between slides by scrolling
- **Keyboard**: Use arrow keys for slide navigation (if implemented)

### Adding New Slides

Add a new `.item` div inside the wrapper:
```html
<div class="item">
  <div class="item_content">
    <h2>New Slide Title</h2>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
    </ul>
    <div class="code-decoration">&lt;/slide&gt;</div>
  </div>
</div>
```

### Adding Meme Slides

Use the `.meme` class for dual-content slides:
```html
<div class="item meme">
  <div class="item_content">
    <!-- Text content -->
  </div>
  <div class="meme-container">
    <img src="meme.jpg" alt="Meme">
  </div>
</div>
```

### Customizing Particles

Modify particles.js configuration in the script section:
```javascript
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#4da8ff" },
    // ... more options
  }
});
```

## 🎯 Best Practices for Presentations

1. Keep slides concise and focused
2. Use code examples sparingly and clearly
3. Include meme breaks for engagement
4. Test on the presentation screen beforehand
5. Ensure good contrast for readability

## 📝 License

This project is licensed under the MIT License.

---

**Last Updated**: March 2026

For questions or support, contact the DCITC development team.
