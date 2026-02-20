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

// THEME SWITCHES
const themeSwitch=document.getElementById("themeSwitch");
const redSwitch=document.getElementById("redSwitch");

themeSwitch.addEventListener("change",()=>{
    if(themeSwitch.checked){
        document.body.classList.add("light");
        redSwitch.checked=false;
        document.body.classList.remove("red");
    }else{
        document.body.classList.remove("light");
    }
});

redSwitch.addEventListener("change",()=>{
    if(redSwitch.checked){
        document.body.classList.add("red");
        themeSwitch.checked=false;
        document.body.classList.remove("light");
    }else{
        document.body.classList.remove("red");
    }
});

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
