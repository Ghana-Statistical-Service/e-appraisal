// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;

//   if (pathname.startsWith("/dashboard")) {
//     const token = req.cookies.get("token")?.value;

//     // fallback: token stored client-side → block server render
//     if (!token) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",           // landing / login
  "/login",
  "/favicon.ico",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.cookies.get("auth")?.value === "1";

  // Allow Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(.*)$/) // files: .png, .css, .js, etc.
  ) {
    return NextResponse.next();
  }

  // Allow public pages
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Block everything else
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
