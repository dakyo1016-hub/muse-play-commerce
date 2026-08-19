import {and,eq,sql} from "drizzle-orm";
import {env} from "cloudflare:workers";
import {getDb} from "../../../db";
import {tryOnUsage} from "../../../db/schema";
import {ACCESS_COOKIE,ACCESS_MAX_AGE,createAccessToken,pinMatches} from "../../../lib/access";

const base64Url=(bytes:ArrayBuffer)=>{
 const binary=String.fromCharCode(...new Uint8Array(bytes));
 return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
};

async function attemptKey(request:Request){
 const runtime=env as unknown as Record<string,string|undefined>;
 const ip=request.headers.get("cf-connecting-ip")??request.headers.get("x-forwarded-for")??"local";
 const salt=runtime.MUSE_ACCESS_SESSION_SECRET??"muse-access";
 return `pin:${base64Url(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`${salt}:${ip}`)))}`;
}

async function failedAttempts(request:Request){
 const db=getDb();
 const usageDay=`pin-${new Date().toISOString().slice(0,10)}`;
 const visitorHash=await attemptKey(request);
 const [row]=await db.select().from(tryOnUsage).where(and(eq(tryOnUsage.visitorHash,visitorHash),eq(tryOnUsage.usageDay,usageDay))).limit(1);
 return {db,usageDay,visitorHash,count:row?.count??0};
}

export async function POST(request:Request){
 const attempts=await failedAttempts(request);
 if(attempts.count>=10)return Response.json({error:"입력 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요."},{status:429});
 const body=await request.json().catch(()=>({})) as {pin?:string};
 const pin=String(body.pin??"").trim();
 if(!pinMatches(pin)){
  await attempts.db.insert(tryOnUsage).values({visitorHash:attempts.visitorHash,usageDay:attempts.usageDay,count:1}).onConflictDoUpdate({target:[tryOnUsage.visitorHash,tryOnUsage.usageDay],set:{count:sql`${tryOnUsage.count} + 1`,updatedAt:sql`CURRENT_TIMESTAMP`}});
  return Response.json({error:"비밀번호가 맞지 않습니다."},{status:401});
 }
 const token=await createAccessToken();
 return Response.json({ok:true},{headers:{
  "cache-control":"no-store",
  "set-cookie":`${ACCESS_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${ACCESS_MAX_AGE}`,
 }});
}
