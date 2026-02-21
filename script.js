// Theme toggle
document.getElementById("themeToggle").onclick=function(){
  document.body.classList.toggle("light");
};

// Accent toggle
const accentBtn=document.getElementById("accentToggle");
const accentIcon=document.getElementById("accentIcon");
let red=false;

accentBtn.onclick=function(){
  red=!red;
  if(red){
    document.documentElement.style.setProperty('--accent','#ee0000');
    accentIcon.src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg";
  }else{
    document.documentElement.style.setProperty('--accent','#3b82f6');
    accentIcon.src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg";
  }
};

// Typing effect
const text=[
"Designing Secure Cloud Architectures.",
"Automating STG → PROD Deployments.",
"Engineering Reliable Kubernetes Platforms."
];
let i=0,j=0;
const typing=document.getElementById("typing");

function type(){
  if(j<text[i].length){
    typing.textContent+=text[i][j++];
    setTimeout(type,50);
  }else setTimeout(erase,1500);
}
function erase(){
  if(j>0){
    typing.textContent=text[i].substring(0,--j);
    setTimeout(erase,30);
  }else{
    i=(i+1)%text.length;
    setTimeout(type,200);
  }
}
type();
