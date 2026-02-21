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

// Dark toggle
document.getElementById("themeToggle").onclick=()=>{
  document.body.classList.toggle("light");
};

// Accent buttons
document.getElementById("blueAccent").onclick=()=>{
  document.documentElement.style.setProperty('--accent','#3b82f6');
};

document.getElementById("redAccent").onclick=()=>{
  document.documentElement.style.setProperty('--accent','#ee0000');
};

// Animated counters
const counters=document.querySelectorAll('[data-count]');
const speed=200;

counters.forEach(counter=>{
  const update=()=>{
    const target=+counter.getAttribute('data-count');
    const count=+counter.innerText;
    const inc=target/speed;

    if(count<target){
      counter.innerText=Math.ceil(count+inc);
      setTimeout(update,10);
    }else counter.innerText=target;
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
