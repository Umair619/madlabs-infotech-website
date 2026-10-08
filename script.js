/* ==========================================================
   MADLABS INFOTECH — INTERACTIONS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.getElementById("loader");
  const header = document.getElementById("header");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  // Page loader
  body.classList.add("locked");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("done");
      body.classList.remove("locked");
    }, 650);
  });

  // Header state
  const headerScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", headerScroll, { passive: true });
  headerScroll();

  // Mobile menu
  menuButton.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    body.classList.toggle("locked", open);
    const spans = menuButton.querySelectorAll("span");
    if (open) {
      spans[0].style.transform = "translateY(8px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
      spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    }
  });

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      body.classList.remove("locked");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    });
  });

  // Reveal-on-scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Animated counters
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: .7 });

  counters.forEach(el => counterObserver.observe(el));

  // Subtle parallax for hero visual
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && window.matchMedia("(min-width: 901px)").matches) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - .5);
      const y = (e.clientY / window.innerHeight - .5);
      heroVisual.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
    }, { passive: true });
  }

  // Custom cursor
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (dot && ring && window.matchMedia("(pointer:fine)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    const cursorLoop = () => {
      rx += (mx - rx) * .14;
      ry += (my - ry) * .14;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(cursorLoop);
    };
    cursorLoop();

    document.querySelectorAll("a,button,.cap-card,.visual-card").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  // Magnetic buttons
  document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("mousemove", e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * .18;
      const y = (e.clientY - rect.top - rect.height / 2) * .18;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener("mouseleave", () => el.style.transform = "");
  });

  // 3D-ish capability cards
  document.querySelectorAll(".cap-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      if (window.innerWidth < 760) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Contact form — direct FormSubmit submission.
  // The form intentionally uses the standard FormSubmit endpoint so it behaves
  // exactly like the working FormSubmit example and opens the response in a new tab.

  // Dynamic year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Anchor scrolling with fixed-header offset
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (id === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 12;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth"
      });
    });
  });
});
