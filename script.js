/* Orangeville Stairlift - progressive enhancement only.
   Without JS (or with reduced motion) the page is fully visible and works. */
(function () {
  "use strict";

  // Kick the hero video in case the browser stalls autoplay (file://, power saver, etc.)
  var vid = document.querySelector("video.hero-bg");
  if (vid) {
    var kick = function () {
      var p = vid.play();
      if (p && p.catch) p.catch(function () {});
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick);
  }

  // Booking form: submit in the background, thank the visitor on the page.
  // Without JS the form still posts to Formspree's hosted thank-you page.
  var form = document.querySelector("form.form");
  if (form && (form.getAttribute("action") || "").indexOf("formspree.io") !== -1) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var btnLabel = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (!res.ok) throw new Error("send failed");
        form.innerHTML = '<p class="form-done"><strong>Thank you, your request is in.</strong><br>We will call you shortly to arrange your free in-home assessment.</p>';
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
        var err = form.querySelector(".form-error");
        if (!err) {
          err = document.createElement("p");
          err.className = "form-error";
          form.appendChild(err);
        }
        err.textContent = "Something went wrong sending your request. Please call 519-904-4932 and we will book you in.";
      });
    });
  }

  // Header shadow once the page scrolls
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal: opt in only when the browser supports it and motion is allowed
  var motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  if (!motionOK || !("IntersectionObserver" in window)) return;

  var targets = document.querySelectorAll(
    ".feature-card, .product-card, .why-item, .quote, .step, .gallery-grid img, .split-media, .split-copy, .compare-inner > *"
  );
  if (!targets.length) return;

  // Stagger siblings inside the same parent, capped so late items don't lag
  var groups = new Map();
  targets.forEach(function (el) {
    var list = groups.get(el.parentElement) || [];
    list.push(el);
    groups.set(el.parentElement, list);
  });
  groups.forEach(function (list) {
    list.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", Math.min(i, 5) * 70 + "ms");
      el.classList.add("reveal");
    });
  });

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  targets.forEach(function (el) {
    io.observe(el);
  });

  // Safety net: if the observer never fired at all, reveal everything
  setTimeout(function () {
    if (!document.querySelector(".reveal.in-view")) {
      targets.forEach(function (el) {
        el.classList.add("in-view");
        io.unobserve(el);
      });
    }
  }, 1500);
})();
