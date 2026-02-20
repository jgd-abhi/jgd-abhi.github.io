// DARK / LIGHT TOGGLE
const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
};

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}

// TYPING TERMINAL EFFECT
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
        setTimeout(typeWriter, 35);
    }
}
typeWriter();

// PARTICLES
const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "3px";
    particle.style.height = "3px";
    particle.style.background = "#38bdf8";
    particle.style.borderRadius = "50%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.opacity = Math.random();
    particle.style.animation = `float ${6 + Math.random() * 10}s infinite`;
    particlesContainer.appendChild(particle);
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-60px); }
    100% { transform: translateY(0px); }
}`;
document.head.appendChild(style);

// GITHUB FETCH
fetch("https://api.github.com/users/jgd-abhi/repos?sort=updated")
    .then(res => res.json())
    .then(data => {
        const reposContainer = document.getElementById("repos");
        data.slice(0, 6).forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("repo-card");
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Production DevOps repository"}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            reposContainer.appendChild(card);
        });
    });
