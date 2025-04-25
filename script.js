// Page Navigation
function loadPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
        window.scrollTo(0, 0);
        
        // Re-trigger animations
        const fadeElements = selectedPage.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => {
                el.classList.add('visible');
            }, 100);
        });
    }
}

// Tabs
function openTab(evt, tabId) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    // Remove active class from all tab links
    const tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
    
    // Show the selected tab content and set the button as active
    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

function changeSlide(n) {
    // Hide current slide
    if (slides.length > 0 && dots.length > 0) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Set new slide
        currentSlide = n;
        
        // Show new slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    if (slides.length > 0) {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        changeSlide(next);
    }
}

// Auto advance slider every 5 seconds if slides exist
if (document.querySelectorAll('.slide').length > 0) {
    setInterval(nextSlide, 5000);
}

// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                // For mobile, toggle dropdown on click
                this.classList.toggle('active');
                
                // Prevent click from propagating to parent elements
                e.stopPropagation();
            }
        });
    });
    
    // Handle scroll for header styling
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Trigger fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Use Intersection Observer for scroll animations if available
    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
    
    // Default to home page
    if (document.querySelector('.page-content')) {
        loadPage('home');
    }
});

// Survey Modal
function openSurveyModal() {
    const modal = document.getElementById('survey-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeSurveyModal() {
    const modal = document.getElementById('survey-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function submitSurvey() {
    alert('Thank you for your feedback!');
    closeSurveyModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('survey-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};