"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { OutfitLayerItem, OutfitSelection } from "./LayeredOutfit";

type CharacterViewerProps = {
  character: "miyu" | "ren";
  selection: OutfitSelection;
  height: number;
  weight: number;
  bodyShape: number;
  skinTone: string;
  hairStyle: 1 | 2 | 3;
  hairColor: string;
  eyeColor: string;
};

const material = (color: string, options: { roughness?: number; metalness?: number; transparent?: boolean; opacity?: number } = {}) => new THREE.MeshStandardMaterial({
  color,
  roughness: options.roughness ?? .7,
  metalness: options.metalness ?? .02,
  transparent: options.transparent,
  opacity: options.opacity,
});

const mesh = (geometry: THREE.BufferGeometry, mat: THREE.Material, position: [number, number, number], scale: [number, number, number] = [1, 1, 1], rotation: [number, number, number] = [0, 0, 0]) => {
  const result = new THREE.Mesh(geometry, mat);
  result.position.set(...position);
  result.scale.set(...scale);
  result.rotation.set(...rotation);
  result.castShadow = true;
  result.receiveShadow = true;
  return result;
};

const capsule = (radius: number, length: number, mat: THREE.Material, position: [number, number, number], scale: [number, number, number] = [1, 1, 1], rotation: [number, number, number] = [0, 0, 0]) => mesh(new THREE.CapsuleGeometry(radius, length, 8, 18), mat, position, scale, rotation);

const markRole = (object: THREE.Object3D, role: string) => {
  object.traverse((child) => { if (child instanceof THREE.Mesh) child.userData.role = role; });
  return object;
};

