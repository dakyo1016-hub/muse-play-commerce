import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

const isMale = process.argv.includes("--male");

// GLTFExporter uses FileReader in its browser implementation.
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((value) => {
      this.result = value;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((value) => {
      const base64 = Buffer.from(value).toString("base64");
      this.result = `data:${blob.type};base64,${base64}`;
      this.onloadend?.();
    });
  }
};

const scene = new THREE.Scene();
scene.name = isMale ? "MuseModeMaleCharacter" : "MuseModeFemaleCharacter";

const root = new THREE.Group();
root.name = isMale ? "Ren_RetroDS_Rig" : "Miyu_RetroDS_Rig";
scene.add(root);

const baseBody = new THREE.Group();
baseBody.name = "BASE_BODY_ALWAYS_VISIBLE";
root.add(baseBody);

const underwear = new THREE.Group();
underwear.name = "SLOT_UNDERWEAR_BASE";
root.add(underwear);

const starterTop = new THREE.Group();
starterTop.name = "SLOT_TOP_STARTER";
root.add(starterTop);

const starterBottom = new THREE.Group();
starterBottom.name = "SLOT_BOTTOM_STARTER";
root.add(starterBottom);

const skirtBottom = new THREE.Group();
skirtBottom.name = "SLOT_BOTTOM_SKIRT";
root.add(skirtBottom);

const starterShoes = new THREE.Group();
starterShoes.name = "SLOT_SHOES_STARTER";
root.add(starterShoes);

const hairStyle1 = new THREE.Group();
hairStyle1.name = "HAIR_STYLE_1";
root.add(hairStyle1);

const hairStyle2 = new THREE.Group();
hairStyle2.name = "HAIR_STYLE_2";
root.add(hairStyle2);

const hairStyle3 = new THREE.Group();
hairStyle3.name = "HAIR_STYLE_3";
root.add(hairStyle3);

const colors = {
  skin: 0xf0b485,
  skinShade: 0xd98b67,
  hair: 0x8a321f,
  hairLight: 0xb5522d,
  eye: 0x43251f,
  cardigan: 0xb29ac4,
  cardiganShade: 0x846b96,
  camisole: 0xeee9dc,
  denim: 0x26365f,
  denimShade: 0x15213f,
  skirt: 0x714a70,
  skirtShade: 0x33223f,
  belt: 0x145c87,
  shoe: 0x78a5a2,
  shoeShade: 0x426f70,
  buckle: 0xc8d3d5,
  lips: 0xc85d62,
  pin: 0x74aeca,
  underwear: 0xd9d1c7,
  underwearShade: 0xaaa19a,
};

const mat = (name, color, roughness = 1) => {
  const material = new THREE.MeshStandardMaterial({
    name,
    color,
    roughness,
    metalness: 0,
    flatShading: true,
  });
  return material;
};

const materials = {
  skin: mat("Skin_64px", colors.skin),
  skinShade: mat("SkinShadow", colors.skinShade),
  hair: mat("HairAuburn_64px", colors.hair),
  hairLight: mat("HairHighlight", colors.hairLight),
  eye: mat("EyesHazel", colors.eye),
  eyeWhite: mat("EyeWhite", 0xfff5e8),
  cardigan: mat("CardiganLilac", colors.cardigan),
  cardiganShade: mat("CardiganShadow", colors.cardiganShade),
  camisole: mat("CamisoleCream", colors.camisole),
  denim: mat("DenimIndigo", colors.denim),
  denimShade: mat("DenimShadow", colors.denimShade),
  skirt: mat("SkirtPlum", colors.skirt),
  skirtShade: mat("SkirtShadow", colors.skirtShade),
  belt: mat("BeltBlue", colors.belt),
  shoe: mat("PumpsMint", colors.shoe),
  shoeShade: mat("PumpsShadow", colors.shoeShade),
  buckle: mat("Buckle", colors.buckle, 0.6),
  lips: mat("LipsCoral", colors.lips),
  pin: mat("HairPinBlue", colors.pin),
  underwear: mat("SportsUnderwearSeamless", colors.underwear),
  underwearShade: mat("SportsUnderwearEdge", colors.underwearShade),
};

