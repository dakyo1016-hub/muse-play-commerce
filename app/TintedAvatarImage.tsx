"use client";

import { useEffect, useRef } from "react";

type TintedAvatarImageProps = {
  src: string;
  skinTone: string;
  hairColor: string;
  eyeColor: string;
  front: boolean;
  headLayer?: boolean;
  bodyLayer?: boolean;
  character?: "miyu" | "ren";
  baseOutfit?: boolean;
  hairMaskSrc?: string;
  underwearMaskSrc?: string;
  clothingMaskSrc?: string;
  outfitColors?: {
    outer?: string;
    top?: string;
    bottom?: string;
    dress?: string;
    shoes?: string;
  };
  className?: string;
};

const rgb = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

export default function TintedAvatarImage({ src, skinTone, hairColor, eyeColor, front, headLayer = false, bodyLayer = false, character = "miyu", baseOutfit = false, hairMaskSrc, underwearMaskSrc, clothingMaskSrc, outfitColors, className = "" }: TintedAvatarImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = new Image();
    image.src = src;
    image.onload = async () => {
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      const opaqueRows = Array.from({ length: canvas.height }, () => 0);
      const alphaSource = context.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let offset = 3; offset < alphaSource.length; offset += 4) {
        if (alphaSource[offset] > 20) opaqueRows[Math.floor((offset / 4) / canvas.width)] += 1;
      }
      const firstOpaqueRow = opaqueRows.findIndex((count) => count > 2);
      const lastOpaqueRow = opaqueRows.length - 1 - [...opaqueRows].reverse().findIndex((count) => count > 2);
      const contentHeight = Math.max(1, lastOpaqueRow - firstOpaqueRow + 1);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const skin = rgb(skinTone);
      const hair = rgb(hairColor);
      const eye = rgb(eyeColor);
      const garment = {
        outer: outfitColors?.outer ? rgb(outfitColors.outer) : null,
        top: outfitColors?.top ? rgb(outfitColors.top) : null,
        bottom: outfitColors?.bottom ? rgb(outfitColors.bottom) : null,
        dress: outfitColors?.dress ? rgb(outfitColors.dress) : null,
        shoes: outfitColors?.shoes ? rgb(outfitColors.shoes) : null,
      };
      let hairMaskData: Uint8ClampedArray | null = null;
      let underwearMaskData: Uint8ClampedArray | null = null;
      let clothingMaskData: Uint8ClampedArray | null = null;

      const loadMask = async (maskSrc?: string) => {
        if (!maskSrc) return null;
        const mask = new Image();
        mask.src = maskSrc;
        try {
          await mask.decode();
          const maskCanvas = document.createElement("canvas");
          maskCanvas.width = canvas.width;
          maskCanvas.height = canvas.height;
          const maskContext = maskCanvas.getContext("2d", { willReadFrequently: true });
          if (!maskContext) return null;
          maskContext.drawImage(mask, 0, 0, canvas.width, canvas.height);
          return maskContext.getImageData(0, 0, canvas.width, canvas.height).data;
        } catch {
          return null;
        }
      };

      [hairMaskData, underwearMaskData, clothingMaskData] = await Promise.all([
        loadMask(hairMaskSrc),
        loadMask(underwearMaskSrc),
        loadMask(clothingMaskSrc),
      ]);

      for (let offset = 0; offset < pixels.data.length; offset += 4) {
        if (pixels.data[offset + 3] < 12) continue;
        const pixel = offset / 4;
        const x = pixel % canvas.width;
        const y = Math.floor(pixel / canvas.width);
        const nx = x / canvas.width;
        const ny = (y - firstOpaqueRow) / contentHeight;
        const r = pixels.data[offset];
        const g = pixels.data[offset + 1];
        const b = pixels.data[offset + 2];
        const light = (r * .3 + g * .59 + b * .11) / 255;
        const isEyeZone = front && ny > .072 && ny < .132
          && ((nx > .30 && nx < .48) || (nx > .52 && nx < .70));
        const isHairMaskPixel = !!hairMaskData && hairMaskData[offset + 3] > 18;
        const isEye = isEyeZone && !isHairMaskPixel && r < 170 && g < 145 && b < 135;
        const looksLikeSkin = light < .91 && r > 145 && g > 78 && b > 42
          && r - g > 8 && g - b > 5
          && r > g * 1.03 && g > b * 1.05
          && r - g < 118 && g - b < 105;
        const auburnHair = r > g * 1.28 && g > b * 1.02 && r < 248;
        const darkHair = r < 158 && g < 140 && b < 140;
        const isProtectedClothing = bodyLayer && !!clothingMaskData && clothingMaskData[offset + 3] > 22;
        const isHair = !isProtectedClothing && (hairMaskData
          ? isHairMaskPixel
          : ny < .26 && !isEye && !looksLikeSkin && (auburnHair || darkHair));
        const isSkin = looksLikeSkin && !isHair && !isProtectedClothing;

        // 몸은 하나의 연속 레이어로 변형하고, 헤드는 별도 레이어가 담당한다.
        // 상·하체를 잘라 확대할 때 생기던 손/골반 이음새를 없앤다.
        if (bodyLayer && ny < .15) {
          pixels.data[offset + 3] = 0;
          continue;
        }

        // 헤드 교체 레이어에서는 어깨 아래의 의상/몸을 비워 둔다.
        // 긴 머리 픽셀만 남겨 스타터 의상 위에도 자연스럽게 합성한다.
        if (headLayer && ny > .15 && !isHair) {
          pixels.data[offset + 3] = 0;
          continue;
        }

        const isBaseUnderwear = baseOutfit && bodyLayer && !!underwearMaskData
          && underwearMaskData[offset + 3] > 22;

        if (isBaseUnderwear) {
          const fabric = character === "miyu" ? [164, 149, 181] : [117, 130, 151];
          const fabricShade = .68 + light * .34;
          pixels.data[offset] = Math.min(255, fabric[0] * fabricShade);
          pixels.data[offset + 1] = Math.min(255, fabric[1] * fabricShade);
          pixels.data[offset + 2] = Math.min(255, fabric[2] * fabricShade);
          continue;
        }

        // Selected commerce items recolor only their garment zone. Skin-like
        // pixels are excluded first so hands, waist and face never inherit the
        // product color. The source luminance keeps the illustrated folds intact.
        let garmentTarget: number[] | null = null;
        const forcedRenTop = character === "ren" && !!garment.top
          && ny > .18 && ny < .51 && nx > .35 && nx < .65;
        if (bodyLayer && !baseOutfit && (!isSkin || forcedRenTop)) {
          if (garment.dress && ny > .16 && ny < .91) {
            garmentTarget = garment.dress;
          } else if (garment.shoes && ny >= .87) {
            garmentTarget = garment.shoes;
          } else if (garment.bottom && ny >= .47 && ny < .9) {
            garmentTarget = garment.bottom;
          } else if (ny > .16 && ny < .51) {
            const centralTop = nx > .36 && nx < .64;
            if (garment.top && centralTop) garmentTarget = garment.top;
            else if (garment.outer) garmentTarget = garment.outer;
          }
        }

        if (garmentTarget) {
          const garmentLight = (garmentTarget[0] * .3 + garmentTarget[1] * .59 + garmentTarget[2] * .11) / 255;
          const isLightFabric = garmentLight > .78;
          const shade = isLightFabric ? .86 + light * .18 : .38 + light * .76;
          const mix = isLightFabric ? .97 : .82;
          pixels.data[offset] = Math.min(255, r * (1 - mix) + garmentTarget[0] * shade * mix);
          pixels.data[offset + 1] = Math.min(255, g * (1 - mix) + garmentTarget[1] * shade * mix);
          pixels.data[offset + 2] = Math.min(255, b * (1 - mix) + garmentTarget[2] * shade * mix);
          continue;
        }

        // Starter outfit pixels are authoritative garment colors. They must never
        // be reclassified as dark hair, skin, or eyes when a user changes color.
        const target = isProtectedClothing ? null : isEye ? eye : isHair ? hair : isSkin ? skin : null;
        if (!target) continue;
        const shade = isEye ? .94 + light * .28 : isHair ? .32 + light * .8 : .48 + light * .62;
        const mix = isSkin ? .38 : isHair ? .78 : .86;
        pixels.data[offset] = Math.min(255, r * (1 - mix) + target[0] * shade * mix);
        pixels.data[offset + 1] = Math.min(255, g * (1 - mix) + target[1] * shade * mix);
        pixels.data[offset + 2] = Math.min(255, b * (1 - mix) + target[2] * shade * mix);
      }
      context.putImageData(pixels, 0, 0);
    };
  }, [src, skinTone, hairColor, eyeColor, front, headLayer, bodyLayer, character, baseOutfit, hairMaskSrc, underwearMaskSrc, clothingMaskSrc, outfitColors]);

  return <canvas ref={canvasRef} className={`avatar-base-image ${className}`} aria-hidden="true" />;
}
