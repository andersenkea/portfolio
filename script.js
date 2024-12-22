// Define placeholder image once, at the top
const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

// Slideshow functionality
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Move handleImageError function outside of any event listeners
function handleImageError(img) {
    console.log('Image failed:', img.src);
    const figure = img.closest('figure');
    if (figure) {
        // Style the figure container
        figure.style.backgroundColor = '#f0f0f0';
        figure.style.position = 'relative';
        figure.style.minHeight = '200px'; // Add minimum height
        
        // Hide the broken image
        img.style.display = 'none';
        
        // Add error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Image Not Available';
        figure.appendChild(errorMessage);
        
        console.log('Error handler applied to:', figure);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const projectTabs = document.querySelectorAll('.project-tab');
    const projects = document.querySelectorAll('.project');
    
    // Show first project by default
    if (projects.length > 0) {
        projects[0].classList.add('active');
        projectTabs[0].classList.add('active');
    }
    
    // Handle project tab clicks
    projectTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectId = tab.getAttribute('data-project');
            const targetProject = document.getElementById(projectId);
            
            if (targetProject) {
                projectTabs.forEach(t => t.classList.remove('active'));
                projects.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                targetProject.classList.add('active');
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    });

    // Add dark theme styles
    const darkThemeStyles = `
    .dark-theme {
        background: #1a1a1a;
        color: #ffffff;
    }

    .dark-theme .project-nav,
    .dark-theme .project-content {
        background: #1a1a1a;
        border-color: #333;
    }

    .dark-theme .project-tab {
        background: rgba(255, 255, 255, 0.1);
    }

    .dark-theme .project-tab:hover,
    .dark-theme .project-tab.active {
        background: rgba(255, 255, 255, 0.15);
    }

    .dark-theme .tab-header h2,
    .dark-theme .tab-categories span,
    .dark-theme .tab-description,
    .dark-theme .nav-header .title {
        color: rgba(255, 255, 255, 0.7);
    }

    .dark-theme .tab-title {
        color: #ffffff;
    }

    .dark-theme .logo-mark,
    .dark-theme .nav-header .logo {
        color: #ffffff;
    }

    .dark-theme .show-all-btn {
        color: rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.1);
    }

    .dark-theme .show-all-btn:hover {
        background: rgba(255, 255, 255, 0.15);
    }

    .dark-theme .slider {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .dark-theme .slider:before {
        background-color: #ffffff;
    }
    `;

    // Add dark theme styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = darkThemeStyles;
    document.head.appendChild(styleSheet);

    // EST Clock
function updateESTTime() {
    const timeElement = document.getElementById('est-time');
    const options = {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    
    const estTime = new Date().toLocaleString('en-US', options);
    timeElement.textContent = `${estTime} EST`;
}

// Update time immediately and then every second
updateESTTime();
setInterval(updateESTTime, 1000);

    // Initialize slideshow
    let slideIndex = 1;
    showSlides(slideIndex);

    // Auto advance slides every 5 seconds
    setInterval(() => {
        currentSlide(slideIndex + 1);
    }, 5000);

    // Loading state management
    function showLoader() {
        document.body.classList.add('loading');
    }

    function hideLoader() {
        document.body.classList.remove('loading');
    }

    // Project tab click handler without artificial delay
    document.querySelectorAll('.project-tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Skip if it's a tab with onclick (external link)
            if (this.hasAttribute('onclick')) return;
            
            showLoader();
            
            // Hide all projects
            document.querySelectorAll('.project').forEach(project => {
                project.classList.remove('active');
            });

            // Show selected project
            const projectId = this.getAttribute('data-project');
            const selectedProject = document.getElementById(projectId);
            if (selectedProject) {
                selectedProject.classList.add('active');
            }

            // Remove active class from all tabs
            document.querySelectorAll('.project-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide loader
            hideLoader();
        });
    });

    // Add loading state for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', hideLoader);
        img.addEventListener('error', hideLoader);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // If Escape key is pressed, close any open overlays/modals
        if (e.key === 'Escape') {
            // Add any modal closing logic here
        }
        
        // If Tab key is pressed, ensure focus is visible
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class when mouse is used
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Make project tabs keyboard accessible
    document.querySelectorAll('.project-tab').forEach(tab => {
        tab.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !tab.hasAttribute('onclick')) {
                e.preventDefault();
                tab.click();
            }
        });
    });
    
    // Reading progress indicator
    function updateProgressBar() {
        const projectContent = document.querySelector('.project-content');
        const progressBar = document.getElementById('progressBar');
        
        if (projectContent && progressBar) {
            const scrollPosition = projectContent.scrollTop;
            const maxScroll = projectContent.scrollHeight - projectContent.clientHeight;
            const scrollPercentage = (scrollPosition / maxScroll) * 100;
            
            progressBar.style.height = `${scrollPercentage}%`;
        }
    }

    // Add scroll event listener
    const projectContent = document.querySelector('.project-content');
    if (projectContent) {
        projectContent.addEventListener('scroll', updateProgressBar);
        // Initialize progress bar
        updateProgressBar();
    }

    // Attach error handlers to all images
    document.querySelectorAll('img').forEach(img => {
        img.onerror = () => handleImageError(img);
    });

    // Add loading state to all figures
    document.querySelectorAll('figure').forEach(figure => {
        figure.classList.add('figure-loading');
    });

    // Handle image load events
    document.querySelectorAll('img').forEach(img => {
        img.onload = () => {
            const figure = img.closest('figure');
            if (figure) {
                figure.classList.remove('figure-loading');
            }
        };
        
        img.onerror = () => handleImageError(img);
    });
}); 

// Simple keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('project-tab')) {
            if (focusedElement.hasAttribute('onclick')) {
                const url = focusedElement.getAttribute('onclick').match(/window\.open\('([^']+)'/)[1];
                window.open(url, '_blank');
            } else {
                focusedElement.click();
            }
        }
    }
}); 