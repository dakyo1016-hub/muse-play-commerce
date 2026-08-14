"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import TintedAvatarImage from "./TintedAvatarImage";

type CharacterTurnaroundViewerProps = {
  character: "miyu" | "ren";
  outfitMode: "base" | "starter";
  height: number;
  weight: number;
  bodyShape: "slender" | "average" | "athletic";
  skinTone: string;
  hairStyle: 1 | 2 | 3;
  hairColor: string;
  eyeColor: string;
};

const frames = [
  { file: "front", label: "정면" },
  { file: "left", label: "왼쪽" },
  { file: "back", label: "후면" },
  { file: "right", label: "오른쪽" },
] as const;

export default function CharacterTurnaroundViewer({
  character,
  outfitMode,
  height,
  weight,
  bodyShape,
  skinTone,
  hairStyle,
  hairColor,
  eyeColor,
}: CharacterTurnaroundViewerProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [zoom, setZoom] = useState(.9);
  const rotate = (delta: number) => setFrameIndex((current) => (current + delta + frames.length) % frames.length);
  const changeZoom = (delta: number) => setZoom((current) => Math.max(.72, Math.min(1.38, +(current + delta).toFixed(2))));
  const frame = frames[frameIndex];
  const name = character === "miyu" ? "미유" : "렌";
  const referenceHeight = character === "miyu" ? 165 : 175;
  const referenceWeight = character === "miyu" ? 55 : 70;
  const heightDelta = Math.max(-1, Math.min(1, (height - referenceHeight) / 30));
  const bodyHeightScale = 1 + heightDelta * .085;
  const weightScale = Math.max(.88, Math.min(1.18, 1 + (weight - referenceWeight) / 220));
  const shape = {
    slender: character === "miyu" ? .91 : .9,
    average: 1,
    athletic: character === "miyu" ? 1.08 : 1.11,
  }[bodyShape];
  const customStyle = {
    "--body-height": bodyHeightScale,
    "--body-width": weightScale * shape,
    "--viewer-zoom": zoom,
  } as CSSProperties;
  const outfitVariant = character === "ren" && outfitMode === "starter" ? "starter-v2" : outfitMode;
  const bodySource = `/characters/${character}-${outfitVariant}/${frame.file}.png`;
  const headVariant = hairStyle === 1 ? "base" : hairStyle === 2 ? "hair-short" : "hair-wave";
  const headSource = `/characters/${character}-${headVariant}/${frame.file}.png`;
  const hairMaskSource = `/characters/${character}-${headVariant}/${frame.file}.hair.png`;
  const underwearMaskSource = `/characters/${character}-base/${frame.file}.underwear.png`;
  const clothingMaskSource = character === "miyu" && outfitMode === "starter"
    ? `/characters/miyu-starter/${frame.file}.clothing.png`
    : undefined;

  return (
    <div className="character-viewer reference-character-viewer" style={customStyle}>
      <div className="reference-character" role="img" aria-label={`${name} 캐릭터 ${frame.label} 모습`}>
        <div className="avatar-body-transform">
          <TintedAvatarImage
            src={bodySource}
            skinTone={skinTone}
            hairColor={hairColor}
            eyeColor={eyeColor}
            front={frame.file === "front"}
            bodyLayer
            character={character}
            baseOutfit={outfitMode === "base"}
            underwearMaskSrc={outfitMode === "base" ? underwearMaskSource : undefined}
            clothingMaskSrc={clothingMaskSource}
            className="avatar-body-layer"
          />
          <TintedAvatarImage
            key={`${headVariant}-${frame.file}`}
            src={headSource}
            skinTone={skinTone}
            hairColor={hairColor}
            eyeColor={eyeColor}
            front={frame.file === "front"}
            headLayer
            hairMaskSrc={hairMaskSource}
            className="avatar-head-layer"
          />
        </div>
      </div>
      <div className="zoom-controls" role="group" aria-label="캐릭터 확대 축소">
        <button onClick={() => changeZoom(-.1)} aria-label="축소">−</button>
        <button className="zoom-fit" onClick={() => setZoom(.9)} aria-label="전신 맞춤">전신</button>
        <button onClick={() => changeZoom(.1)} aria-label="확대">＋</button>
        <output aria-live="polite">{Math.round(zoom * 100)}%</output>
      </div>
      <div className="rotation-controls" aria-label="캐릭터 방향 조작">
        <button onClick={() => rotate(-1)} aria-label="이전 방향 보기">‹</button>
        <span><b>{frame.label}</b> TURNAROUND</span>
        <button onClick={() => rotate(1)} aria-label="다음 방향 보기">›</button>
      </div>
    </div>
  );
}