function addMesh(name, geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0], parent = root) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

const box = (w, h, d, sx = 1, sy = 1, sz = 1) => new THREE.BoxGeometry(w * sx, h * sy, d * sz, 1, 1, 1);
const lowSphere = (r, x = 10, y = 6) => new THREE.SphereGeometry(r, x, y);
const lowCylinder = (rt, rb, h, segments = 6) => new THREE.CylinderGeometry(rt, rb, h, segments, 1, false);

// Skin core remains under every swappable garment.
addMesh("Body_Hip_Core", lowCylinder(isMale ? 0.36 : 0.35, isMale ? 0.37 : 0.42, 0.55, 7), materials.skin, [0, 3.56, 0], [1, 1, 0.78], [0, 0, 0], baseBody);
addMesh("Body_Torso_Core", lowCylinder(isMale ? 0.5 : 0.31, isMale ? 0.38 : 0.43, 1.3, 7), materials.skin, [0, 4.35, 0], [1, 1, 0.76], [0, 0, 0], baseBody);

// Neutral sports-bra + seamless boyshort base layer. These meshes are never
// removed during dress-up; outer slots simply cover them.
if (!isMale) {
  addMesh("Underwear_SportsBra_Front", box(0.7, 0.52, 0.13), materials.underwear, [0, 4.55, -0.27], [1, 1, 1], [0, 0, 0], underwear);
  addMesh("Underwear_SportsBra_Back", box(0.67, 0.42, 0.09), materials.underwearShade, [0, 4.53, 0.255], [1, 1, 1], [0, 0, 0], underwear);
  addMesh("Underwear_Strap_L", box(0.12, 0.5, 0.1), materials.underwear, [-0.24, 4.93, -0.12], [1, 1, 1], [0.12, 0, -0.14], underwear);
  addMesh("Underwear_Strap_R", box(0.12, 0.5, 0.1), materials.underwear, [0.24, 4.93, -0.12], [1, 1, 1], [0.12, 0, 0.14], underwear);
}
addMesh("Underwear_Boyshort", lowCylinder(isMale ? 0.39 : 0.36, isMale ? 0.4 : 0.43, isMale ? 0.62 : 0.48, 7), materials.underwear, [0, isMale ? 3.42 : 3.49, 0], [1, 1, 0.82], [0, 0, 0], underwear);
addMesh("Underwear_Waistband", lowCylinder(isMale ? 0.4 : 0.37, isMale ? 0.4 : 0.39, 0.1, 7), materials.underwearShade, [0, 3.75, 0], [1, 1, 0.83], [0, 0, 0], underwear);

// Starter outerwear slot.
addMesh("Torso_Camisole", lowCylinder(isMale ? 0.51 : 0.34, isMale ? 0.4 : 0.46, 1.25, 6), materials.camisole, [0, 4.35, 0], [1, 1, 1], [0, 0, 0], starterTop);
addMesh("Cardigan_Back", box(isMale ? 1.02 : 0.8, 1.18, 0.16), materials.cardiganShade, [0, 4.36, 0.16], [1, 1, 1], [0, 0, 0], starterTop);
addMesh("Cardigan_Left", box(isMale ? 0.3 : 0.25, 1.12, 0.18), materials.cardigan, [isMale ? -0.39 : -0.31, 4.38, -0.16], [1, 1, 1], [0, 0, -0.03], starterTop);
addMesh("Cardigan_Right", box(isMale ? 0.3 : 0.25, 1.12, 0.18), materials.cardigan, [isMale ? 0.39 : 0.31, 4.38, -0.16], [1, 1, 1], [0, 0, 0.03], starterTop);

