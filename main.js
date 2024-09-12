document.addEventListener("DOMContentLoaded", function() {
    // Load header
    var headerPlaceholder = document.getElementById('headerPlaceholder');
    var xhrHeader = new XMLHttpRequest();
    xhrHeader.open('GET', 'header.html', true);
    xhrHeader.onreadystatechange = function() {
        if (xhrHeader.readyState === 4 && xhrHeader.status === 200) {
            headerPlaceholder.innerHTML = xhrHeader.responseText;
            // Call your functions related to the header after loading
            initializeHeaderFunctionality();
        }
    };
    xhrHeader.send(null);

    // Load navbar
    var navbarPlaceholder = document.getElementById('navbarPlaceholder');
    var xhrNavbar = new XMLHttpRequest();
    xhrNavbar.open('GET', 'navbar.html', true);
    xhrNavbar.onreadystatechange = function() {
        if (xhrNavbar.readyState === 4 && xhrNavbar.status === 200) {
            navbarPlaceholder.innerHTML = xhrNavbar.responseText;
            // Call your functions related to the navbar after loading
            initializeNavbarFunctionality();
        }
    };
    xhrNavbar.send(null);

    // Load footer
    var footerPlaceholder = document.getElementById('footerPlaceholder');
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open('GET', 'footer.html', true);
    xhrFooter.onreadystatechange = function() {
        if (xhrFooter.readyState === 4 && xhrFooter.status === 200) {
            footerPlaceholder.innerHTML = xhrFooter.responseText;
            // Call your functions related to the footer after loading
            initializeFooterFunctionality();
            initializeCarousel();
        }
    };
    xhrFooter.send(null);

});

function initializeHeaderFunctionality() {
    // Code for Header
}

function initializeCarousel() {
    const prevButton = document.querySelector(".carousel1-prev-btn");
    const nextButton = document.querySelector(".carousel1-next-btn");
    const carouselWrapper = document.querySelector(".carousel1-card");
    const cardWidth = 280;
    const dotContainer = document.createElement("div");
    let currentIndex = 0;
    const totalCards = document.querySelectorAll(".carousel1-content").length;

    dotContainer.classList.add("nav-dots");

    prevButton.addEventListener("click", function() {
        if (currentIndex > 0) {
            carouselWrapper.scrollLeft -= cardWidth;
            currentIndex--;
            updateButtonState();
            updateNavDots(currentIndex);
        }
    });

    nextButton.addEventListener("click", function() {
        if (currentIndex < totalCards - 1) {
            carouselWrapper.scrollLeft += cardWidth;
            currentIndex++;
            updateButtonState();
            updateNavDots(currentIndex);
        }
    });

    dotContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("nav-dot")) {
            const dotIndex = Array.from(this.children).indexOf(event.target);
            const scrollPosition = dotIndex * cardWidth;
            carouselWrapper.scrollLeft = scrollPosition;
            currentIndex = dotIndex;
            updateButtonState();
            updateNavDots(dotIndex);
        }
    });

    function updateButtonState() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalCards - 1;
    }

    function updateNavDots(currentIndex = 0) {
        dotContainer.querySelectorAll(".nav-dot").forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement("span");
        dot.classList.add("nav-dot");
        dotContainer.appendChild(dot);
    }

    carouselWrapper.parentElement.appendChild(dotContainer);

    updateNavDots();
}



function initializeNavbarFunctionality() {
    // Code for Menu Button and Overlay
    var menuButton = document.getElementById('menuButton');
    var overlay = document.getElementById('overlay');
    var closeButton = document.getElementById('closeButton');

    menuButton.addEventListener('click', function() {
        toggleOverlay(true);
    });

    closeButton.addEventListener('click', function() {
        toggleOverlay(false);
    });

    function toggleOverlay(isOpen) {
        if (isOpen) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
    }
}

function initializeFooterFunctionality() {

    // Code for Footer
    var footerHeadings = document.querySelectorAll('.footer-heading');

    footerHeadings.forEach(function(heading) {
        heading.addEventListener('click', toggleFooter);
    });

    function toggleFooter() {
        var content = this.nextElementSibling;
        var isOpen = content.classList.contains('open');
        closeAllFooterLists();
        if (!isOpen) {
            content.classList.add('open');
            this.classList.add('open');
        }
    }

    function closeAllFooterLists() {
        document.querySelectorAll('.footer-list').forEach(function(content) {
            content.classList.remove('open');
        });
        document.querySelectorAll('.footer-heading').forEach(function(heading) {
            heading.classList.remove('open');
        });
    }

    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}
