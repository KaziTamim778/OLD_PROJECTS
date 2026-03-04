/**
 * Placeholder Image Fix Script
 * 
 * This script should be included in the HTML files to replace all
 * /api/placeholder/ URLs with a reliable placeholder service or local placeholders.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Placeholder fix script running...');
    
    // Debugging function - check for common issues
    function debugPage() {
        console.log('=== DEBUG INFO ===');
        console.log('Page URL:', window.location.href);
        console.log('Page title:', document.title);
        
        // Check for important elements
        const checkElements = [
            '#teamModal', 
            '.team-card', 
            '.year-btn', 
            '.department-btn',
            '#particles-js',
            '#footer-particles-js'
        ];
        
        checkElements.forEach(selector => {
            const el = document.querySelector(selector);
            console.log(`Element "${selector}" exists:`, el ? 'YES' : 'NO');
        });
        
        // Check for team cards
        const teamCards = document.querySelectorAll('.team-card');
        console.log('Number of team cards found:', teamCards.length);
        
        // Check for image issues
        const images = document.querySelectorAll('img');
        console.log('Total images on page:', images.length);
        let brokenImages = 0;
        
        images.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                brokenImages++;
                console.warn('Potentially broken image:', img.src);
            }
        });
        
        console.log('Potentially broken images:', brokenImages);
        console.log('=== END DEBUG INFO ===');
    }
    
    // Function to replace placeholder URLs
    function fixPlaceholderImages() {
        // Get all images on the page
        const images = document.querySelectorAll('img');
        
        // Count how many images are fixed
        let fixedCount = 0;
        
        // Process each image
        images.forEach(img => {
            const src = img.getAttribute('src');
            
            // Check if it's using the /api/placeholder/ URL pattern
            if (src && src.includes('/api/placeholder/')) {
                // Parse dimensions from the URL (assuming format like /api/placeholder/300/400)
                const parts = src.split('/');
                let width = 300;  // Default width
                let height = 300; // Default height
                let text = '';    // Default text
                
                // Extract dimensions if available
                if (parts.length >= 5) {
                    width = parts[3] || width;
                    height = parts[4] || height;
                    
                    // Check if there's text parameter
                    if (parts[6]) {
                        text = parts[6];
                    }
                }
                
                // Generate a new placeholder URL using placehold.co
                const newSrc = `https://placehold.co/${width}x${height}/00b4db/ffffff`;
                
                // Set the new source and add a data attribute to track the change
                img.setAttribute('src', newSrc);
                img.setAttribute('data-original-src', src);
                img.setAttribute('data-fixed-by', 'placeholder-fix-script');
                
                fixedCount++;
            }
        });
        
        // Look for background images in inline styles
        const elementsWithStyle = document.querySelectorAll('[style*="background-image"]');
        elementsWithStyle.forEach(el => {
            const style = el.getAttribute('style');
            if (style && style.includes('/api/placeholder/')) {
                // Replace with a generic placeholder
                const newStyle = style.replace(
                    /url\(['"]?\/api\/placeholder\/[^'")\s]+['"]?\)/g, 
                    `url('https://placehold.co/600x400/00b4db/ffffff')`
                );
                el.setAttribute('style', newStyle);
                el.setAttribute('data-fixed-by', 'placeholder-fix-script');
                fixedCount++;
            }
        });
        
        console.log(`Fixed ${fixedCount} placeholder images.`);
    }
    
    // Run the fix
    fixPlaceholderImages();
    
    // Also run after a short delay to catch any dynamically loaded content
    setTimeout(fixPlaceholderImages, 1000);
    
    // Run debug info after everything should be loaded
    setTimeout(debugPage, 2000);
}); 