/* ================= DOM READY WRAPPER ================= */

document.addEventListener("DOMContentLoaded", function () {


/* ================= HERO CROSSFADE ROTATION ================= */

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

rotateTagline();

  /* ================= PERFORMANCE SAFE RAF ================= */

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

  /* ================= THEME + ACCENT ================= */

  const themeBtn = document.getElementById("themeToggle");
  const accentBtn = document.getElementById("accentToggle");
  const accentIcon = document.getElementById("accentIcon");

  let red = false;

  if (themeBtn) {
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
  }

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

  
  /* ================= TRUE DIRECTIONAL READABLE FLIP ================= */

const cards = document.querySelectorAll(".tech-card");

cards.forEach(card => {

  card.addEventListener("click", function (e) {

    // Prevent outside click handler from firing
    e.stopPropagation();

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;

    // Determine dominant axis
    let direction;

    if (Math.abs(dx) > Math.abs(dy)) {
      direction = dx < 0 ? "flip-left" : "flip-right";
    } else {
      direction = dy < 0 ? "flip-top" : "flip-bottom";
    }

    const isAlreadyOpen =
      card.classList.contains("flip-left") ||
      card.classList.contains("flip-right") ||
      card.classList.contains("flip-top") ||
      card.classList.contains("flip-bottom");

    // Close all cards first
    cards.forEach(c => {
      c.classList.remove("flip-left", "flip-right", "flip-top", "flip-bottom");
    });

    // If this card wasn't already open → open it
    if (!isAlreadyOpen) {
      card.classList.add(direction);
    }
  });

});

/* ================= AUTO CLOSE ON OUTSIDE CLICK ================= */

document.addEventListener("click", function (e) {

  if (!e.target.closest(".tech-card")) {
    cards.forEach(c => {
      c.classList.remove("flip-left", "flip-right", "flip-top", "flip-bottom");
    });
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

  /* ================= STRONGER 3D TILT ================= */


  if (window.innerWidth > 768){
    document.querySelectorAll(".tech-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

    if (card.classList.contains("flip")) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(8px)
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

  /* ================= HERO DEPTH PARALLAX ================= */

  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", rafThrottle(() => {
      const offset = window.scrollY * 0.05;
      hero.style.transform = `translateY(${offset}px)`;
    }));
  }

});
