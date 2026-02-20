// THEME TOGGLES
const lightDarkToggle = document.getElementById("lightDarkToggle");
const redToggle = document.getElementById("redThemeToggle");

lightDarkToggle.onclick = () => {
    document.body.classList.toggle("light");
    document.body.classList.remove("red");
    lightDarkToggle.textContent =
        document.body.classList.contains("light") ? "☀️" : "🌙";
};

redToggle.onclick = () => {
    document.body.classList.toggle("red");
    document.body.classList.remove("light");
};

// TYPING EFFECT
const text = `
$ whoami
Abhijeet

$ role
DevOps Engineer

$ expertise
OpenShift | Kubernetes | CI/CD | Cloud Architecture
`;

let i = 0;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
}
typeWriter();

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// METRIC COUNTERS
function animateCounter(id, target, speed) {
    let count = 0;
    const element = document.getElementById(id);
    const interval = setInterval(() => {
        count += Math.ceil(target / 100);
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        element.innerText = count;
    }, speed);
}

animateCounter("deployments", 250, 20);
animateCounter("clusters", 12, 60);
animateCounter("uptime", 99, 40);

// PARALLAX
window.addEventListener("scroll", () => {
    document.querySelectorAll("[data-speed]").forEach(el => {
        const speed = el.getAttribute("data-speed");
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

// NETWORK BACKGROUND
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
for (let i = 0; i < 50; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5),
        dy: (Math.random() - 0.5)
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
        n.x += n.dx;
        n.y += n.dy;

        if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.dy *= -1;

        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent');
        ctx.fillRect(n.x, n.y, 2, 2);

        nodes.forEach(m => {
            let dist = Math.hypot(n.x - m.x, n.y - m.y);
            if (dist < 120) {
                ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--accent') + "20";
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(m.x, m.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animate);
}
animate();

// GITHUB FETCH
fetch("https://api.github.com/users/jgd-abhi/repos?sort=updated")
.then(res => res.json())
.then(data => {
    const reposContainer = document.getElementById("repos");
    data.slice(0,6).forEach(repo=>{
        const card=document.createElement("div");
        card.classList.add("repo-card");
        card.innerHTML=`
            <h3>${repo.name}</h3>
            <p>${repo.description||"Production DevOps Repository"}</p>
            <a href="${repo.html_url}" target="_blank">View Repository</a>
        `;
        reposContainer.appendChild(card);
    });
});
