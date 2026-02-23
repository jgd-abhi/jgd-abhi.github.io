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

    taglineElement.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % taglines.length;
      taglineElement.textContent = taglines[index];
      taglineElement.style.opacity = 1;
    }, 500);
  }

  if (taglineElement) {
    taglineElement.textContent = taglines[0];
    setInterval(rotateTagline, 3000);
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

      if (document.body.classList.contains("light")) {
        themeIcon.src = "assets/icons/sun.svg";
      } else {
        themeIcon.src = "assets/icons/moon.svg";
      }
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

  /* ================= DIRECTIONAL FLIP ================= */

  const cards = document.querySelectorAll(".tech-card");

  function closeAllCards() {
    cards.forEach(c => {
      c.classList.remove("flip-left", "flip-right", "flip-top", "flip-bottom");
    });
  }

  function getDirection(card, clientX, clientY) {
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx < 0 ? "flip-left" : "flip-right";
    } else {
      return dy < 0 ? "flip-top" : "flip-bottom";
    }
  }

  cards.forEach(card => {

    /* Desktop click */
    card.addEventListener("click", function (e) {
      e.stopPropagation();

      const isAlreadyOpen =
        card.classList.contains("flip-left") ||
        card.classList.contains("flip-right") ||
        card.classList.contains("flip-top") ||
        card.classList.contains("flip-bottom");

      closeAllCards();

      if (!isAlreadyOpen) {
        const direction = getDirection(card, e.clientX, e.clientY);
        card.classList.add(direction);
      }
    });

    /* Mobile touch */
    card.addEventListener("touchstart", function (e) {
      e.stopPropagation();

      const touch = e.touches[0];

      const isAlreadyOpen =
        card.classList.contains("flip-left") ||
        card.classList.contains("flip-right") ||
        card.classList.contains("flip-top") ||
        card.classList.contains("flip-bottom");

      closeAllCards();

      if (!isAlreadyOpen) {
        const direction = getDirection(card, touch.clientX, touch.clientY);
        card.classList.add(direction);
      }
    }, { passive: true });

  });

  /* Auto close outside */
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".tech-card")) {
      closeAllCards();
    }
  });

  /* ================= CURSOR GLOW ================= */

  const glow = document.querySelector(".cursor-glow");

  if (glow) {
    document.addEventListener("mousemove", rafThrottle((e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }));
  }

  /* ================= 3D TILT (DESKTOP ONLY) ================= */

  if (window.innerWidth > 768) {
    cards.forEach(card => {

      card.addEventListener("mousemove", (e) => {

        if (
          card.classList.contains("flip-left") ||
          card.classList.contains("flip-right") ||
          card.classList.contains("flip-top") ||
          card.classList.contains("flip-bottom")
        ) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 14;
        const rotateY = (x - centerX) / 14;

        card.style.transform = `
          perspective(1400px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(6px)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `
          perspective(1400px)
          rotateX(0deg)
          rotateY(0deg)
          translateZ(0px)
        `;
      });

    });
  }

  /* ================= HERO PARALLAX ================= */

  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", rafThrottle(() => {
      const offset = window.scrollY * 0.05;
      hero.style.transform = `translateY(${offset}px)`;
    }));
  }

});
