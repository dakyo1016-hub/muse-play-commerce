import type {Metadata} from "next";
import CommercePage from "../commerce-pages";

export const metadata:Metadata={title:"BAG — MUSE",description:"PLAY에서 선택한 코디와 상품을 확인하는 MUSE 장바구니.",openGraph:{title:"BAG — MUSE",description:"PLAY에서 선택한 코디와 상품을 확인하는 MUSE 장바구니.",images:[]},twitter:{card:"summary",title:"BAG — MUSE",description:"PLAY에서 선택한 코디와 상품을 확인하는 MUSE 장바구니.",images:[]}};
export default function Bag(){return <CommercePage kind="bag"/>}
