const yearEl = document.querySelector(".copyYear");
yearEl.textContent = new Date().getFullYear();

const btnNav = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

const form = document.querySelector(".cta-form");
const cta_input = document.querySelector(".cta-input");
form.addEventListener("submit", (e) => {
    e.preventDefault()
    cta_input.value = ""
});

btnNav.addEventListener("click", () => {
    headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = link.getAttribute("href");

        // Scroll back to top
        if (href === "#") window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        if (href !== "#" && href.startsWith("#")) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({
                behavior: "smooth",
            });
        }

        headerEl.classList.toggle("nav-open");
    });
});

const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
        document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
        document.body.classList.remove("sticky");
    }
}, {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
});
obs.observe(sectionHeroEl);