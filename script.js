document.addEventListener("DOMContentLoaded", function () {

  /* ================= HERO CROSSFADE ================= */

  const taglines = [
    "AWS Infrastructure Architecture",
    "Kubernetes Platform Engineering",
    "Secure CI/CD Automation",
    "OpenShift Enterprise Deployments",
    "Infrastructure as Code (Terraform)",
    "Production-Grade Monitoring & Logging"
  ];

  const taglineElement = document.getElementById("dynamicTagline");
  let index = 0;

  function rotateTagline() {
    if (!taglineElement) return;

    taglineElement.style.opacity = "0";

    setTimeout(() => {
      index = (index + 1) % taglines.length;
      taglineElement.textContent = taglines[index];
      taglineElement.style.opacity = "1";
    }, 400);
  }

  if (taglineElement) {
    taglineElement.textContent = taglines[0];
    setInterval(rotateTagline, 2800);
  }

  /* ================= RAF THROTTLE ================= */

  function rafThrottle(fn) {
    let ticking = false;
    return function (...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          fn.apply(this, args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  /* ================= THEME TOGGLE ================= */

  const themeBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  if (themeBtn && themeIcon) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");

      const isLight = document.body.classList.contains("light");

      themeIcon.src = isLight
        ? "assets/icons/sun.svg"
        : "assets/icons/moon.svg";
    });
  }

  /* ================= ACCENT TOGGLE ================= */

  const accentBtn = document.getElementById("accentToggle");
  const accentIcon = document.getElementById("accentIcon");

  let red = false;

  if (accentBtn && accentIcon) {
    accentBtn.addEventListener("click", () => {
      red = !red;

      if (red) {
        document.documentElement.style.setProperty("--accent", "#e10600");
        accentIcon.src = "assets/icons/openshift.svg";
      } else {
        document.documentElement.style.setProperty("--accent", "#3b82f6");
        accentIcon.src = "assets/icons/kubernetes.svg";
      }
    });
  }

  /* ================= CARD FLIP ================= */

  const cards = document.querySelectorAll(".tech-card");

  function closeAllCards() {
    cards.forEach(c =>
      c.classList.remove("flip-left", "flip-right", "flip-top", "flip-bottom")
    );
  }

  function isFlipped(card) {
    return ["flip-left", "flip-right", "flip-top", "flip-bottom"]
      .some(cls => card.classList.contains(cls));
  }

  function getDirection(card, clientX, clientY) {
    const rect = card.getBoundingClientRect();

    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx < 0 ? "flip-left" : "flip-right";
    } else {
      return dy < 0 ? "flip-top" : "flip-bottom";
    }
  }

  /* DESKTOP CLICK */

  cards.forEach(card => {
    card.addEventListener("click", function (e) {
      e.stopPropagation();

      const alreadyOpen = isFlipped(card);

      closeAllCards();

      if (!alreadyOpen) {
        const dir = getDirection(card, e.clientX, e.clientY);
        card.classList.add(dir);
      }
    });
  });

  /* MOBILE TOUCH (no double trigger) */

  let touched = false;

  cards.forEach(card => {
    card.addEventListener("touchstart", function (e) {
      touched = true;

      const touch = e.touches[0];
      const alreadyOpen = isFlipped(card);

      closeAllCards();

      if (!alreadyOpen) {
        const dir = getDirection(card, touch.clientX, touch.clientY);
        card.classList.add(dir);
      }
    }, { passive: true });
  });

  /* PREVENT CLICK AFTER TOUCH */

  document.addEventListener("click", function (e) {
    if (touched) {
      touched = false;
      return;
    }

    if (!e.target.closest(".tech-card")) {
      closeAllCards();
    }
  });

  /* ================= CURSOR GLOW ================= */

  const glow = document.querySelector(".cursor-glow");

  if (glow && window.innerWidth > 768) {
    document.addEventListener("mousemove", rafThrottle((e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }));
  }

  /* ================= 3D TILT ================= */

  if (window.innerWidth > 768) {
    cards.forEach(card => {

      card.addEventListener("mousemove", (e) => {

        if (isFlipped(card)) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 18;
        const rotateY = (x - rect.width / 2) / 18;

        card.style.transform = `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
      });

    });
  }

  /* ================= HERO PARALLAX ================= */

  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", rafThrottle(() => {
      hero.style.transform = `translateY(${window.scrollY * 0.04}px)`;
    }));
  }

});

/* ================= ELITE ORBIT ================= */

const orbitItems = document.querySelectorAll(".orbit-item");
const orbitCenter = document.getElementById("orbitCenter");

orbitItems.forEach(item => {

  item.addEventListener("click", () => {

    const tech = item.getAttribute("data-tech");

    orbitCenter.innerHTML = `<h3>${tech}</h3>`;

    // Add glow effect
    orbitCenter.classList.add("glow-accent");

    setTimeout(() => {
      orbitCenter.classList.remove("glow-accent");
    }, 800);

  });

});