// Belt and buckle.
addMesh("Belt", box(0.78, 0.13, 0.47), materials.belt, [0, 3.74, -0.01], [1, 1, 1], [0, 0, 0], starterBottom);
addMesh("Belt_Buckle", box(0.16, 0.15, 0.06), materials.buckle, [0, 3.74, -0.265], [1, 1, 1], [0, 0, 0], starterBottom);

// Alternate bottom slot: a separate low-poly pleated skirt silhouette.
addMesh("Skirt_Waistband", lowCylinder(0.39, 0.42, 0.14, 8), materials.skirtShade, [0, 3.7, 0], [1, 1, 0.82], [0, 0, 0], skirtBottom);
addMesh("Skirt_PleatedBody", new THREE.CylinderGeometry(0.46, 0.82, 1.35, 8, 1, false), materials.skirt, [0, 3.02, 0], [1, 1, 0.76], [0, 0, 0], skirtBottom);
for (const x of [-0.48, -0.24, 0, 0.24, 0.48]) {
  addMesh(`Skirt_Pleat_${x}`, box(0.075, 1.16, 0.04), materials.skirtShade, [x, 2.97, -0.56 + Math.abs(x) * 0.36], [1, 1, 1], [0, 0, x * -0.1], skirtBottom);
}

// Long bootcut trouser legs. Front is negative Z.
for (const side of [-1, 1]) {
  const x = side * (isMale ? 0.225 : 0.23);
  addMesh(`Body_UpperLeg_${side < 0 ? "L" : "R"}`, lowCylinder(0.16, 0.2, 1.52, 6), materials.skin, [x, 2.65, 0], [1, 1, 0.82], [0, 0, 0], baseBody);
  addMesh(`Body_LowerLeg_${side < 0 ? "L" : "R"}`, lowCylinder(0.115, 0.16, 1.68, 6), materials.skin, [x, 1.08, 0], [1, 1, 0.82], [0, 0, 0], baseBody);
  addMesh(`Body_Foot_${side < 0 ? "L" : "R"}`, box(0.28, 0.17, 0.52), materials.skin, [x, 0.1, -0.13], [1, 1, 1], [0.04, 0, 0], baseBody);
  addMesh(`Denim_Thigh_${side < 0 ? "L" : "R"}`, lowCylinder(0.2, 0.25, 1.55, 5), materials.denim, [x, 2.62, 0], [1, 1, 1], [0, 0, 0], starterBottom);
  addMesh(`Denim_Calf_${side < 0 ? "L" : "R"}`, lowCylinder(0.34, 0.2, 1.75, 5), materials.denimShade, [x, 1.02, 0], [1, 1, 1], [0, 0, 0], starterBottom);
  addMesh(`Shoe_${side < 0 ? "L" : "R"}`, box(0.38, 0.22, 0.67), materials.shoe, [x, 0.11, -0.14], [1, 1, 1], [0.04, 0, 0], starterShoes);
  addMesh(`Heel_${side < 0 ? "L" : "R"}`, box(0.15, 0.27, 0.18), materials.shoeShade, [x, 0.14, 0.12], [1, 1, 1], [0, 0, 0], starterShoes);
}

