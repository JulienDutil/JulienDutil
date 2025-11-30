// Reveal animations
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(el => revealObserver.observe(el));


// Accordion logic
document.querySelectorAll(".project-accordion").forEach(item => {
  item.querySelector(".accordion-header").addEventListener("click", () => {
    item.classList.toggle("open");
  });
});


// Language toggle logic
const langToggle = document.getElementById("lang-toggle");
const body = document.body;

// Load saved language
const savedLang = localStorage.getItem("lang") || "en";
if (savedLang === "fr") body.classList.add("lang-fr-active");

langToggle.addEventListener("click", () => {
  body.classList.toggle("lang-fr-active");

  const lang = body.classList.contains("lang-fr-active") ? "fr" : "en";
  localStorage.setItem("lang", lang);
});


// Timeline horizontal scrolling (optional smooth)
const timeline = document.querySelector(".timeline-horizontal");
timeline.addEventListener("wheel", function (e) {
  e.preventDefault();
  timeline.scrollLeft += e.deltaY * 0.6;
});


// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
