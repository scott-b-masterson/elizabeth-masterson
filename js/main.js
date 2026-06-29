/* =================================================================
   ELIZABETH MASTERSON · INTERIOR DESIGN
   Front-end interactions
   ================================================================= */
(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     1 · CINEMATIC LOADER
     --------------------------------------------------------------- */
  const loader = $("#loader");
  const barFill = $(".loader__bar-fill");
  const countEl = $("[data-loader-count]");

  document.body.classList.add("is-loading");

  function runLoader() {
    if (!loader) return finishLoad();
    let pct = 0;
    const duration = prefersReduced ? 250 : 2100;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      // ease-out so it slows near the end
      pct = Math.round((1 - Math.pow(1 - t, 2)) * 100);
      if (barFill) barFill.style.width = pct + "%";
      if (countEl) countEl.textContent = pct;
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(finishLoad, 250);
      }
    }
    requestAnimationFrame(tick);
  }

  function finishLoad() {
    if (loader) loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    // kick off first reveals after the curtain lifts
    setTimeout(revealInView, 80);
  }

  window.addEventListener("load", runLoader);
  // safety: never trap the page if 'load' is slow
  setTimeout(function () {
    if (document.body.classList.contains("is-loading")) finishLoad();
  }, 4500);

  /* ---------------------------------------------------------------
     2 · YEAR + STICKY HEADER
     --------------------------------------------------------------- */
  const yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = $("#siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > window.innerHeight * 0.7);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------
     3 · MOBILE MENU
     --------------------------------------------------------------- */
  const menuToggle = $(".menu-toggle");
  const mobileNav = $("#mobileNav");
  function closeMenu() {
    document.body.classList.remove("menu-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    if (mobileNav) mobileNav.setAttribute("aria-hidden", "true");
  }
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      if (mobileNav) mobileNav.setAttribute("aria-hidden", String(!open));
    });
  }
  $$("#mobileNav a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ---------------------------------------------------------------
     4 · SCROLL REVEAL (IntersectionObserver)
     --------------------------------------------------------------- */
  let revealObserver;
  function setupReveal() {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    $$(".reveal").forEach((el) => revealObserver.observe(el));
  }
  function revealInView() {
    // reveal anything already in the viewport on first paint (hero)
    $$(".reveal").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) el.classList.add("is-visible");
    });
  }
  setupReveal();

  /* ---------------------------------------------------------------
     5 · PORTFOLIO FILTER
     --------------------------------------------------------------- */
  const filters = $$(".filter");
  const cards = $$(".work-card");
  filters.forEach((btn) => {
    btn.addEventListener("click", function () {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const cat = btn.dataset.filter;
      cards.forEach((card) => {
        const show = cat === "all" || card.dataset.cat === cat;
        card.classList.toggle("is-hidden", !show);
        if (show) {
          card.classList.remove("fade-in");
          // force reflow to restart animation
          void card.offsetWidth;
          card.classList.add("fade-in");
        }
      });
    });
  });

  /* ---------------------------------------------------------------
     6 · PROJECT LIGHTBOX
     --------------------------------------------------------------- */
  const lightbox = $("#lightbox");
  const lbImg = $("[data-lb-img]");
  const lbTitle = $("[data-lb-title]");
  const lbMeta = $("[data-lb-meta]");
  const lbDesc = $("[data-lb-desc]");

  function openLightbox(card) {
    if (!lightbox) return;
    lbImg.src = card.dataset.img || "";
    lbImg.alt = card.dataset.title || "";
    lbTitle.textContent = card.dataset.title || "";
    lbMeta.textContent = card.dataset.meta || "";
    lbDesc.textContent = card.dataset.desc || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  cards.forEach((card) => {
    card.addEventListener("click", () => openLightbox(card));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(card); }
    });
  });
  $("[data-lb-close]") && $("[data-lb-close]").addEventListener("click", closeLightbox);
  lightbox && lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------------------------------------------------------------
     7 · BEFORE / AFTER SLIDERS
     --------------------------------------------------------------- */
  $$("[data-ba]").forEach((ba) => {
    const before = $("[data-ba-before]", ba);
    const handle = $("[data-ba-handle]", ba);
    let dragging = false;

    function setPos(clientX) {
      const rect = ba.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.width = pct + "%";
      handle.style.left = pct + "%";
    }
    function down(e) {
      dragging = true;
      ba.setPointerCapture && e.pointerId != null && ba.setPointerCapture(e.pointerId);
      setPos(e.clientX != null ? e.clientX : e.touches[0].clientX);
    }
    function move(e) {
      if (!dragging) return;
      setPos(e.clientX != null ? e.clientX : e.touches[0].clientX);
    }
    function up() { dragging = false; }

    if (window.PointerEvent) {
      ba.addEventListener("pointerdown", down);
      ba.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    } else {
      ba.addEventListener("mousedown", down);
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      ba.addEventListener("touchstart", down, { passive: true });
      ba.addEventListener("touchmove", move, { passive: true });
      window.addEventListener("touchend", up);
    }
    // gentle auto "peek" when scrolled into view (once)
    if (!prefersReduced && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            let p = 50, dir = -1, steps = 0;
            const anim = setInterval(() => {
              p += dir * 2; steps++;
              before.style.width = p + "%"; handle.style.left = p + "%";
              if (p <= 38 || p >= 62) dir *= -1;
              if (steps > 24) { clearInterval(anim); before.style.width = "50%"; handle.style.left = "50%"; }
            }, 24);
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.4 });
      io.observe(ba);
    }
  });

  /* ---------------------------------------------------------------
     8 · TESTIMONIAL CAROUSEL
     --------------------------------------------------------------- */
  const viewport = $("[data-quotes]");
  if (viewport) {
    const quotes = $$(".quote", viewport);
    const dotsWrap = $("[data-quote-dots]");
    let idx = 0;
    let timer;

    quotes.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to review " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    const dots = $$("button", dotsWrap);

    function go(n) {
      quotes[idx].classList.remove("is-active");
      dots[idx] && dots[idx].classList.remove("is-active");
      idx = (n + quotes.length) % quotes.length;
      quotes[idx].classList.add("is-active");
      dots[idx] && dots[idx].classList.add("is-active");
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }
    function restart() {
      clearInterval(timer);
      if (!prefersReduced) timer = setInterval(next, 6500);
    }

    $("[data-quote-next]") && $("[data-quote-next]").addEventListener("click", () => { next(); restart(); });
    $("[data-quote-prev]") && $("[data-quote-prev]").addEventListener("click", () => { prev(); restart(); });
    restart();
  }

  /* ---------------------------------------------------------------
     9 · STAT COUNTERS
     --------------------------------------------------------------- */
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const dur = 1600;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const val = Math.round((1 - Math.pow(1 - t, 3)) * target);
      el.textContent = val + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { animateCount(en.target); statIO.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach((el) => statIO.observe(el));
  } else {
    $$("[data-count]").forEach(animateCount);
  }

  /* ---------------------------------------------------------------
     10 · CONTACT FORM (Formspree-ready, with mailto fallback)
     --------------------------------------------------------------- */
  const form = $("[data-contact-form]");
  if (form) {
    const status = $("[data-form-status]");
    const FALLBACK_EMAIL = "hello@mastersondesignstyle.com";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      // simple validation
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();
      if (!name || !email || !message) {
        status.classList.add("is-err");
        status.textContent = "Please add your name, email, and a short note.";
        return;
      }

      const action = form.getAttribute("action") || "";
      const notConfigured = action.indexOf("YOUR_FORM_ID") !== -1;

      // Until Formspree is connected, fall back to the visitor's email app.
      if (notConfigured) {
        const subject = encodeURIComponent("Design inquiry from " + name);
        const body = encodeURIComponent(
          "Name: " + name + "\n" +
          "Email: " + email + "\n" +
          "Phone: " + (data.get("phone") || "") + "\n" +
          "Project type: " + (data.get("project_type") || "") + "\n\n" +
          message
        );
        window.location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + subject + "&body=" + body;
        status.classList.add("is-ok");
        status.textContent = "Opening your email app…";
        return;
      }

      // Real submission to Formspree
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = "Sending…";

      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            form.reset();
            status.classList.add("is-ok");
            status.textContent = "Thank you — your message is on its way. I'll be in touch soon.";
          } else {
            throw new Error("bad response");
          }
        })
        .catch(() => {
          status.classList.add("is-err");
          status.textContent = "Something went wrong. Please email " + FALLBACK_EMAIL + " directly.";
        })
        .finally(() => {
          btn.disabled = false; btn.textContent = original;
        });
    });
  }
})();
