// Typing effect
const text = [
"Designing Secure Cloud Architectures.",
"Automating STG → PROD Deployments.",
"Engineering Reliable Kubernetes Platforms."
];

let index=0, charIndex=0;
const typing=document.getElementById("typing");

function type(){
  if(charIndex<text[index].length){
    typing.textContent+=text[index][charIndex++];
    setTimeout(type,50);
  } else setTimeout(erase,1500);
}

function erase(){
  if(charIndex>0){
    typing.textContent=text[index].substring(0,--charIndex);
    setTimeout(erase,30);
  } else{
    index=(index+1)%text.length;
    setTimeout(type,200);
  }
}
type();

// Dark / Light toggle with icon switch
const themeBtn=document.getElementById("themeToggle");
themeBtn.onclick=()=>{
  document.body.classList.toggle("light");
  themeBtn.textContent=document.body.classList.contains("light")?"🌙":"☀️";
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

// Animated counters
document.querySelectorAll('[data-count]').forEach(counter=>{
  const target=+counter.getAttribute('data-count');
  let count=0;
  const update=()=>{
    count+=1;
    counter.innerText=count;
    if(count<target) requestAnimationFrame(update);
  };
  update();
});

// Particle background
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
for(let i=0;i<40;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    dx:(Math.random()-0.5),
    dy:(Math.random()-0.5)
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.dx;
    p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
    ctx.fillStyle="rgba(59,130,246,0.4)";
    ctx.fillRect(p.x,p.y,2,2);
  });
  requestAnimationFrame(animate);
}
animate();
