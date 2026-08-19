import {env} from "cloudflare:workers";

const PRODUCT_ASSETS:Record<string,{path:string;label:string}>={
 "ivory-top":{path:"/catalog/women-01.jpg",label:"fitted ivory ribbed short sleeve top"},
 "soft-rib":{path:"/catalog/street-01.jpg",label:"charcoal ribbed henley shirt"},
 rugby:{path:"/catalog/street-03.jpg",label:"oversized washed charcoal tee"},
 cargo:{path:"/catalog/street-13.jpg",label:"wide khaki cargo pants"},
 "relaxed-denim":{path:"/catalog/street-14.jpg",label:"navy relaxed shorts"},
 "work-pants":{path:"/catalog/street-12.jpg",label:"washed brown work pants"},
 "cream-platform":{path:"/catalog/accessory-01.jpg",label:"cream platform sneakers"},
 "silver-runner":{path:"/catalog/accessory-02.jpg",label:"silver runner sneakers"},
 "penny-loafer":{path:"/catalog/accessory-03.jpg",label:"black penny loafers"},
 baguette:{path:"/catalog/accessory-09.jpg",label:"black soft baguette shoulder bag"},
 "nylon-cross":{path:"/catalog/accessory-11.jpg",label:"charcoal nylon crossbody bag"},
 "canvas-tote":{path:"/catalog/accessory-12.jpg",label:"ivory structured canvas tote"},
};

const toBase64=(bytes:ArrayBuffer)=>{
 const data=new Uint8Array(bytes);
 let binary="";
 for(let i=0;i<data.length;i+=8192)binary+=String.fromCharCode(...data.subarray(i,i+8192));
 return btoa(binary);
};

const base64Url=(input:string|ArrayBuffer)=>{
 const raw=typeof input==="string"?btoa(unescape(encodeURIComponent(input))):toBase64(input);
 return raw.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
};

async function getVertexToken(serviceAccount:{client_email:string;private_key:string}){
 const now=Math.floor(Date.now()/1000);
 const header=base64Url(JSON.stringify({alg:"RS256",typ:"JWT"}));
 const payload=base64Url(JSON.stringify({iss:serviceAccount.client_email,scope:"https://www.googleapis.com/auth/cloud-platform",aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+3600}));
 const unsigned=`${header}.${payload}`;
 const pem=serviceAccount.private_key.replace(/\\n/g,"\n").replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g,"");
 const keyBytes=Uint8Array.from(atob(pem),char=>char.charCodeAt(0));
 const key=await crypto.subtle.importKey("pkcs8",keyBytes,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["sign"]);
 const signature=await crypto.subtle.sign("RSASSA-PKCS1-v1_5",key,new TextEncoder().encode(unsigned));
 const assertion=`${unsigned}.${base64Url(signature)}`;
 const response=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion})});
 if(!response.ok)throw new Error("Google Cloud 인증에 실패했습니다.");
 const json=await response.json() as {access_token?:string};
 if(!json.access_token)throw new Error("Google Cloud 액세스 토큰이 없습니다.");
 return json.access_token;
}

