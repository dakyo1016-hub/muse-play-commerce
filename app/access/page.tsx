"use client";

import {FormEvent,useState} from "react";

export default function AccessPage(){
 const[pin,setPin]=useState("");
 const[busy,setBusy]=useState(false);
 const[message,setMessage]=useState("");
 const submit=async(event:FormEvent)=>{
  event.preventDefault();
  if(!/^\d{4}$/.test(pin)){setMessage("숫자 네 자리를 입력해주세요.");return}
  setBusy(true);setMessage("");
  try{
   const response=await fetch("/api/access",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({pin})});
   const data=await response.json() as {error?:string};
   if(!response.ok)throw new Error(data.error??"입장할 수 없습니다.");
   const requested=new URLSearchParams(window.location.search).get("returnTo")??"/";
   window.location.replace(requested.startsWith("/")&&!requested.startsWith("//")?requested:"/");
  }catch(error){setMessage(error instanceof Error?error.message:"입장할 수 없습니다.")}finally{setBusy(false)}
 };
 return <main className="access-page"><section className="access-card"><div className="access-brand"><span>PRIVATE PREVIEW · 01</span><h1>MUSE</h1><p>SHOPPING AS A GAME</p></div><form onSubmit={submit}><span>MEMBER ACCESS</span><h2>비밀번호를<br/>입력해주세요.</h2><p>초대받은 사용자만 MUSE의 PLAY와<br/>AI FITTING을 이용할 수 있습니다.</p><label><b>4-DIGIT PIN</b><input autoFocus aria-label="4자리 비밀번호" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{4}" maxLength={4} value={pin} onChange={event=>setPin(event.target.value.replace(/\D/g,"").slice(0,4))} placeholder="••••"/></label>{message&&<small>{message}</small>}<button disabled={busy||pin.length!==4}>{busy?"확인 중…":"ENTER MUSE →"}</button></form><footer><span>BUILD · BATTLE · REVEAL · SHOP</span><b>AI FITTING UNLOCKED</b></footer></section></main>
}
