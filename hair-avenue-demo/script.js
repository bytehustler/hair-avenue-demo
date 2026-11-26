/* The Hair Avenue Unisex Salon — Concept Demo */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "919595073807";
  var BUSINESS_NAME = "The Hair Avenue";

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var waFloat = document.querySelector(".wa-float");

  /* ---------- Header state + floating WhatsApp ---------- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 40);
    if (waFloat) waFloat.classList.toggle("visible", y > window.innerHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  function setNav(open) {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setNav(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setNav(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setNav(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 960 && nav.classList.contains("open")) setNav(false);
  });

  /* ---------- Active nav link on scroll ---------- */
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('ul a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = "#" + entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.08 + "s";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Service-specific WhatsApp messages ---------- */
  document.querySelectorAll("[data-service]").forEach(function (link) {
    var service = link.getAttribute("data-service");
    var message = "Hello " + BUSINESS_NAME + ", I would like to enquire about " + service + ".";
    link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  });

  /* ---------- Before / after slider ---------- */
  var ba = document.querySelector(".ba-slider");
  if (ba) {
    var range = ba.querySelector(".ba-range");
    var update = function () { ba.style.setProperty("--pos", range.value + "%"); };
    range.addEventListener("input", update);
    update();
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector("figcaption");
    var lastTrigger = null;

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var thumb = item.querySelector("img");
        lastTrigger = item;
        lbImg.src = thumb.currentSrc || thumb.src;
        lbImg.alt = thumb.alt;
        lbCap.textContent = item.getAttribute("data-caption") || "";
        lightbox.showModal();
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
      lightbox.close();
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("close", function () {
      lbImg.src = "";
      if (lastTrigger) lastTrigger.focus();
    });
  } else {
    /* Older browsers: open the image directly */
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        window.open(item.querySelector("img").src, "_blank", "noopener");
      });
    });
  }

  /* ---------- Highlight today's opening hours (IST) ---------- */
  try {
    var weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Kolkata" }).format(new Date());
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var row = document.querySelector('.hours tr[data-day="' + map[weekday] + '"]');
    if (row) row.classList.add("today");
  } catch (err) { /* ignore */ }

  /* ---------- Theme switcher (demo only) ---------- */
  initThemeSwitcher("ha-theme");

  /* ---------- Image fallback: if a photo fails to load, show a neutral placeholder ---------- */
  initImageFallback("assets/placeholder.svg");

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ===== Helpers ===== */

  function initThemeSwitcher(storageKey) {
    var wrap = document.querySelector(".theme-switcher");
    if (!wrap) return;
    var btn = wrap.querySelector(".theme-btn");
    var menu = wrap.querySelector(".theme-menu");
    var options = wrap.querySelectorAll("[data-theme-option]");
    var root = document.documentElement;
    var metaColor = document.querySelector('meta[name="theme-color"]');

    function mark() {
      var current = root.getAttribute("data-theme");
      options.forEach(function (o) {
        o.setAttribute("aria-checked", String(o.getAttribute("data-theme-option") === current));
      });
      if (metaColor) metaColor.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim());
    }
    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    }

    btn.addEventListener("click", function () { setOpen(menu.hidden); });
    options.forEach(function (o) {
      o.addEventListener("click", function () {
        var theme = o.getAttribute("data-theme-option");
        root.setAttribute("data-theme", theme);
        try { localStorage.setItem(storageKey, theme); } catch (e) { /* storage unavailable */ }
        mark();
        setOpen(false);
        btn.focus();
      });
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); btn.focus(); }
    });
    mark();
  }

  function initImageFallback(placeholder) {
    document.querySelectorAll("img").forEach(function (img) {
      var swap = function () {
        if (img.dataset.fallback) return;
        img.dataset.fallback = "1";
        img.src = placeholder;
      };
      img.addEventListener("error", swap);
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) swap();
    });
  }
})();
