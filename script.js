// HERO LOOP
const phrases=[
"Building Reliable Cloud Platforms.",
"Automating Scalable Deployments.",
"Engineering CI/CD Pipelines.",
"Managing Kubernetes Environments."
];

let index=0;
let charIndex=0;
const loopText=document.getElementById("loopText");

function typeLoop(){
    if(charIndex<phrases[index].length){
        loopText.textContent+=phrases[index][charIndex];
        charIndex++;
        setTimeout(typeLoop,50);
    }else{
        setTimeout(eraseLoop,1500);
    }
}

function eraseLoop(){
    if(charIndex>0){
        loopText.textContent=phrases[index].substring(0,charIndex-1);
        charIndex--;
        setTimeout(eraseLoop,30);
    }else{
        index=(index+1)%phrases.length;
        setTimeout(typeLoop,200);
    }
}
typeLoop();

// LIGHTWEIGHT CANVAS
const canvas=document.getElementById("network");
const ctx=canvas.getContext("2d");

function resize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

let nodes=[];
for(let i=0;i<20;i++){
    nodes.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        dx:(Math.random()-0.5)*0.5,
        dy:(Math.random()-0.5)*0.5
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    nodes.forEach(n=>{
        n.x+=n.dx;
        n.y+=n.dy;
        if(n.x<0||n.x>canvas.width)n.dx*=-1;
        if(n.y<0||n.y>canvas.height)n.dy*=-1;
        ctx.fillStyle="rgba(59,130,246,0.4)";
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
        card.className="tech-card";
        card.innerHTML=`
            <h3>${repo.name}</h3>
            <p>${repo.description||"DevOps Repository"}</p>
        `;
        container.appendChild(card);
    });
});
