"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type CharacterViewerProps = {
  gender: "female" | "male";
  outfitMode: "base" | "starter";
  topVisible: boolean;
  bottomVariant: "denim" | "skirt" | null;
  shoesVisible: boolean;
  topColor?: string;
  bottomColor?: string;
  height: number;
  weight: number;
  bodyShape: number;
  skinTone: string;
  hairStyle: 1 | 2 | 3;
  hairColor: string;
  eyeColor: string;
};

export default function CharacterViewer({
  gender,
  outfitMode,
  topVisible,
  bottomVariant,
  shoesVisible,
  topColor,
  bottomColor,
  height,
  weight,
  bodyShape,
  skinTone,
  hairStyle,
  hairColor,
  eyeColor,
}: CharacterViewerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<THREE.Object3D | null>(null);
  const angleRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });
  const [loading, setLoading] = useState(true);
  const [angle, setAngle] = useState(0);
  const [modelRevision, setModelRevision] = useState(0);

  useEffect(() => {
    const character = characterRef.current;
    if (!character) return;
    const top = character.getObjectByName("SLOT_TOP_STARTER");
    const bottom = character.getObjectByName("SLOT_BOTTOM_STARTER");
    const skirt = character.getObjectByName("SLOT_BOTTOM_SKIRT");
    const shoes = character.getObjectByName("SLOT_SHOES_STARTER");
    const hair1 = character.getObjectByName("HAIR_STYLE_1");
    const hair2 = character.getObjectByName("HAIR_STYLE_2");
    const hair3 = character.getObjectByName("HAIR_STYLE_3");
    const showOuterwear = outfitMode === "starter";
    if (top) top.visible = showOuterwear && topVisible;
    if (bottom) bottom.visible = showOuterwear && bottomVariant === "denim";
    if (skirt) skirt.visible = showOuterwear && bottomVariant === "skirt";
    if (shoes) shoes.visible = showOuterwear && shoesVisible;
    if (hair1) hair1.visible = hairStyle === 1;
    if (hair2) hair2.visible = hairStyle === 2;
    if (hair3) hair3.visible = hairStyle === 3;

    const referenceHeight = gender === "male" ? 175 : 165;
    const referenceWeight = gender === "male" ? 70 : 55;
    character.scale.set(1, THREE.MathUtils.clamp(height / referenceHeight, 0.84, 1.18), 1);
    const weightFactor = THREE.MathUtils.clamp(1 + (weight - referenceWeight) / 145, 0.78, 1.48);
    const shapeFactor = THREE.MathUtils.lerp(0.88, 1.18, bodyShape / 100);
    const widthScale = weightFactor * shapeFactor;
    ["BASE_BODY_ALWAYS_VISIBLE", "SLOT_UNDERWEAR_BASE", "SLOT_TOP_STARTER", "SLOT_BOTTOM_STARTER", "SLOT_BOTTOM_SKIRT", "SLOT_SHOES_STARTER"].forEach((name) => {
      const group = character.getObjectByName(name);
      if (group) group.scale.set(widthScale, 1, THREE.MathUtils.lerp(0.9, widthScale, 0.72));
    });

    character.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const materialName = object.material.name;
      if (["Skin_64px", "SkinShadow"].includes(materialName)) {
        const color = new THREE.Color(skinTone);
        if (materialName === "SkinShadow") color.multiplyScalar(0.78);
        object.material.color.copy(color);
      }
      if (["HairAuburn_64px", "HairHighlight"].includes(materialName)) {
        const color = new THREE.Color(hairColor);
        if (materialName === "HairHighlight") color.offsetHSL(0, 0, 0.12);
        object.material.color.copy(color);
      }
      if (materialName === "EyesHazel") object.material.color.set(eyeColor);
      if (topColor && ["CardiganLilac", "CardiganShadow", "CamisoleCream"].includes(object.material.name)) {
        object.material.color.set(topColor);
      }
      if (bottomColor && ["DenimIndigo", "DenimShadow", "BeltBlue", "SkirtPlum"].includes(object.material.name)) {
        object.material.color.set(bottomColor);
      }
    });
  }, [gender, outfitMode, topVisible, bottomVariant, shoesVisible, topColor, bottomColor, height, weight, bodyShape, skinTone, hairStyle, hairColor, eyeColor, modelRevision]);

  const rotate = (delta: number) => {
    angleRef.current = (angleRef.current + delta + 360) % 360;
    if (characterRef.current) characterRef.current.rotation.y = THREE.MathUtils.degToRad(angleRef.current);
    setAngle(Math.round(angleRef.current));
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setLoading(true);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.45, 1.45, 3.45, -3.45, 0.1, 100);
    // The GLBs use -Z as their front, so the camera must also sit on -Z.
    // Keeping the projection centered around the character prevents the old
    // upper-body crop that made the head appear detached from the body.
    camera.position.set(0, 3.1, -9);
    camera.lookAt(0, 3.1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xfff2dc, 0x473947, 2.1));
    const key = new THREE.DirectionalLight(0xffe5c8, 2.7);
    key.position.set(-4, 8, -6);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xabc8e0, 1.1);
    fill.position.set(5, 5, 3);
    scene.add(fill);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(1.15, 24),
      new THREE.ShadowMaterial({ color: 0x20171c, opacity: 0.34 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    const loader = new GLTFLoader();
    let cancelled = false;
    loader.load(
      gender === "male" ? "/models/ren-retro-ds.glb" : "/models/miyu-retro-ds.glb",
      (gltf) => {
        if (cancelled) return;
        characterRef.current = gltf.scene;
        gltf.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            object.material.flatShading = true;
            object.material.needsUpdate = true;
          }
        });
        const top = gltf.scene.getObjectByName("SLOT_TOP_STARTER");
        const bottom = gltf.scene.getObjectByName("SLOT_BOTTOM_STARTER");
        const skirt = gltf.scene.getObjectByName("SLOT_BOTTOM_SKIRT");
        const shoes = gltf.scene.getObjectByName("SLOT_SHOES_STARTER");
        const showOuterwear = outfitMode === "starter";
        if (top) top.visible = showOuterwear && topVisible;
        if (bottom) bottom.visible = showOuterwear && bottomVariant === "denim";
        if (skirt) skirt.visible = showOuterwear && bottomVariant === "skirt";
        if (shoes) shoes.visible = showOuterwear && shoesVisible;
        scene.add(gltf.scene);
        setLoading(false);
        setModelRevision((current) => current + 1);
      },
      undefined,
      () => setLoading(false),
    );

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      const aspect = width / height;
      const viewHeight = 6.9;
      camera.left = -viewHeight * aspect / 2;
      camera.right = viewHeight * aspect / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let animationFrame = 0;
    const animate = () => {
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelled = true;
      characterRef.current = null;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      renderer.dispose();
      host.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mats = Array.isArray(object.material) ? object.material : [object.material];
          mats.forEach((material) => material.dispose());
        }
      });
    };
  }, [gender]); // Gender swaps the GLB; the lightweight effect mutates its slots.

  return (
    <div className="character-viewer">
      <div
        ref={hostRef}
        className="character-canvas"
        role="img"
        aria-label={`360도 회전 가능한 ${gender === "male" ? "렌" : "미유"} 캐릭터, 현재 ${angle}도`}
        tabIndex={0}
        onPointerDown={(event) => {
          dragRef.current = { active: true, x: event.clientX };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragRef.current.active) return;
          const delta = event.clientX - dragRef.current.x;
          dragRef.current.x = event.clientX;
          rotate(delta * 0.65);
        }}
        onPointerUp={() => { dragRef.current.active = false; }}
        onPointerCancel={() => { dragRef.current.active = false; }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") rotate(-15);
          if (event.key === "ArrowRight") rotate(15);
        }}
      />
      {loading && <div className="model-loading">GLB MODEL LOADING…</div>}
      <div className="rotation-controls" aria-label="캐릭터 회전 조작">
        <button onClick={() => rotate(-45)} aria-label="왼쪽으로 45도 회전">‹</button>
        <span><b>{angle}°</b> DRAG TO ROTATE</span>
        <button onClick={() => rotate(45)} aria-label="오른쪽으로 45도 회전">›</button>
      </div>
    </div>
  );
}
