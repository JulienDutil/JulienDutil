/* ============================
   Reveal on Scroll
============================ */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

/* ============================
   Smooth Accordion
============================ */
document.querySelectorAll(".project-accordion").forEach(item => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Close all other accordions
    document.querySelectorAll(".project-accordion.open").forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        openItem.querySelector(".accordion-body").style.maxHeight = null;
      }
    });

    // Toggle this accordion
    item.classList.toggle("open");

    if (!isOpen) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = null;
    }
  });
});

/* ============================
   Featured Cards → Scroll to Project
============================ */
document.querySelectorAll(".featured-card").forEach(card => {
  card.addEventListener("click", () => {
    const targetKey = card.getAttribute("data-target");
    if (!targetKey) return;

    const targetAccordion = document.querySelector(
      `.project-accordion[data-project-id="${targetKey}"]`
    );
    if (!targetAccordion) return;

    // Open it if not open
    if (!targetAccordion.classList.contains("open")) {
      targetAccordion.classList.add("open");
      const body = targetAccordion.querySelector(".accordion-body");
      body.style.maxHeight = body.scrollHeight + "px";
    }

    const offset = targetAccordion.offsetTop - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

/* ============================
   Language Toggle
============================ */
const langToggle = document.getElementById("lang-toggle");
const body = document.body;

const savedLang = localStorage.getItem("lang") || "en";
if (savedLang === "fr") {
  body.classList.add("lang-fr-active");
}

langToggle.addEventListener("click", () => {
  body.classList.toggle("lang-fr-active");
  const lang = body.classList.contains("lang-fr-active") ? "fr" : "en";
  localStorage.setItem("lang", lang);
});

/* ============================
   Horizontal Timeline Scroll
============================ */
const timeline = document.querySelector(".timeline-horizontal");
if (timeline) {
  timeline.addEventListener("wheel", e => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    timeline.scrollLeft += e.deltaY * 0.6;
  });
}

/* ============================
   Footer Year
============================ */
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

/* ============================
   Lightbox for Project Images
============================ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

document.querySelectorAll(".project-thumb").forEach(thumb => {
  thumb.addEventListener("click", () => {
    const fullSrc = thumb.getAttribute("data-full");
    lightboxImg.src = fullSrc;
    lightbox.classList.add("visible");
  });
});

// Close lightbox on backdrop click
lightboxBackdrop.addEventListener("click", () => {
  lightbox.classList.remove("visible");
  lightboxImg.src = "";
});

// Close on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && lightbox.classList.contains("visible")) {
    lightbox.classList.remove("visible");
    lightboxImg.src = "";
  }
});

/* ============================
   Smooth Scrolling for Nav Links
============================ */
document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    const offset = target.offsetTop - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});
