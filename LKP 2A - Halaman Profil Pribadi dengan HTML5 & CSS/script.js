/* LKP 2A — JavaScript murni untuk interaksi tambahan. */
(function () {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const progress = document.getElementById("scroll-progress");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const year = document.getElementById("tahun");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) year.textContent = String(new Date().getFullYear());

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.dataset.theme = dark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute("aria-label", dark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
    themeIcon.textContent = dark ? "☀" : "☾";
  }

  let chosenTheme = "light";
  try {
    const storedTheme = localStorage.getItem("lkp2a-theme");
    if (storedTheme === "dark" || storedTheme === "light") chosenTheme = storedTheme;
  } catch (_) {
    /* Jika penyimpanan browser tidak tersedia, gunakan mode terang. */
  }

  applyTheme(chosenTheme);
  themeToggle.addEventListener("click", function () {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("lkp2a-theme", nextTheme);
    } catch (_) {
      /* Penyimpanan preferensi bersifat opsional. */
    }
  });

  function updateProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? Math.min(100, Math.max(0, window.scrollY / maxScroll * 100)) : 0;
    if (progress) progress.style.width = percent + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      const active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const matches = navLinks.some(function (link) {
            return link.getAttribute("href") === "#" + entry.target.id;
          });
          if (matches) setActiveLink(entry.target.id);
        }
      });
    }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  if (!reducedMotion && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px 35px 0px" });

    targets.forEach(function (element) {
      revealObserver.observe(element);
    });
    root.classList.add("js-enabled");
  }
})();