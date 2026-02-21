// HERO LOOP
const phrases=[
"Designing Secure Cloud Architectures.",
"Automating STG → PROD Deployments.",
"Engineering Reliable Kubernetes Platforms.",
"Building Secure & Scalable DevOps Systems."
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

// THEME TOGGLES
document.getElementById("darkToggle").onclick=()=>{
    document.body.classList.toggle("dark");
};

document.getElementById("redToggle").onclick=()=>{
    document.body.classList.toggle("red");
};

// ACCORDION
document.querySelectorAll(".accordion-header").forEach(header=>{
    header.addEventListener("click",()=>{
        const content=header.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    });
});
