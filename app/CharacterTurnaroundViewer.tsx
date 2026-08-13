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
  const rotate = (delta: number) => setFrameIndex((current) => (current + delta + frames.length) % frames.length);
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
  } as CSSProperties;
  const bodySource = `/characters/${character}-${outfitMode}/${frame.file}.png`;
  const headVariant = hairStyle === 1 ? "base" : hairStyle === 2 ? "hair-short" : "hair-wave";
  const headSource = `/characters/${character}-${headVariant}/${frame.file}.png`;
  const hairMaskSource = `/characters/${character}-${headVariant}/${frame.file}.hair.png`;

  return (
    <div className="character-viewer reference-character-viewer" style={customStyle}>
      <div className="reference-character" role="img" aria-label={`${name} 기본 캐릭터 ${frame.label} 모습`}>
        <div className="avatar-body-transform">
          <TintedAvatarImage
            src={bodySource}
            skinTone={skinTone}
            hairColor={hairColor}
            eyeColor={eyeColor}
            front={frame.file === "front"}
            bodyLayer
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
      <div className="rotation-controls" aria-label="캐릭터 방향 조작">
        <button onClick={() => rotate(-1)} aria-label="왼쪽 방향 보기">‹</button>
        <span><b>{frame.label}</b> TURNAROUND</span>
        <button onClick={() => rotate(1)} aria-label="오른쪽 방향 보기">›</button>
      </div>
    </div>
  );
}
