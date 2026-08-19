import type {Metadata} from "next";
import CommercePage from "../commerce-pages";

export const metadata:Metadata={title:"MY MUSE",description:"나의 플레이 기록과 스타일 DNA를 확인하는 MUSE 마이 페이지.",openGraph:{title:"MY MUSE",description:"나의 플레이 기록과 스타일 DNA를 확인하는 MUSE 마이 페이지.",images:[]},twitter:{card:"summary",title:"MY MUSE",description:"나의 플레이 기록과 스타일 DNA를 확인하는 MUSE 마이 페이지.",images:[]}};
export default function My(){return <CommercePage kind="my"/>}
