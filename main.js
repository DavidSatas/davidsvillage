const canvas=document.getElementById('scene'),ctx=canvas.getContext('2d');let W,H,dpr;function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}addEventListener('resize',resize);resize();
let start=performance.now(),skipped=false,dialogueShown=false,finished=false;const lines=["Evening. Welcome to David's Village.","Don't worry about the cold. The snow is warmer than it looks.","David built this place in 1989. You're safe here.","The village is just beyond these gates. Go explore when you're ready."];let li=0;
const dialog=document.getElementById('dialogue'),line=document.getElementById('line');line.textContent=lines[0];
document.getElementById('continue').onclick=()=>{if(li<lines.length-1){li++;line.textContent=lines[li]}else finish()};document.getElementById('skip').onclick=finish;
function finish(){finished=true;dialog.classList.add('hidden')}
const flakes=Array.from({length:180},()=>({x:Math.random(),y:Math.random(),s:.5+Math.random()*2,v:.15+Math.random()*.5}));
function poly(points,fill,stroke){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.stroke()}}
function tree(x,y,s){ctx.fillStyle='#233c3a';poly([[x,y],[x-32*s,y+90*s],[x+32*s,y+90*s]],'#27413e');poly([[x,y+35*s],[x-25*s,y+105*s],[x+25*s,y+105*s]],'#213936');ctx.fillStyle='#4b4037';ctx.fillRect(x-4*s,y+95*s,8*s,32*s)}
function draw(t){const elapsed=(t-start)/1000;ctx.clearRect(0,0,W,H);const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#182b40');sky.addColorStop(.58,'#263f52');sky.addColorStop(.59,'#9caeb0');sky.addColorStop(1,'#d6dfdb');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
// aurora
ctx.save();ctx.globalAlpha=.16;ctx.strokeStyle='#88bca9';ctx.lineWidth=45;ctx.beginPath();ctx.moveTo(-80,130);for(let x=-80;x<W+100;x+=35)ctx.lineTo(x,130+Math.sin(x*.012+t*.0002)*35);ctx.stroke();ctx.restore();
// distant hills
poly([[0,H*.56],[W*.18,H*.43],[W*.34,H*.55],[W*.55,H*.4],[W*.76,H*.54],[W,H*.43],[W,H*.67],[0,H*.67]],'#526a77');poly([[0,H*.6],[W*.2,H*.5],[W*.4,H*.61],[W*.62,H*.49],[W*.8,H*.61],[W,H*.5],[W,H*.7],[0,H*.7]],'#70848b');
// road perspective
poly([[W*.42,H],[W*.58,H],[W*.535,H*.49],[W*.465,H*.49]],'#aeb9b8');
// trees
for(let i=0;i<22;i++){const x=(i%2?W*.08:W*.92)+(Math.sin(i*7)*W*.09);const y=H*.45+(i%6)*18;tree(x,y,0.55+(i%4)*.12)}
// gate
const gateY=H*.47, postH=H*.27, pw=Math.max(25,W*.025), gap=W*.26;ctx.fillStyle='#4a3930';ctx.fillRect(W/2-gap/2-pw,gateY-postH,pw,postH);ctx.fillRect(W/2+gap/2,gateY-postH,pw,postH);ctx.fillRect(W/2-gap/2,gateY-postH,W/2+gap/2-(W/2-gap/2),pw*.7);ctx.fillStyle='#d6b36b';ctx.fillRect(W/2-gap*.34,gateY-postH*.78,gap*.68,34);ctx.fillStyle='#f3d58b';ctx.font='bold 14px Georgia';ctx.textAlign='center';ctx.fillText("DAVID'S VILLAGE",W/2,gateY-postH*.78+23);
// warm lamps
for(const x of [W/2-gap/2-pw/2,W/2+gap/2+pw/2]){const g=ctx.createRadialGradient(x,gateY-postH*.78,2,x,gateY-postH*.78,80);g.addColorStop(0,'rgba(255,206,116,.8)');g.addColorStop(1,'rgba(255,206,116,0)');ctx.fillStyle=g;ctx.fillRect(x-80,gateY-postH*.78-80,160,160);ctx.fillStyle='#e6bd72';ctx.beginPath();ctx.arc(x,gateY-postH*.78,7,0,7);ctx.fill()}
// guard silhouette, friendly but imposing
const gx=W/2,gy=gateY+10;ctx.fillStyle='#3f4d57';ctx.beginPath();ctx.ellipse(gx,gy-45,29,45,0,0,7);ctx.fill();ctx.fillStyle='#c99779';ctx.beginPath();ctx.arc(gx,gy-99,20,0,7);ctx.fill();ctx.fillStyle='#313b43';ctx.fillRect(gx-25,gy-124,50,14);ctx.fillRect(gx-31,gy-111,62,7);ctx.fillStyle='#273238';ctx.fillRect(gx-25,gy-5,16,55);ctx.fillRect(gx+9,gy-5,16,55);
// village glow beyond gate
ctx.globalAlpha=.25;ctx.fillStyle='#f0c777';for(let i=0;i<5;i++)ctx.fillRect(W/2-gap*.4+i*gap*.18,gateY-70-(i%2)*35,13,13);ctx.globalAlpha=1;
// snow
for(const f of flakes){f.y+=f.v*.004;if(f.y>1)f.y=0;ctx.fillStyle='rgba(244,248,246,.7)';ctx.beginPath();ctx.arc(f.x*W,f.y*H,f.s,0,7);ctx.fill()}
if(!finished&&!dialogueShown&&elapsed>6){dialogueShown=true;dialog.classList.remove('hidden')}
requestAnimationFrame(draw)}requestAnimationFrame(draw);setTimeout(()=>document.getElementById('loading').classList.add('done'),1200);
