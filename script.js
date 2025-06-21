document.getElementById("downloadBtn").addEventListener("click", function() {
    let duration = 3 * 1000;
    let animationEnd = Date.now() + duration;

    function shootConfetti() {
        confetti({
            particleCount: 7,
            spread: 80,
            origin: { y: 0.6 }
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(shootConfetti);
        }
    }

    shootConfetti();
});

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Function to set the theme based on the time of day in UTC
function setThemeBasedOnTime() {
    const now = new Date();
    const hours = now.getUTCHours();
    if (hours >= 18 || hours < 6) {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
}

// Check the initial state of the toggle switch
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
} else if (localStorage.getItem('theme') === 'light') {
    body.classList.remove('dark-mode');
    themeToggle.checked = false;
} else {
    // Set theme based on time if no preference is stored
    setThemeBasedOnTime();
}

themeToggle.addEventListener("change", function() {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Update the theme based on time every hour
setInterval(setThemeBasedOnTime, 3600000);

const blogLinks = [
    "https://medium.com/@mukulmj/devops-the-invisible-force-behind-seamless-tech-8ec1f361698e",
    "https://medium.com/@mukulmj/how-i-patched-a-docker-image-without-breaking-its-original-behavior-c086f8a25d18"
];

const blogList = document.getElementById("blogList");

async function fetchBlogPreview(url) {
    try {
        const response = await fetch(`https://api.linkpreview.net/?key=efc19f11090659787f8bb144cc7074e6&q=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.title && data.url) {
            const blogItem = document.createElement("li");
            blogItem.className = "blog-item";
            blogItem.innerHTML = `
                <a href="${data.url}" target="_blank">
                    <img src="${data.image || 'assets/images/profile-image.svg'}" alt="${data.title}" style="width:100px;height:60px;object-fit:cover;">
                    <h3>${data.title}</h3>
                    <p>${data.description || ''}</p>
                </a>
            `;
            blogList.appendChild(blogItem);
        }
    } catch (error) {
        console.error("Error fetching blog preview:", error);
    }
}

blogLinks.forEach(fetchBlogPreview);

// Toggle dark mode function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Optionally, store preference
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// On page load, set theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
