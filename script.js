// THEME SWITCH
const themeSwitch = document.getElementById("themeSwitch");
const redSwitch = document.getElementById("redSwitch");

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("light");
    document.body.classList.remove("red");
});

redSwitch.addEventListener("change", () => {
    document.body.classList.toggle("red");
    document.body.classList.remove("light");
});

// TYPING
const text = `
$ whoami
Abhijeet

$ role
DevOps Engineer

$ focus
Cloud | Kubernetes | CI/CD | Automation
`;

let i=0;
function type(){
    if(i<text.length){
        document.getElementById("typing").innerHTML+=text.charAt(i);
        i++;
        setTimeout(type,30);
    }
}
type();

// SCROLL REVEAL
const reveals=document.querySelectorAll(".reveal");
window.addEventListener("scroll",()=>{
    reveals.forEach(el=>{
        if(el.getBoundingClientRect().top<window.innerHeight-100){
            el.classList.add("active");
        }
    });
});

// PARALLAX
window.addEventListener("scroll",()=>{
    document.querySelectorAll("[data-speed]").forEach(el=>{
        const speed=el.getAttribute("data-speed");
        el.style.transform=`translateY(${window.scrollY*speed}px)`;
    });
});

// NETWORK
const canvas=document.getElementById("network");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let nodes=[];
for(let i=0;i<40;i++){
    nodes.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        dx:(Math.random()-0.5),
        dy:(Math.random()-0.5)
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    nodes.forEach(n=>{
        n.x+=n.dx;n.y+=n.dy;
        if(n.x<0||n.x>canvas.width)n.dx*=-1;
        if(n.y<0||n.y>canvas.height)n.dy*=-1;

        ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--accent');
        ctx.fillRect(n.x,n.y,2,2);
    });
    requestAnimationFrame(animate);
}
animate();

// GITHUB
fetch("https://api.github.com/users/jgd-abhi/repos?sort=updated")
.then(res=>res.json())
.then(data=>{
    const container=document.getElementById("repos");
    data.slice(0,6).forEach(repo=>{
        const card=document.createElement("div");
        card.classList.add("repo-card");
        card.innerHTML=`
            <h3>${repo.name}</h3>
            <p>${repo.description||"DevOps Repository"}</p>
            <a href="${repo.html_url}" target="_blank">View Repository</a>
        `;
        container.appendChild(card);
    });
});
