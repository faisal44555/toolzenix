// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Search Functionality
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

function performSearch(query) {
    if (query.trim()) {
        // In a real implementation, this would redirect to search results
        alert(Searching for: ${query});
        // window.location.href = /search.html?q=${encodeURIComponent(query)};
    }
}

// Tool Functions (example implementations for some tools)

// Image Compressor (would use Canvas API in real implementation)
function compressImage(file, quality, callback) {
    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(function(blob) {
                callback(blob);
            }, file.type, quality);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Text Tools
function changeTextCase(text, caseType) {
    switch(caseType) {
        case 'upper': return text.toUpperCase();
        case 'lower': return text.toLowerCase();
        case 'title': return text.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        default: return text;
    }
}

function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function countCharacters(text) {
    return text.length;
}

// Base64 Converter
function stringToBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

function base64ToString(base64) {
    return decodeURIComponent(escape(atob(base64)));
}

// PDF Tools (would use pdf-lib or similar library in real implementation)
async function mergePDFs(files) {
    // In a real implementation, this would use a PDF library
    alert('This would merge PDF files in a real implementation');
}

// Initialize tool functions when on specific tool pages
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    if (path.includes('image.html')) {
        initImageTools();
    } else if (path.includes('video.html')) {
        initVideoTools();
    } else if (path.includes('audio.html')) {
        initAudioTools();
    } else if (path.includes('text.html')) {
        initTextTools();
    }
});

function initImageTools() {
    // Image tools initialization
    console.log('Initializing image tools');
}

function initVideoTools() {
    // Video tools initialization
    console.log('Initializing video tools');
}

function initAudioTools() {
    // Audio tools initialization
    console.log('Initializing audio tools');
}

function initTextTools() {
    // Text tools initialization
    console.log('Initializing text tools');
    
    // Example: Case Converter
    const caseConverterText = document.getElementById('case-converter-text');
    const caseConverterType = document.getElementById('case-converter-type');
    const caseConverterResult = document.getElementById('case-converter-result');
    const caseConverterBtn = document.getElementById('case-converter-btn');
    
    if (caseConverterBtn) {
        caseConverterBtn.addEventListener('click', () => {
            const text = caseConverterText.value;
            const caseType = caseConverterType.value;
            caseConverterResult.textContent = changeTextCase(text, caseType);
        });
    }
    
    // Example: Word Counter
    const wordCounterText = document.getElementById('word-counter-text');
    const wordCounterResult = document.getElementById('word-counter-result');
    
    if (wordCounterText) {
        wordCounterText.addEventListener('input', () => {
            const count = countWords(wordCounterText.value);
            wordCounterResult.textContent = ${count} words;
        });
    }
}

// AdSense Loader
function loadAdSense() {
    const ads = document.getElementsByClassName('adsbygoogle');
    if (ads.length > 0) {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}

window.addEventListener('load', loadAdSense);
