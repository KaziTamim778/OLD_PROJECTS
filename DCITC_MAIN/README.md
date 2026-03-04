# DCITC - Digital Center Information & Technology Showcase

A modern, responsive website showcasing an organization's information, departments, events, executives, projects, and media gallery. Built with vanilla HTML, CSS, and JavaScript for optimal performance and compatibility.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [File Descriptions](#file-descriptions)
- [Pages Overview](#pages-overview)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Responsive Design**: Fully responsive website optimized for desktop, tablet, and mobile devices
- **Multi-Page Navigation**: Easy navigation between multiple sections
- **Image Gallery**: Showcase projects and media with a dedicated gallery page
- **Event Management**: Display upcoming and past events
- **Team Directory**: Executive and department listings with information
- **Project Showcase**: Highlight key projects and initiatives
- **Performance Optimized**: Lightweight vanilla JavaScript with no dependencies
- **Cross-Browser Compatible**: Works across all modern browsers

## 📁 Project Structure

```
DCITC/
├── index.html                 # Home page
├── about.html                 # About page
├── departments.html           # Departments listing
├── events.html                # Events page
├── executives.html            # Executive team directory
├── gallery.html               # Media gallery
├── projects.html              # Projects showcase
├── README.md                  # Project documentation
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
│   ├── global.css             # Global styles (applied to all pages)
│   ├── index.css              # Home page styles
│   ├── about.css              # About page styles
│   ├── departments.css        # Departments page styles
│   ├── events.css             # Events page styles
│   ├── executives.css         # Executives page styles
│   ├── gallery.css            # Gallery page styles
│   └── projects.css           # Projects page styles
│
└── public/                    # Static assets
    ├── logo/                  # Logo files and branding assets
    ├── panel/                 # Panel/component images
    ├── slider/                # Slider/carousel images
    └── tech_tuesday/          # Tech Tuesday event images
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

### Installation

1. Clone or download the project files
```bash
git clone <repository-url>
cd DCITC
```

2. Open the project in your preferred code editor
```bash
code .
```

3. Start a local development server:
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

4. Open your browser and navigate to `http://localhost:8000`

## 📄 File Descriptions

### HTML Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page with hero section and key information |
| `about.html` | Organization information and mission statement |
| `departments.html` | Display different departments and their details |
| `events.html` | Upcoming and past events listing |
| `executives.html` | Executive team members and their profiles |
| `gallery.html` | Image gallery showcasing work and accomplishments |
| `projects.html` | Detailed project showcases and portfolio items |

### JavaScript Files

| File | Purpose |
|------|---------|
| `index.js` | Home page interactivity and animations |
| `about.js` | About page functionality |
| `departments.js` | Department filtering and interactions |
| `events.js` | Event management and display logic |
| `executives.js` | Executive profile management |
| `gallery.js` | Image gallery functionality and lightbox |
| `projects.js` | Project filtering and interactions |
| `placeholder-fix.js` | Handles broken images and placeholders |

### CSS Files

| File | Purpose |
|------|---------|
| `global.css` | Universal styles, colors, fonts, reset |
| `index.css` | Home page specific styling |
| `about.css` | About page specific styling |
| `departments.css` | Departments page specific styling |
| `events.css` | Events page specific styling |
| `executives.css` | Executives page specific styling |
| `gallery.css` | Gallery page specific styling |
| `projects.css` | Projects page specific styling |

### Assets

| Directory | Contents |
|-----------|----------|
| `public/logo/` | Organization logos and branding assets |
| `public/panel/` | Panel and component graphics |
| `public/slider/` | Carousel/slider images |
| `public/tech_tuesday/` | Tech Tuesday event specific images |

## 📖 Pages Overview

### Home Page (`index.html`)
- Hero banner with call-to-action
- Featured departments overview
- Quick navigation to main sections
- Latest events preview
- Links to projects and gallery

### About Page (`about.html`)
- Organization history and mission
- Core values and vision
- Team introduction
- Organization statistics

### Departments Page (`departments.html`)
- Department listings with descriptions
- Personnel information per department
- Department-specific resources
- Contact information

### Events Page (`events.html`)
- Upcoming events calendar
- Event details and descriptions
- Registration information
- Past events archive

### Executives Page (`executives.html`)
- Executive profiles and biographies
- Contact information
- Professional backgrounds
- Organizational hierarchy

### Gallery Page (`gallery.html`)
- Image gallery with filtering options
- Lightbox functionality for full-size viewing
- Photo organization and categorization
- Tech Tuesday event photos

### Projects Page (`projects.html`)
- Project showcases and descriptions
- Project timelines
- Technology stacks used
- Project outcomes and impact

## 🛠 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling, flexbox, grid, animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **Responsive Design**: Mobile-first approach

## 💻 Usage

### Basic Navigation

All pages are linked through a common navigation menu. To add new pages:

1. Create a new `page-name.html` file
2. Create corresponding `page-name.js` in the `scripts/` folder
3. Create corresponding `page-name.css` in the `styles/` folder
4. Add links to the navigation menu in existing HTML files

### Adding Content

**For images:**
- Place image files in the appropriate folder under `public/`
- Reference them in HTML: `<img src="public/folder/image.jpg" alt="Description">`

**For new departments/events/executives:**
- Update the corresponding HTML file with new entries
- Update the JavaScript file if additional functionality is needed
- Update the CSS for styling consistency

### Customization

1. **Colors and Fonts**: Edit `styles/global.css`
2. **Logo**: Replace files in `public/logo/`
3. **Content**: Update text in respective HTML files
4. **Images**: Add new images to `public/` and reference them

## 🤝 Contributing

1. Create a branch for your feature: `git checkout -b feature/your-feature`
2. Make your changes and commit them: `git commit -m 'Add your message'`
3. Push to the branch: `git push origin feature/your-feature`
4. Create a Pull Request describing your changes

### Coding Standards

- Use semantic HTML5 elements
- Follow CSS naming conventions (BEM recommended)
- Write clean, commented JavaScript code
- Ensure mobile responsiveness
- Test across different browsers

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Last Updated**: March 2026

For questions or support, please contact the development team.