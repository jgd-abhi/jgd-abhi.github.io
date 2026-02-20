// Simple floating particle animation
const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.position = "absolute";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.background = "#38bdf8";
    particle.style.borderRadius = "50%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.opacity = Math.random();
    particle.style.animation = `float ${5 + Math.random() * 10}s infinite`;
    particlesContainer.appendChild(particle);
}

// Add floating keyframes dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-40px); }
    100% { transform: translateY(0px); }
}`;
document.head.appendChild(style);

// GitHub Repo Auto Fetch
//fetch("https://api.github.com/users/jgd-abhi/repos")
//    .then(res => res.json())
//    .then(data => {
//        const reposContainer = document.getElementById("repos");
//        data.slice(0, 6).forEach(repo => {
//            const card = document.createElement("div");
//            card.classList.add("repo-card");
//            card.innerHTML = `
//                <h3>${repo.name}</h3>
//                <p>${repo.description || "No description available"}</p>
//                <a href="${repo.html_url}" target="_blank">View Repository</a>
//           `;
//            reposContainer.appendChild(card);
//       });
//    })
//    .catch(error => console.error(error));
