// Theme toggle
const themeBtn=document.getElementById("themeToggle");
themeBtn.onclick=()=>{
  document.body.classList.toggle("light");
};

// Accent toggle Azure <-> RedHat
const accentBtn=document.getElementById("accentToggle");
const accentIcon=document.getElementById("accentIcon");
let red=false;

accentBtn.onclick=()=>{
  red=!red;
  if(red){
    document.documentElement.style.setProperty('--accent','#ee0000');
    accentIcon.src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg";
  }else{
    document.documentElement.style.setProperty('--accent','#3b82f6');
    accentIcon.src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg";
  }
};
