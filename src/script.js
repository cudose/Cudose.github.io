// Scroll button functionality
window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
    const btn = document.getElementById("scrollTopBtn");
    btn.style.display = (document.documentElement.scrollTop > 100) ? "block" : "none";
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}
