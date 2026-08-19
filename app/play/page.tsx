import type {Metadata} from "next";
import Muse from "../page";

export const metadata:Metadata={
 title:"PLAY — MUSE Shopping as a Game",
 description:"BUILD · BATTLE · REVEAL · SHOP. 아이템을 조합하고 취향을 발견하는 MUSE 패션 게임.",
 openGraph:{title:"PLAY — MUSE Shopping as a Game",description:"네 개의 아이템 슬롯을 채우고 스타일 배틀을 시작하세요.",images:[]},
 twitter:{card:"summary",title:"PLAY — MUSE Shopping as a Game",description:"네 개의 아이템 슬롯을 채우고 스타일 배틀을 시작하세요.",images:[]},
};

export default function PlayPage(){return <Muse initialScreen="build"/>}