export async function POST(request:Request){
 try{
  const body=await request.json() as {personImage?:string;itemIds?:string[];consent?:boolean};
  if(!body.consent)return Response.json({error:"사진 사용 및 성인 확인 동의가 필요합니다."},{status:400});
  if(!body.personImage?.startsWith("data:image/"))return Response.json({error:"얼굴 또는 전신 사진을 등록해주세요."},{status:400});
  if(body.personImage.length>12_000_000)return Response.json({error:"사진 용량이 너무 큽니다. 8MB 이하 이미지를 사용해주세요."},{status:413});
  const selected=[...new Set(body.itemIds??[])].map(id=>PRODUCT_ASSETS[id]).filter(Boolean).slice(0,4);
  if(selected.length<2)return Response.json({error:"최소 두 개 이상의 의류 아이템을 선택해주세요."},{status:400});
  const runtime=env as unknown as Record<string,string|undefined>;
  if(!runtime.GOOGLE_SERVICE_ACCOUNT_JSON)return Response.json({error:"AI_SETUP_REQUIRED",message:"Google Cloud 연결이 아직 필요합니다."},{status:503});
  const [,personMime="image/jpeg",personData]=body.personImage.match(/^data:(image\/(?:png|jpeg|webp));base64,(.+)$/)??[];
  if(!personData)return Response.json({error:"지원하지 않는 사진 형식입니다."},{status:400});
  const assets=(env as unknown as {ASSETS?:{fetch(request:Request):Promise<Response>}}).ASSETS;
  const productParts=await Promise.all(selected.map(async item=>{
   const assetRequest=new Request(new URL(item.path,request.url));
   const response=assets?await assets.fetch(assetRequest):await fetch(assetRequest);
   if(!response.ok)throw new Error("상품 이미지를 불러오지 못했습니다.");
   return {inlineData:{mimeType:response.headers.get("content-type")??"image/jpeg",data:toBase64(await response.arrayBuffer())}};
  }));
  const serviceAccount=JSON.parse(runtime.GOOGLE_SERVICE_ACCOUNT_JSON) as {project_id?:string;client_email:string;private_key:string};
  const project=runtime.GOOGLE_CLOUD_PROJECT_ID??serviceAccount.project_id;
  const location=runtime.GOOGLE_CLOUD_LOCATION??"global";
  if(!project)throw new Error("Google Cloud 프로젝트 ID가 없습니다.");
  const token=await getVertexToken(serviceAccount);
  const prompt=`Create one highly realistic full-body fashion try-on photograph in a strict vertical 3:4 composition. The first reference is the exact adult customer. Preserve the same recognizable face, facial features, body proportions, skin tone, hairstyle and identity. The complete face, full hair and head must be clearly visible, front-facing and unobscured. Dress the person naturally in these exact selected products: ${selected.map(item=>item.label).join(", ")}. Product references follow in the same order. Preserve garment colors, silhouette, texture, logos and construction details. Make the layering physically plausible, properly fitted and photorealistic. Pull the camera back and show the entire person from the top of the hair to the soles of both shoes, with 10 percent breathing room above the head and below the feet. Do not crop, zoom in, cut off the face, head, legs, shoes or any body part. Neutral light-gray studio background, soft editorial lighting, natural centered standing pose, no extra people, no text, no collage, no duplicate body parts.`;
  const endpoint=`https://aiplatform.googleapis.com/v1/projects/${encodeURIComponent(project)}/locations/${encodeURIComponent(location)}/publishers/google/models/gemini-3.1-flash-image:generateContent`;
  const response=await fetch(endpoint,{method:"POST",headers:{authorization:`Bearer ${token}`,"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt},{inlineData:{mimeType:personMime,data:personData}},...productParts]}],generationConfig:{responseModalities:["IMAGE"],imageConfig:{aspectRatio:"3:4",imageSize:"1K"}}})});
  const json=await response.json() as {candidates?:Array<{content?:{parts?:Array<{inlineData?:{mimeType?:string;data?:string};text?:string}>}}> ;error?:{message?:string}};
  if(!response.ok)throw new Error(json.error?.message??"AI 착장 생성에 실패했습니다.");
  const image=json.candidates?.flatMap(candidate=>candidate.content?.parts??[]).find(part=>part.inlineData?.data)?.inlineData;
  if(!image?.data)throw new Error("생성된 이미지가 반환되지 않았습니다.");
  return Response.json({image:`data:${image.mimeType??"image/png"};base64,${image.data}`,model:"gemini-3.1-flash-image",remaining:"PIN 인증 세션 · 제한 없음"});
 }catch(error){
  const message=error instanceof Error?error.message:"예상하지 못한 오류가 발생했습니다.";
  return Response.json({error:message},{status:500});
 }
}
