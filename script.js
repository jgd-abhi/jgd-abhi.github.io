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

  /* ================= FLIP CARDS ================= */

  const cards = document.querySelectorAll(".tech-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flip");
    });
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

  /* ================= HERO DEPTH PARALLAX ================= */

  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", rafThrottle(() => {
      const offset = window.scrollY * 0.05;
      hero.style.transform = `translateY(${offset}px)`;
    }));
  }

});
