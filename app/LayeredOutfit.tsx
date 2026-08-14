"use client";

export type OutfitLayerItem = {
  id: string;
  color: string;
  pattern?: "solid" | "stripe" | "check" | "washed" | "nylon";
};

export type OutfitSelection = {
  outer?: OutfitLayerItem;
  top?: OutfitLayerItem;
  bottom?: OutfitLayerItem;
  dress?: OutfitLayerItem;
  shoes?: OutfitLayerItem;
  bag?: OutfitLayerItem;
  accessories?: OutfitLayerItem[];
};

type LayeredOutfitProps = {
  character: "miyu" | "ren";
  frame: "front" | "left" | "back" | "right";
  selection: OutfitSelection;
};

const classFor = (type: string, item?: OutfitLayerItem) => item
  ? `layered-garment garment-${type} item-${item.id} pattern-${item.pattern ?? "solid"}`
  : "";

const styleFor = (item?: OutfitLayerItem) => item
  ? ({ "--garment-color": item.color } as React.CSSProperties)
  : undefined;

export default function LayeredOutfit({ character, frame, selection }: LayeredOutfitProps) {
  const hats = selection.accessories?.filter((item) => item.id === "ball-cap" || item.id === "bucket-hat") ?? [];
  const details = selection.accessories?.filter((item) => item.id !== "ball-cap" && item.id !== "bucket-hat") ?? [];

  const contextClass = `character-${character} frame-${frame}`;

  return (
    <>
      <div className={`layered-outfit ${contextClass}`} aria-hidden="true">
        <div className="layered-clothes">
          {selection.bag && <i className={classFor("bag", selection.bag)} style={styleFor(selection.bag)} />}
          {selection.dress ? (
            <i className={classFor("dress", selection.dress)} style={styleFor(selection.dress)} />
          ) : (
            <>
              {selection.bottom && <i className={classFor("bottom", selection.bottom)} style={styleFor(selection.bottom)} />}
              {selection.top && <i className={classFor("top", selection.top)} style={styleFor(selection.top)} />}
            </>
          )}
          {selection.outer && <i className={classFor("outer", selection.outer)} style={styleFor(selection.outer)} />}
          {selection.shoes && <i className={classFor("shoes", selection.shoes)} style={styleFor(selection.shoes)} />}
          {details.map((item) => <i key={item.id} className={classFor("accessory", item)} style={styleFor(item)} />)}
        </div>
      </div>
      <div className={`layered-head-accessories ${contextClass}`} aria-hidden="true">
        <div className="layered-clothes">
          {hats.map((item) => <i key={item.id} className={classFor("hat", item)} style={styleFor(item)} />)}
        </div>
      </div>
    </>
  );
}
