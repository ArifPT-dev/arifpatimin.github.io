const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const links = [...document.querySelectorAll(".nav-links a")];

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
});

links.forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

const sections = [...document.querySelectorAll("main section[id]")];
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
sections.forEach(section => activeObserver.observe(section));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (reduceMotion) {
  reveals.forEach(el => el.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  reveals.forEach(el => revealObserver.observe(el));
}