const addIdentityHead = (root: THREE.Group, character: "miyu" | "ren") => {
  const folder = character === "ren" ? "ren-starter-v2" : "miyu-starter";
  const loader = new THREE.TextureLoader();
  const materials = ["front", "right", "back", "left"].map((view) => {
    const texture = loader.load(`/characters/${folder}/heads/${view}.png`, (loaded) => {
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.needsUpdate = true;
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshBasicMaterial({ map:texture, transparent:true, alphaTest:.025, side:THREE.DoubleSide, toneMapped:false });
  });
  const size = character === "ren" ? 1.32 : 1.28;
  const head = mesh(new THREE.PlaneGeometry(size,size),materials[0],[0,5.67,0],[1,1,1],[0,Math.PI,0]);
  head.name = "IDENTITY_HEAD";
  head.castShadow = false;
  head.receiveShadow = false;
  root.userData.identityHead = { head, materials };
  root.add(head);
};

const syncIdentityHead = (root: THREE.Group, angle:number) => {
  const identity = root.userData.identityHead as { head:THREE.Mesh; materials:THREE.MeshBasicMaterial[] } | undefined;
  if (!identity) return;
  const normalized = ((angle % 360) + 360) % 360;
  identity.head.material = identity.materials[Math.round(normalized / 90) % 4];
  identity.head.rotation.y = Math.PI - root.rotation.y;
};

const buildAvatar = (character: "miyu" | "ren", skinTone: string, hairColor: string, eyeColor: string) => {
  const root = new THREE.Group();
  root.name = "PROCEDURAL_STYLE_MODEL";
  const skin = material(skinTone, { roughness:.66 });
  const underwear = material(character === "miyu" ? "#d7cfdc" : "#aeb8c3", { roughness:.8 });
  const isRen = character === "ren";

  const hip = capsule(isRen ? .43 : .48,.28,skin,[0,3.18,0],[1,isRen ? .92 : 1.02,.84]);
  const torso = capsule(isRen ? .5 : .46,.82,skin,[0,4.15,0],[isRen ? 1.06 : .98,1,.8]);
  markRole(hip,"skin"); markRole(torso,"skin"); root.add(hip,torso);
  [-1,1].forEach((side) => {
    const arm = capsule(isRen ? .17 : .155,1.58,skin,[side*(isRen?.69:.64),3.82,0],[1,1,1],[0,0,side*(isRen?-.07:-.045)]);
    const hand = mesh(new THREE.SphereGeometry(.19,18,14),skin,[side*(isRen?.79:.72),2.72,-.015],[.78,1.18,.72]);
    const leg = capsule(isRen ? .225 : .235,2.25,skin,[side*(isRen?.27:.29),1.73,0],[1,1,isRen?.92:.96]);
    const foot = mesh(new THREE.SphereGeometry(.25,18,12),skin,[side*(isRen?.27:.29),.19,-.18],[1,.68,1.45]);
    [arm,hand,leg,foot].forEach((part)=>markRole(part,"skin")); root.add(arm,hand,leg,foot);
  });
  const neck=capsule(.155,.18,skin,[0,5.02,0]); markRole(neck,"skin"); root.add(neck);
  addIdentityHead(root,character);

  const bra=capsule(isRen?.45:.4,.22,underwear,[0,4.36,-.035],[1,1,.86]);
  const shorts=capsule(isRen?.43:.47,.28,underwear,[0,3.2,-.01],[1,1,.88]);
  root.add(bra,shorts);
  const outfit=new THREE.Group(); outfit.name="DYNAMIC_3D_OUTFIT"; root.add(outfit);
  return root;
};

const torsoShell = (topRadius:number, waistRadius:number, length:number, mat:THREE.Material, y:number, depth=.94) => {
  const points = [
    new THREE.Vector2(waistRadius * .9,-length/2),
    new THREE.Vector2(waistRadius,-length/2 + .12),
    new THREE.Vector2(waistRadius * .98,0),
    new THREE.Vector2(topRadius * .94,length/2 - .22),
    new THREE.Vector2(topRadius,length/2 - .1),
    new THREE.Vector2(topRadius * .78,length/2),
  ];
  return mesh(new THREE.LatheGeometry(points,32),mat,[0,y,0],[1,1,depth]);
};

const addTop = (group: THREE.Group, item: OutfitLayerItem, outer=false) => {
  const color=material(item.color,{roughness:item.pattern==="nylon"?.42:.76,transparent:item.id==="mesh-top",opacity:item.id==="mesh-top"?.72:1});
  const fits:Record<string,{w:number;l:number;s:number;r:number;y:number}>={
    "top":{w:.86,l:1.12,s:0,r:.5,y:4.18},"henley-tee":{w:1.02,l:1.42,s:.5,r:.58,y:4.16},"rib-tank":{w:.78,l:1.12,s:0,r:.46,y:4.18},"graphic-tee":{w:1.08,l:1.3,s:.5,r:.59,y:4.16},
    "polo-knit":{w:1.02,l:.78,s:.48,r:.49,y:4.24},"shirt":{w:1.08,l:.98,s:1.2,r:.51,y:4.18},"oxford-shirt":{w:1.2,l:1.1,s:1.34,r:.55,y:4.12},
    "sweatshirt":{w:1.25,l:.96,s:1.2,r:.57,y:4.16},"mesh-top":{w:.96,l:.88,s:1.18,r:.47,y:4.18},
    "cardigan":{w:1.04,l:.82,s:1.2,r:.54,y:4.18},"jacket":{w:1.1,l:.72,s:1.14,r:.56,y:4.29},"leather-blouson":{w:1.27,l:.86,s:1.2,r:.62,y:4.2},
    "windbreaker":{w:1.3,l:1,s:1.32,r:.63,y:4.16},"hood-zipup":{w:1.25,l:1,s:1.3,r:.61,y:4.14},"tweed-jacket":{w:1.12,l:.72,s:1.12,r:.56,y:4.3},
    "trench":{w:1.15,l:2.2,s:1.36,r:.58,y:3.72},
  };
  const fit=fits[item.id]??fits.graphic-tee;
  const shoulder = fit.r * fit.w * (outer ? 1.12 : 1.08);
  const waist = fit.r * (outer ? .98 : .76);
  const shellDepth = outer ? Math.max(1.05,.52/waist) : Math.max(1.02,.46/waist);
  group.add(torsoShell(shoulder,waist,fit.l,color,fit.y,shellDepth));
  if(fit.s>0){
    [-1,1].forEach((side)=>{
      group.add(mesh(new THREE.SphereGeometry((outer?.255:.235)*fit.w,18,12),color,[side*(shoulder*.88),4.55,0],[1,.92,1]));
      group.add(capsule((outer?.215:.19)*(fit.w*.92),fit.s,color,[side*(shoulder*.98),4.3-(fit.s-.7)*.28,0],[1,1,1],[0,0,side*-.06]));
    });
  }
  if(item.id==="henley-tee"){
    group.add(mesh(new THREE.BoxGeometry(.1,.39,.035),material("#666a6c",{roughness:.82}),[0,4.65,-.43]));
    const buttonMat=material("#d8d5ce",{roughness:.4});
    [4.78,4.65,4.52].forEach((buttonY)=>group.add(mesh(new THREE.SphereGeometry(.025,10,8),buttonMat,[0,buttonY,-.462],[1,1,.35])));
    group.add(mesh(new THREE.TorusGeometry(.235,.025,8,26,Math.PI*1.55),material("#666a6c"),[0,4.85,-.24],[1,1,.72],[Math.PI/2,0,-Math.PI*.77]));
  }
  if(item.id==="hood-zipup"||item.id==="windbreaker") group.add(mesh(new THREE.TorusGeometry(.47,.11,10,24,Math.PI),color,[0,5.0,.1],[1,1,.8],[Math.PI/2,0,0]));
};

const addBottom = (group:THREE.Group,item:OutfitLayerItem) => {
  const mat=material(item.color,{roughness:item.pattern==="nylon"?.42:.78});
  if(item.id==="skirt"||item.id==="parachute-skirt"){
    const h=item.id==="parachute-skirt"?2.45:1.35;
    const bottom=item.id==="parachute-skirt"?.72:.68;
    group.add(mesh(new THREE.CylinderGeometry(.46,bottom,h,28,1,false),mat,[0,3.38-h/2,0],[1,1,.86]));return;
  }
  const shorts=item.id==="bermuda";
  const wide=item.id==="cargo-pants"?1.33:item.id==="curve-denim"?1.22:item.id==="track-pants"?1.14:item.id==="slacks"?1.09:1;
  if(item.id==="denim"){
    [-1,1].forEach((side)=>{
      group.add(mesh(new THREE.CylinderGeometry(.245,.27,1.13,22),mat,[side*.285,2.6,0],[1,1,.96]));
      group.add(mesh(new THREE.CylinderGeometry(.31,.235,1.45,22),mat,[side*.285,1.33,0],[1,1,.96]));
    });
  } else {
    const length=shorts?.9:2.38;
    const y=shorts?2.75:1.72;
    [-1,1].forEach((side)=>group.add(capsule(.255*wide,length,mat,[side*.285,y,0],[1,1,.96])));
  }
  group.add(capsule(.47*wide,.38,mat,[0,3.2,0],[1,1,.96]));
  group.add(mesh(new THREE.CylinderGeometry(.48*wide,.48*wide,.13,24),mat,[0,3.46,0],[1,1,.95]));
  if(item.id==="cargo-pants")[-1,1].forEach((side)=>group.add(mesh(new THREE.BoxGeometry(.28,.45,.12),mat,[side*.44,2.45,-.2],[1,1,1])));
};

const addDress=(group:THREE.Group,item:OutfitLayerItem)=>{
  const mat=material(item.color,{roughness:.72});
  const mini=item.id==="mini-dress"; const fitted=item.id==="knit-dress"; const cargo=item.id==="cargo-dress";
  group.add(capsule(fitted?.42:.47,.72,mat,[0,4.28,0],[fitted?.9:1,1,.85]));
  const h=mini?1.05:fitted?2.35:cargo?1.8:2.05;
  group.add(mesh(new THREE.CylinderGeometry(fitted?.42:.46,fitted?.53:cargo?.78:.7,h,28),mat,[0,3.62-h/2,0],[1,1,.86]));
  if(item.id==="shirt-dress")[-1,1].forEach((side)=>group.add(capsule(.18,1.15,mat,[side*.61,4.05,0],[1,1,.9],[0,0,side*-.04])));
};

const addShoes=(group:THREE.Group,item:OutfitLayerItem)=>{
  const mat=material(item.color,{roughness:item.id==="retro-runner"?.48:.72});
  const chunky=item.id==="sneakers"||item.id==="retro-runner"; const heel=item.id==="pumps";
  [-1,1].forEach((side)=>{
    group.add(mesh(new THREE.SphereGeometry(chunky?.3:.25,18,12),mat,[side*.29,chunky?.2:.16,-.2],[1,chunky?.75:.58,chunky?1.55:1.4]));
    if(heel)group.add(mesh(new THREE.CylinderGeometry(.045,.055,.24,10),mat,[side*.29,.12,.05]));
  });
};

const addAccessories=(group:THREE.Group,selection:OutfitSelection)=>{
  const acc=selection.accessories??[];
  const cap=acc.find(i=>i.id==="ball-cap");const bucket=acc.find(i=>i.id==="bucket-hat");
  if(cap){const m=material(cap.color);group.add(mesh(new THREE.SphereGeometry(.48,24,14,0,Math.PI*2,0,Math.PI*.52),m,[0,6.02,0],[1,.55,.9]));group.add(mesh(new THREE.BoxGeometry(.53,.055,.34),m,[0,5.87,-.38],[1,1,1],[.08,0,0]));}
  if(bucket){const m=material(bucket.color);group.add(mesh(new THREE.CylinderGeometry(.43,.5,.3,24,1,true),m,[0,6.03,0],[1,1,.88]));group.add(mesh(new THREE.CylinderGeometry(.68,.5,.08,28),m,[0,5.86,0],[1,1,.88]));}
  const necklace=acc.find(i=>i.id==="necklace");if(necklace)group.add(mesh(new THREE.TorusGeometry(.26,.025,8,24,Math.PI),material(necklace.color,{metalness:.68,roughness:.28}),[0,5.02,-.42],[1,1,1],[0,0,Math.PI]));
  const belt=acc.find(i=>i.id==="belt");if(belt)group.add(mesh(new THREE.CylinderGeometry(.49,.49,.11,24),material(belt.color),[0,3.38,0],[1,1,.9]));
  const scarf=acc.find(i=>i.id==="scarf");if(scarf)group.add(mesh(new THREE.TorusGeometry(.4,.12,10,28),material(scarf.color),[0,5.03,0],[1,1,.78],[Math.PI/2,0,0]));
  const earrings=acc.find(i=>i.id==="earrings");if(earrings){const m=material(earrings.color,{metalness:.7,roughness:.25});[-1,1].forEach(side=>group.add(mesh(new THREE.TorusGeometry(.085,.02,8,18),m,[side*.65,5.55,0])));}
  const bag=selection.bag;if(bag){const m=material(bag.color);const back=bag.id==="backpack";const tote=bag.id==="tote";const cross=bag.id==="crossbody";const p:[number,number,number]=back?[0,4.0,.55]:[1.0,tote?2.72:3.0,-.02];group.add(mesh(new THREE.BoxGeometry(back?1:.68,back?1.35:tote?.95:.62,.3),m,p));if(!back)group.add(mesh(new THREE.TorusGeometry(.28,.04,8,20,Math.PI),m,[p[0],p[1]+(tote?.52:.35),p[2]],[1,1,1],[0,0,Math.PI]));if(cross)group.add(mesh(new THREE.BoxGeometry(.05,2.9,.05),m,[.45,4.03,-.24],[1,1,1],[0,0,-.4]));}
};

const rebuildOutfit=(root:THREE.Object3D,selection:OutfitSelection)=>{
  const old=root.getObjectByName("DYNAMIC_3D_OUTFIT");if(old){old.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});old.removeFromParent();}
  const group=new THREE.Group();group.name="DYNAMIC_3D_OUTFIT";root.add(group);
  if(selection.dress)addDress(group,selection.dress);else{if(selection.bottom)addBottom(group,selection.bottom);if(selection.top)addTop(group,selection.top);}
  if(selection.outer)addTop(group,selection.outer,true);
  if(selection.shoes)addShoes(group,selection.shoes);
  addAccessories(group,selection);
};