// Arms and flared cardigan cuffs.
for (const side of [-1, 1]) {
  const prefix = side < 0 ? "L" : "R";
  const shoulderX = side * (isMale ? 0.61 : 0.54);
  addMesh(`Body_UpperArm_${prefix}`, lowCylinder(isMale ? 0.13 : 0.105, isMale ? 0.16 : 0.14, 1.1, 6), materials.skin, [shoulderX, 4.25, 0], [1, 1, 0.84], [0, 0, side * -0.12], baseBody);
  addMesh(`UpperArm_${prefix}`, lowCylinder(isMale ? 0.16 : 0.13, isMale ? 0.19 : 0.16, 1.1, 5), materials.cardigan, [shoulderX, 4.25, 0], [1, 1, 1], [0, 0, side * -0.12], starterTop);
  const lowerArmX = side * (isMale ? 0.72 : 0.66);
  addMesh(`Cardigan_Cuff_${prefix}`, lowCylinder(isMale ? 0.22 : 0.2, isMale ? 0.17 : 0.14, 0.56, 5), materials.cardiganShade, [side * (isMale ? 0.68 : 0.62), 3.51, 0], [1, 1, 1], [0, 0, side * -0.07], starterTop);
  addMesh(`Forearm_${prefix}`, lowCylinder(isMale ? 0.115 : 0.095, isMale ? 0.15 : 0.13, 0.76, 5), materials.skin, [lowerArmX, 3.0, 0], [1, 1, 1], [0, 0, side * -0.03], baseBody);
  addMesh(`Hand_${prefix}`, box(isMale ? 0.22 : 0.19, 0.37, 0.12), materials.skin, [side * (isMale ? 0.74 : 0.68), 2.46, -0.01], [1, 1, 1], [0, 0, 0], baseBody);
  for (let finger = 0; finger < 4; finger += 1) {
    addMesh(`Finger_${prefix}_${finger + 1}`, box(0.025, 0.22 - finger * 0.014, 0.025), materials.skinShade, [side * (0.615 + finger * 0.034), 2.23, -0.02], [1, 1, 1], [0, 0, side * -0.03], baseBody);
  }
}

// Neck, head, ears.
addMesh("Neck", lowCylinder(0.15, 0.17, 0.35, 7), materials.skin, [0, 5.09, 0]);
addMesh("Head", lowSphere(0.48, 8, 6), materials.skin, [0, 5.62, 0], [0.82, 1.07, 0.78]);
addMesh("Ear_L", lowSphere(0.1, 6, 4), materials.skinShade, [-0.42, 5.62, 0], [0.5, 1, 0.7]);
addMesh("Ear_R", lowSphere(0.1, 6, 4), materials.skinShade, [0.42, 5.62, 0], [0.5, 1, 0.7]);

// Face elements, slightly in front of the head (front = -Z).
for (const side of [-1, 1]) {
  addMesh(`EyeWhite_${side < 0 ? "L" : "R"}`, lowSphere(0.12, 8, 5), materials.eyeWhite, [side * 0.17, 5.7, -0.36], [1.1, 1.25, 0.22]);
  addMesh(`Iris_${side < 0 ? "L" : "R"}`, lowSphere(0.072, 8, 5), materials.eye, [side * 0.17, 5.69, -0.405], [1, 1.2, 0.2]);
  addMesh(`EyeSpark_${side < 0 ? "L" : "R"}`, lowSphere(0.018, 5, 3), materials.eyeWhite, [side * 0.19, 5.735, -0.425]);
}
addMesh("Nose", new THREE.ConeGeometry(0.035, 0.1, 4), materials.skinShade, [0, 5.56, -0.41], [1, 1, 1], [Math.PI / 2, 0, 0]);
addMesh("Mouth", box(0.14, 0.025, 0.025), materials.lips, [0, 5.43, -0.423]);

