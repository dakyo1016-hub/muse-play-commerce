import type {Metadata} from "next";
import CommercePage from "../commerce-pages";

export const metadata:Metadata={title:"RANKING — MUSE",description:"지금 가장 많이 선택된 MUSE 스타일 LOOK.",openGraph:{title:"RANKING — MUSE",description:"지금 가장 많이 선택된 MUSE 스타일 LOOK.",images:[]},twitter:{card:"summary",title:"RANKING — MUSE",description:"지금 가장 많이 선택된 MUSE 스타일 LOOK.",images:[]}};
export default function Ranking(){return <CommercePage kind="ranking"/>}
