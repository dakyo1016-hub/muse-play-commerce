import type {Metadata} from "next";
import CommercePage from "../commerce-pages";

export const metadata:Metadata={title:"ITEMS — MUSE",description:"스타일 태그로 탐색하는 MUSE 상품 아카이브.",openGraph:{title:"ITEMS — MUSE",description:"스타일 태그로 탐색하는 MUSE 상품 아카이브.",images:[]},twitter:{card:"summary",title:"ITEMS — MUSE",description:"스타일 태그로 탐색하는 MUSE 상품 아카이브.",images:[]}};
export default function Items(){return <CommercePage kind="items"/>}
