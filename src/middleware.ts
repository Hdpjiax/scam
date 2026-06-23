import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware request path:", request.nextUrl.pathname);
  console.log("Middleware URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Middleware ANON_KEY exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const authTokenCookie = request.cookies.get("sb-jfyqcttmdwhllvryntcc-auth-token");
  console.log("Middleware auth-token cookie value:", authTokenCookie ? authTokenCookie.value.slice(0, 50) + "..." : "not found");
  console.log("Middleware cookies names:", request.cookies.getAll().map(c => c.name));

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
            maxAge: 0,
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({
            name,
            value: "",
            ...options,
            maxAge: 0,
          });
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("Middleware getUser result:", { hasUser: !!user, authError: authError?.message || null });

  // Helper to construct redirects and copy cookies
  const redirectWithCookies = (toPath: string) => {
    const url = request.nextUrl.clone();
    url.pathname = toPath;
    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((c) => {
      const { name, value, ...options } = c;
      redirectResponse.cookies.set(name, value, options);
    });
    return redirectResponse;
  };

  // Redirigir a usuarios no autenticados o que no son administradores fuera de /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      console.log("Middleware: Redirecting to /login because user is null");
      return redirectWithCookies("/login");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("Middleware check:", { userId: user.id, profile, profileError });

    if (!profile || profile.role !== "admin") {
      console.log("Middleware: Redirecting to / because profile is null or role is not admin");
      return redirectWithCookies("/");
    }
  }

  // Si el usuario ya inició sesión, redirigir fuera de /login
  if (request.nextUrl.pathname.startsWith("/login") && user) {
    // Redirigir según rol
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "admin") {
      return redirectWithCookies("/admin");
    } else {
      return redirectWithCookies("/");
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Mapear todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     * - Archivos de imágenes públicas (.png, .jpg, .svg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
