// THEME
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
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

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

// NETWORK GRAPH BACKGROUND
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
for(let i=0;i<60;i++){
    nodes.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        dx:(Math.random()-0.5)*1,
        dy:(Math.random()-0.5)*1
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    nodes.forEach(n=>{
        n.x+=n.dx;
        n.y+=n.dy;

        if(n.x<0||n.x>canvas.width) n.dx*=-1;
        if(n.y<0||n.y>canvas.height) n.dy*=-1;

        ctx.fillStyle="#38bdf8";
        ctx.fillRect(n.x,n.y,2,2);

        nodes.forEach(m=>{
            let dist=Math.hypot(n.x-m.x,n.y-m.y);
            if(dist<120){
                ctx.strokeStyle="rgba(56,189,248,0.1)";
                ctx.beginPath();
                ctx.moveTo(n.x,n.y);
                ctx.lineTo(m.x,m.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animate);
}
animate();
