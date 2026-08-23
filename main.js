const canvas=document.getElementById('scene');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x14283a);scene.fog=new THREE.FogExp2(0x182d40,.018);
const camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,.1,500);camera.position.set(0,2.25,18);
const moon=new THREE.DirectionalLight(0x9bb2c8,1.1);moon.position.set(-20,30,10);scene.add(moon);scene.add(new THREE.HemisphereLight(0x8da9bf,0x25352f,.65));
const warm=new THREE.PointLight(0xffc66e,2.2,16);warm.position.set(0,5,-15);scene.add(warm);
function mat(c){return new THREE.MeshStandardMaterial({color:c,roughness:.9})}
const snowMat=mat(0xdce5e3),dark=mat(0x263d43),wood=mat(0x4b3b31),coat=mat(0x4a5660),skin=mat(0xc89b7b),gold=mat(0xd6b36a);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(180,180),snowMat);ground.rotation.x=-Math.PI/2;ground.position.y=-.02;ground.receiveShadow=true;scene.add(ground);
// road
const road=new THREE.Mesh(new THREE.PlaneGeometry(10,120),mat(0xaebcc0));road.rotation.x=-Math.PI/2;road.position.set(0,.01,0);scene.add(road);
function tree(x,z,s=1){const g=new THREE.Group();const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.12*s,.18*s,1.3*s,6),wood);trunk.position.y=.65*s;g.add(trunk);for(let i=0;i<3;i++){const cone=new THREE.Mesh(new THREE.ConeGeometry((1.15-i*.22)*s,(2.3-i*.35)*s,8),dark);cone.position.y=(1.5+i*.72)*s;g.add(cone)}g.position.set(x,0,z);scene.add(g)}
for(let i=0;i<45;i++){let x=(Math.random()-.5)*65; if(Math.abs(x)<7)x+=x<0?-9:9; let z=Math.random()*55-35;tree(x,z,.65+Math.random()*.8)}
// gate
function box(w,h,d,m,x,y,z){const q=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);q.position.set(x,y,z);q.castShadow=true;scene.add(q);return q}
box(1.4,8,1.4,wood,-6,4,-15);box(1.4,8,1.4,wood,6,4,-15);box(14,1.5,1.4,wood,0,8,-15);
const sign=box(7,.85,.18,gold,0,7.15,-15.75);sign.rotation.y=Math.PI;
// village silhouettes behind gate, deliberately indistinct
for(let i=0;i<7;i++){const x=-11+i*3.6;const h=2.5+Math.random()*2.5;box(2.5,h,2,wood,x,h/2,-25-Math.random()*3);const roof=box(3.1,.45,2.5,dark,x,h+.25,-25-Math.random()*3);roof.rotation.z=(Math.random()-.5)*.08}
// guard: puffy coat, hat, friendly face
const guard=new THREE.Group();guard.position.set(0,0,-11.5);scene.add(guard);
const legs=box(0.95,1.6,.65,dark,0,.8,0);legs.parent=guard;legs.position.set(0,.8,0);
const body=new THREE.Mesh(new THREE.SphereGeometry(.8,16,12),coat);body.scale.set(.95,1.25,.65);body.position.y=2.05;guard.add(body);
const head=new THREE.Mesh(new THREE.SphereGeometry(.43,16,12),skin);head.position.y=3.45;guard.add(head);
const hat=new THREE.Mesh(new THREE.CylinderGeometry(.5,.62,.38,12),dark);hat.position.y=3.9;guard.add(hat);const brim=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,.08,12),dark);brim.position.y=3.72;guard.add(brim);
const lantern=new THREE.PointLight(0xffc16b,1.5,7);lantern.position.set(.9,2.4,.5);guard.add(lantern);
// aurora ribbons
const auroraMat=new THREE.MeshBasicMaterial({color:0x79bba8,transparent:true,opacity:.16,side:THREE.DoubleSide});
for(let j=0;j<3;j++){const pts=[];for(let i=0;i<18;i++)pts.push(new THREE.Vector3(-45+i*5,18+j*2+Math.sin(i*.7+j)*2, -38+i*.8));const geo=new THREE.BufferGeometry().setFromPoints(pts);const line=new THREE.Line(geo,auroraMat);scene.add(line)}
// stars
const stars=new THREE.BufferGeometry(),pos=[];for(let i=0;i<350;i++){pos.push((Math.random()-.5)*130,18+Math.random()*38,(Math.random()-.5)*90-15)}stars.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0xd8e4e6,size:.08})));
// snow particles
const sp=new THREE.BufferGeometry(),spos=[];for(let i=0;i<700;i++)spos.push((Math.random()-.5)*80,Math.random()*30,Math.random()*80-40);sp.setAttribute('position',new THREE.Float32BufferAttribute(spos,3));const snow=new THREE.Points(sp,new THREE.PointsMaterial({color:0xf3f7f5,size:.075,transparent:true,opacity:.65}));scene.add(snow);
let elapsed=0,phase=0,done=false;const dialogue=document.getElementById('dialogue'),line=document.getElementById('line'),continueBtn=document.getElementById('continue');
const lines=["Evening. Welcome to David's Village.","Don't worry about the cold. The snow is warmer than it looks.","David built this place in 1989. You're safe here.","The village is just beyond these gates. Go explore when you're ready."];
function finish(){done=true;dialogue.classList.add('hidden');phase=4;camera.position.set(0,2.35,-7);}
continueBtn.onclick=()=>{if(phase<3){phase++;line.textContent=lines[phase]}else{finish()}};document.getElementById('skip').onclick=finish;
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)}addEventListener('resize',resize);
function animate(t){requestAnimationFrame(animate);const dt=.016;elapsed+=dt;snow.rotation.y+=dt*.01;snow.position.y-=dt*.45;if(snow.position.y<-1)snow.position.y=0;
if(!done){if(elapsed<8){camera.position.z=18-elapsed*2.4;camera.position.x=Math.sin(elapsed*.18)*.8;camera.lookAt(0,2,-15)}else{camera.position.z=-7;camera.lookAt(0,2,-15);if(phase===0){phase=0;dialogue.classList.remove('hidden');}}}
else{camera.position.x=Math.sin(elapsed*.08)*1.4;camera.lookAt(0,2,-15)}
renderer.render(scene,camera)}
animate();setTimeout(()=>document.getElementById('loading').classList.add('done'),700);
