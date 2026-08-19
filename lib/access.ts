import {env} from "cloudflare:workers";

export const ACCESS_COOKIE="muse_access";
export const ACCESS_MAX_AGE=60*60*24*30;

const runtime=()=>env as unknown as Record<string,string|undefined>;
const encode=(bytes:ArrayBuffer)=>{
 const binary=String.fromCharCode(...new Uint8Array(bytes));
 return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
};

async function signature(value:string){
 const secret=runtime().MUSE_ACCESS_SESSION_SECRET;
 if(!secret)return "";
 const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 return encode(await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(value)));
}

function safeEqual(a:string,b:string){
 if(a.length!==b.length)return false;
 let diff=0;
 for(let index=0;index<a.length;index++)diff|=a.charCodeAt(index)^b.charCodeAt(index);
 return diff===0;
}

export function configuredPin(){
 return runtime().MUSE_ACCESS_PIN??"";
}

export function pinMatches(input:string){
 const expected=configuredPin();
 return /^\d{4}$/.test(expected)&&/^\d{4}$/.test(input)&&safeEqual(input,expected);
}

export async function createAccessToken(){
 const expires=Math.floor(Date.now()/1000)+ACCESS_MAX_AGE;
 return `${expires}.${await signature(String(expires))}`;
}

export async function verifyAccessToken(token?:string){
 if(!token)return false;
 const [expires,provided,...rest]=token.split(".");
 if(!expires||!provided||rest.length||!/^\d+$/.test(expires))return false;
 if(Number(expires)<=Math.floor(Date.now()/1000))return false;
 const expected=await signature(expires);
 return Boolean(expected)&&safeEqual(provided,expected);
}
