// ============================================================
// Casa Marigold — script.js
// Dipakai di semua halaman; tiap fitur dicek dulu elemennya
// ada atau nggak sebelum dijalankan.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Nav berubah tampilan pas discroll ---------- */
  const nav = document.getElementById("site-nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Hero title: reveal per baris ---------- */
  const staggerTitle = document.querySelector("[data-stagger]");
  if (staggerTitle) {
    const lines = staggerTitle.innerHTML.split("<br>");
    staggerTitle.innerHTML = lines
      .map((line, i) => `<span style="animation-delay:${i * 140}ms">${line}</span>`)
      .join("<br>");
  }

  /* ---------- Scroll reveal umum ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Stat count-up ---------- */
  const statsSection = document.getElementById("stats");
  if (statsSection) {
    const counters = statsSection.querySelectorAll("[data-count-to]");

    const runCount = () => {
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count-to"));
        const duration = 1100;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(target * progress);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    };

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount();
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statObserver.observe(statsSection);
  }

  /* ---------- Testimonial carousel ---------- */
  const track = document.getElementById("carousel-track");
  if (track) {
    const slides = Array.from(track.querySelectorAll(".carousel__slide"));
    const dotsWrap = document.getElementById("carousel-dots");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }

    slides[0].classList.add("is-active");
    prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn.addEventListener("click", () => goTo(current + 1));

    setInterval(() => goTo(current + 1), 6000);
  }

  /* ---------- Filter tab menu ---------- */
  const tabs = document.querySelectorAll(".menu-tab");
  if (tabs.length) {
    const entries = document.querySelectorAll(".menu-entry");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const category = tab.getAttribute("data-category");
        tabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        entries.forEach((entry) => {
          entry.style.display = entry.getAttribute("data-category") === category ? "" : "none";
        });
      });
    });
  }

  /* ---------- Timeline: garis mengisi pas discroll ---------- */
  const timelineList = document.getElementById("timeline-list");
  if (timelineList) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineList.classList.add("is-visible");
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    timelineObserver.observe(timelineList);
  }

  /* ---------- Reservation form (submit tiruan, tanpa backend) ---------- */
  const reserveForm = document.getElementById("reserve-form");
  if (reserveForm) {
    reserveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("reserve-submit");
      submitBtn.querySelector(".reserve-form__label").textContent = "Sending…";

      setTimeout(() => {
        reserveForm.classList.add("is-sent");
      }, 600);
    });
  }

});