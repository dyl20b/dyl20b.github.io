// Function to handle the content switching
async function loadPage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Page not found');

        const html = await response.text();

        // Parse the fetched HTML string into a temporary DOM object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Grab the new content and the new page title
        const newContent = doc.querySelector('#main-content').innerHTML;
        const newTitle = doc.querySelector('title').innerText;

        // Update the current page browser title and main content
        document.title = newTitle;
        document.querySelector('#main-content').innerHTML = newContent;
    } catch (error) {
        console.error('Error loading page:', error);
    }
}

// Intercept clicks on your navigation links
document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        // Update the browser URL bar without reloading
        window.history.pushState({}, '', url);
        // Load the content
        loadPage(url);
    });

});

// Handle browser Back/Forward button clicks
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});