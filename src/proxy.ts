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
      supabaseOptions: {
        global: {
          fetch: (url: URL | RequestInfo, init?: RequestInit) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            return fetch(url, { ...init, signal: controller.signal })
              .then((res) => {
                clearTimeout(timeoutId);
                return res;
              })
              .catch((err) => {
                clearTimeout(timeoutId);
                throw err;
              });
          },
        },
      },
    },
  );

  let user: any = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user || null;
  } catch (error) {
    console.error("Middleware auth check timed out or failed:", error);
  }

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

    let role = "customer";
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      role = profile?.role || "customer";
    } catch (error) {
      console.error("Middleware profile role check timed out or failed:", error);
    }

    if (role !== "admin") return redirectWithCookies("/");
  }

  if (request.nextUrl.pathname.startsWith("/login") && user) {
    let role = "customer";
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      role = profile?.role || "customer";
    } catch (error) {
      console.error("Middleware login check timed out or failed:", error);
    }

    return redirectWithCookies(role === "admin" ? "/admin" : "/");
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
