import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "", ...options, maxAge: 0 });
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const redirectWithCookies = (toPath: string) => {
    const url = request.nextUrl.clone();
    url.pathname = toPath;
    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      const { name, value, ...options } = cookie;
      redirectResponse.cookies.set(name, value, options);
    });
    return redirectResponse;
  };

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) return redirectWithCookies("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") return redirectWithCookies("/");
  }

  if (request.nextUrl.pathname.startsWith("/login") && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    return redirectWithCookies(profile?.role === "admin" ? "/admin" : "/");
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
