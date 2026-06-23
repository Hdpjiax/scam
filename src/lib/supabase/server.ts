import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Se ignora si es llamado desde un Server Component que no puede modificar cookies
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options, maxAge: 0 });
          } catch (error) {
            // Se ignora si es llamado desde un Server Component que no puede modificar cookies
          }
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
    }
  );
};
