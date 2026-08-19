import type {Metadata} from "next";
import CommercePage from "../commerce-pages";

export const metadata:Metadata={title:"QUEST — MUSE",description:"상황과 예산을 선택해 시작하는 MUSE 데일리 스타일 미션.",openGraph:{title:"QUEST — MUSE",description:"상황과 예산을 선택해 시작하는 MUSE 데일리 스타일 미션.",images:[]},twitter:{card:"summary",title:"QUEST — MUSE",description:"상황과 예산을 선택해 시작하는 MUSE 데일리 스타일 미션.",images:[]}};
export default function Quest(){return <CommercePage kind="quest"/>}
