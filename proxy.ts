import {NextRequest,NextResponse} from "next/server";
import {ACCESS_COOKIE,verifyAccessToken} from "./lib/access";

const isPublicAsset=(pathname:string)=>
 pathname.startsWith("/_next/")||
 pathname.startsWith("/game/")||
 pathname.startsWith("/catalog/")||
 /\.(?:png|jpe?g|webp|gif|ico|svg|woff2?|wasm|js|css|pck)$/i.test(pathname);

export async function proxy(request:NextRequest){
 const {pathname,search}=request.nextUrl;
 if(pathname==="/access"||pathname==="/api/access"||isPublicAsset(pathname))return NextResponse.next();
 if(await verifyAccessToken(request.cookies.get(ACCESS_COOKIE)?.value))return NextResponse.next();
 if(pathname.startsWith("/api/"))return NextResponse.json({error:"MUSE_ACCESS_REQUIRED"},{status:401});
 const target=request.nextUrl.clone();
 target.pathname="/access";
 target.search="";
 target.searchParams.set("returnTo",`${pathname}${search}`);
 return NextResponse.redirect(target);
}

export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};


