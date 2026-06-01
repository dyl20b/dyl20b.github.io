// content switching
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

        // Update the current page title and content
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

// Handles the Services dropdown on the navigation bar
document.addEventListener("DOMContentLoaded", function () {
    const dropBtn = document.querySelector(".big-box-link-dropdown");
    const menu = document.querySelector(".dropdown-menu");

    dropBtn.addEventListener("click", function (e) {
        e.preventDefault();

        menu.classList.toggle("show");
    });

    // close when clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown")) {
            menu.classList.remove("show");
        }
    });
});