export default function CharacterViewer({character,selection,height,weight,bodyShape,skinTone,hairStyle: _hairStyle,hairColor,eyeColor}:CharacterViewerProps){
  const hostRef=useRef<HTMLDivElement>(null);const rootRef=useRef<THREE.Group|null>(null);const cameraRef=useRef<THREE.OrthographicCamera|null>(null);const angleRef=useRef(0);const dragRef=useRef({active:false,x:0});
  const [angle,setAngle]=useState(0);const [zoom,setZoom]=useState(.9);
  useEffect(()=>{const root=rootRef.current;if(!root)return;root.traverse(o=>{if(!(o instanceof THREE.Mesh))return;const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{if(!(m instanceof THREE.MeshStandardMaterial))return;if(o.userData.role==="skin")m.color.set(skinTone);if(o.userData.role==="hair")m.color.set(hairColor);if(o.userData.role==="eye")m.color.set(eyeColor);});});rebuildOutfit(root,selection);const refH=character==="ren"?175:165,refW=character==="ren"?70:55;const width=THREE.MathUtils.clamp(1+(weight-refW)/190+(bodyShape-50)/280,.84,1.28);root.scale.set(width,THREE.MathUtils.clamp(height/refH,.88,1.14),THREE.MathUtils.lerp(.94,width,.55));},[character,selection,height,weight,bodyShape,skinTone,hairColor,eyeColor]);
  const rotate=(delta:number)=>{angleRef.current=(angleRef.current+delta+360)%360;if(rootRef.current){rootRef.current.rotation.y=THREE.MathUtils.degToRad(angleRef.current);syncIdentityHead(rootRef.current,angleRef.current);}setAngle(Math.round(angleRef.current));};
  const changeZoom=(delta:number)=>setZoom(v=>Math.max(.78,Math.min(1.48,+(v+delta).toFixed(2))));
  useEffect(()=>{if(cameraRef.current){cameraRef.current.zoom=zoom;cameraRef.current.updateProjectionMatrix();}},[zoom]);
  useEffect(()=>{const host=hostRef.current;if(!host)return;const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-1.5,1.5,3.45,-3.45,.1,100);camera.position.set(0,3.15,-10);camera.lookAt(0,3.15,0);cameraRef.current=camera;const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0,0);host.appendChild(renderer.domElement);scene.add(new THREE.HemisphereLight(0xfff7ef,0x71849a,2.4));const key=new THREE.DirectionalLight(0xffedda,3.2);key.position.set(-4,8,-6);key.castShadow=true;scene.add(key);const fill=new THREE.DirectionalLight(0xb8d5e5,1.45);fill.position.set(5,5,-3);scene.add(fill);const rim=new THREE.DirectionalLight(0xd9c2e4,1.15);rim.position.set(0,5,6);scene.add(rim);const floor=mesh(new THREE.CircleGeometry(1.4,40),new THREE.ShadowMaterial({color:0x46515a,opacity:.17}),[0,-.08,0],[1,1,1],[-Math.PI/2,0,0]);floor.receiveShadow=true;scene.add(floor);const root=buildAvatar(character,skinTone,hairColor,eyeColor);root.rotation.y=THREE.MathUtils.degToRad(angleRef.current);rootRef.current=root;scene.add(root);rebuildOutfit(root,selection);const resize=()=>{const w=Math.max(host.clientWidth,1),h=Math.max(host.clientHeight,1);renderer.setSize(w,h,false);const aspect=w/h,vh=6.9;camera.left=-vh*aspect/2;camera.right=vh*aspect/2;camera.top=vh/2;camera.bottom=-vh/2;camera.zoom=zoom;camera.updateProjectionMatrix();};resize();const observer=new ResizeObserver(resize);observer.observe(host);let frame=0;const animate=()=>{renderer.render(scene,camera);frame=requestAnimationFrame(animate);};animate();return()=>{rootRef.current=null;cameraRef.current=null;cancelAnimationFrame(frame);observer.disconnect();renderer.dispose();if(renderer.domElement.parentElement===host)host.removeChild(renderer.domElement);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});};},[character]);
  return <div className="character-viewer three-character-viewer"><div ref={hostRef} className="character-canvas" role="img" aria-label={`360도 회전 가능한 3D 스타일 모델 ${character==="ren"?"렌":"미유"}`} tabIndex={0} onPointerDown={e=>{dragRef.current={active:true,x:e.clientX};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(!dragRef.current.active)return;const d=e.clientX-dragRef.current.x;dragRef.current.x=e.clientX;rotate(d*.65);}} onPointerUp={()=>{dragRef.current.active=false;}} onPointerCancel={()=>{dragRef.current.active=false;}} onKeyDown={e=>{if(e.key==="ArrowLeft")rotate(-15);if(e.key==="ArrowRight")rotate(15);}}/><div className="zoom-controls" role="group" aria-label="3D 모델 확대 축소"><button onClick={()=>changeZoom(-.1)} aria-label="축소">−</button><button className="zoom-fit" onClick={()=>setZoom(1)} aria-label="전신 맞춤">전신</button><button onClick={()=>changeZoom(.1)} aria-label="확대">＋</button><output>{Math.round(zoom*100)}%</output></div><div className="rotation-controls" aria-label="3D 모델 회전 조작"><button onClick={()=>rotate(-45)} aria-label="왼쪽으로 회전">‹</button><span><b>{angle}°</b> DRAG TO ROTATE</span><button onClick={()=>rotate(45)} aria-label="오른쪽으로 회전">›</button></div></div>;
}
