// ── /middleware.js ───────────────────────────────────────────
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  (req) => {
    // ① NextAuth tarafından eklenen token'ı al
    const token = req.nextauth.token;
    console.log("yarak furkan")
    // ② Henüz giriş yapılmamışsa direkt /login'e at
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ③ Path ve role değerlerini al (küçük harfe çeviriyoruz)
    const path = req.nextUrl.pathname.toLowerCase();
    const role = (token.role || "user").toLowerCase();

    // ④ Tüm “admin” alt yollarını koru
    if (path.startsWith("/admin")) {
      // “admin” ya da “superadmin” değilse → /403
      if (!["admin", "superadmin"].includes(role)) {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }

    // ⑤ Tüm “superadmin” alt yollarını koru
    if (path.startsWith("/superadmin")) {
      // Sadece “superadmin” izni var
      if (role !== "superadmin") {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }

    // ⑥ Tüm “dashboard” alt yollarını koru (girişli olmak yeterli)
    if (path.startsWith("/dashboard")) {
      // token zaten varsa (authorized callback buna izin verdi) → devam
    }

    // ⑦ “/user” bölgesi de (tek girişli kullanıcılar)
    // if (path.startsWith("/user")) { /* kim girerse girsin */ }

    //  Burada console.log’ları ekleyebilirsin, ancak Edge Runtime çıktılarını
    //   görmek için tarayıcı geliştirici konsolunu kullanmalısın (terminal değil).
    console.log("🔍 middleware hit →", path, " | role:", role);
  },
  {
    callbacks: {
      // Token varsa “authorized’ız” diyoruz. Eğer token yoksa
      // yukarıda ② bloğunda /login’e yönlendirir.
      authorized: ({ token }) => !!token,
    },
  }
);

// ── matcher – Next.js App Router destekli “path-pattern” kuralları ──
export const config = {
  matcher: [
    "/",
    // Dashboard korunsun (hem /dashboard hem de /dashboard/…)
    "/dashboard",        
    "/dashboard/:path*",
    // Admin korunsun (hem /admin hem de /admin/…)
    "/admin",            
    "/admin/:path*",
    // SuperAdmin korunsun
    "/superAdmin",       
    "/superAdmin/:path*",
    // User korunsun
    "/user",             
    "/user/:path*",
  ],
};
