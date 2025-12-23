// Fix URL encoding for spaces in image paths (only if not already encoded)
function encodeImagePath(img) {
    let originalSrc = img.getAttribute('src');
    if (!originalSrc) {
        originalSrc = img.src;
    }
    
    // Only encode if path has spaces and isn't already encoded
    if (originalSrc && originalSrc.includes(' ') && !originalSrc.includes('%20')) {
        // Split path to encode only the filename part
        const lastSlash = originalSrc.lastIndexOf('/');
        if (lastSlash !== -1) {
            const dir = originalSrc.substring(0, lastSlash + 1);
            const filename = originalSrc.substring(lastSlash + 1);
            const encodedFilename = encodeURIComponent(filename);
            img.src = dir + encodedFilename;
        } else {
            img.src = originalSrc.replace(/ /g, '%20');
        }
    }
}

function fixImageEncoding() {
    const productImages = document.querySelectorAll('.product-image, .product-main-image');
    productImages.forEach(encodeImagePath);
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixImageEncoding);
} else {
    fixImageEncoding();
}

// Also run after delays to catch dynamically set images
setTimeout(fixImageEncoding, 100);
setTimeout(fixImageEncoding, 500);

