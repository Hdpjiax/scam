import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