// Chunky asymmetrical bob made from visible polygon wedges.
addMesh("Hair_Cap", lowSphere(0.55, 7, 5), materials.hair, [0, 5.88, 0.03], [0.91, 0.84, 0.89], [0, 0, 0], hairStyle1);
const hairPieces = [
  [-0.38, 5.7, -0.17, 0.22, 0.76, 0.22, -0.16],
  [-0.2, 5.98, -0.28, 0.24, 0.7, 0.18, -0.45],
  [0.02, 6.03, -0.31, 0.26, 0.64, 0.17, -0.16],
  [0.25, 5.94, -0.28, 0.24, 0.66, 0.19, 0.18],
  [0.42, 5.72, -0.16, 0.2, 0.74, 0.22, 0.14],
  [-0.43, 5.51, 0.05, 0.2, 0.68, 0.25, -0.06],
  [0.42, 5.49, 0.06, 0.2, 0.64, 0.25, 0.04],
];
for (const [index, piece] of hairPieces.entries()) {
  const [x, y, z, w, h, d, rz] = piece;
  addMesh(`Hair_Chunk_${index + 1}`, box(w, h, d), index < 3 ? materials.hairLight : materials.hair, [x, y, z], [1, 1, 1], [0, 0, rz], hairStyle1);
}
addMesh("Blue_Barrette", box(0.18, 0.07, 0.04), materials.pin, [0.34, 5.95, -0.43], [1, 1, 1], [0, 0, -0.2], hairStyle1);

// Short layered cut.
addMesh("Hair2_Cap", lowSphere(0.53, 8, 5), materials.hair, [0, 5.94, 0.04], [0.9, 0.68, 0.88], [0, 0, 0], hairStyle2);
for (let index = 0; index < 9; index += 1) {
  const angle = (index / 9) * Math.PI * 2;
  addMesh(`Hair2_Layer_${index}`, new THREE.ConeGeometry(0.12, 0.48, 4), index % 3 === 0 ? materials.hairLight : materials.hair, [Math.sin(angle) * 0.37, 6.03 + (index % 2) * 0.08, Math.cos(angle) * 0.28], [1, 1, 1], [0.25, 0, -angle], hairStyle2);
}

// Long soft wave cut, kept intentionally chunky for the DS-era silhouette.
addMesh("Hair3_Cap", lowSphere(0.56, 8, 5), materials.hair, [0, 5.88, 0.04], [0.94, 0.82, 0.9], [0, 0, 0], hairStyle3);
for (const side of [-1, 1]) {
  addMesh(`Hair3_Long_${side}`, lowCylinder(0.19, 0.28, 1.7, 6), materials.hair, [side * 0.38, 5.05, 0.08], [1, 1, 0.8], [0, 0, side * -0.08], hairStyle3);
  addMesh(`Hair3_Wave_${side}`, lowSphere(0.3, 7, 5), materials.hairLight, [side * 0.39, 4.35, 0.06], [0.82, 1.25, 0.72], [0, 0, 0], hairStyle3);
}
addMesh("Hair3_Bang_L", box(0.23, 0.64, 0.18), materials.hairLight, [-0.2, 5.94, -0.3], [1, 1, 1], [0, 0, -0.32], hairStyle3);
addMesh("Hair3_Bang_R", box(0.23, 0.62, 0.18), materials.hair, [0.21, 5.93, -0.3], [1, 1, 1], [0, 0, 0.28], hairStyle3);

// Metadata nodes make the asset easier to replace with a rigged production model.
root.userData = {
  character: isMale ? "Ren" : "Miyu",
  style: "Retro DS low-poly fashion avatar",
  version: 2,
  forwardAxis: "-Z",
  garmentSlots: ["underwear_base", "top", "bottom", "shoes", "hair", "beauty"],
  baseUnderwear: isMale ? "seamless_boxer_briefs" : "sports_bra_and_seamless_boyshorts",
  hairStyles: ["bob", "short_layer", "long_wave"],
};

// Ground shadow catcher is excluded from the GLB; viewer owns lighting and floor.
root.rotation.y = 0;
root.position.y = 0;

const exporter = new GLTFExporter();
const binary = await new Promise((resolve, reject) => {
  exporter.parse(scene, resolve, reject, {
    binary: true,
    onlyVisible: true,
    trs: false,
    truncateDrawRange: true,
  });
});

const output = path.resolve("public", "models", isMale ? "ren-retro-ds.glb" : "miyu-retro-ds.glb");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, Buffer.from(binary));
console.log(`Wrote ${output} (${fs.statSync(output).size} bytes)`);
