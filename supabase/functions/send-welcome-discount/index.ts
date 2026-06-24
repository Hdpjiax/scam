// @ts-nocheck

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: {
    id?: string;
    email?: string;
    email_confirmed_at?: string | null;
    raw_user_meta_data?: {
      name?: string;
      marketing_opt_in?: boolean;
    };
  };
  old_record?: {
    email_confirmed_at?: string | null;
  };
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const WEBHOOK_SECRET = Deno.env.get("WELCOME_EMAIL_WEBHOOK_SECRET") || "";

const corsHeaders = {
  "Content-Type": "application/json",
};

const htmlFor = (name?: string) => {
  const greeting = name ? `Hola ${name.split(" ")[0]},` : "Bienvenido a NŌMA,";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#151611;color:#f4f1e9;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#151611;padding:34px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;border:1px solid #34362f;background:#1c1d19;">
            <tr>
              <td style="padding:44px 36px 26px;">
                <div style="font-family:Georgia,serif;font-size:38px;letter-spacing:.14em;color:#f4f1e9;">NŌMA</div>
                <div style="margin-top:8px;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#a6a197;">Welcome offer</div>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 36px 0;"><div style="height:1px;background:#3a3c35;"></div></td>
            </tr>
            <tr>
              <td style="padding:42px 36px 8px;">
                <h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:42px;line-height:1;color:#f4f1e9;">Tu primera pieza tiene 30% off.</h1>
                <p style="margin:22px 0 0;font-size:15px;line-height:1.75;color:#d8d3c8;">
                  ${greeting} gracias por confirmar tu cuenta. Para empezar tu colección, usa este código en tu primera compra.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 36px 8px;">
                <div style="border:1px solid #55584c;background:#24261f;padding:22px 24px;text-align:center;">
                  <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#a6a197;margin-bottom:10px;">Código de bienvenida</div>
                  <div style="font-family:Georgia,serif;font-size:34px;letter-spacing:.12em;color:#f4f1e9;">WELCOME30</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 36px 38px;">
                <a href="https://nomahome.us" style="display:inline-block;background:#f4f1e9;color:#1c1d19;text-decoration:none;padding:16px 24px;font-size:13px;font-weight:700;letter-spacing:.04em;">Explorar colección</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 42px;">
                <p style="margin:0;font-size:12px;line-height:1.7;color:#9c978d;">Válido para la primera compra. No acumulable con otras promociones.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 36px;background:#24261f;border-top:1px solid #34362f;">
                <p style="margin:0;font-size:11px;line-height:1.6;color:#a6a197;">NŌMA · Curated home pieces · nomahome.us</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const markDelivery = async (userId: string, email: string) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/welcome_email_deliveries`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "content-type": "application/json",
      prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({ user_id: userId, email }),
  });

  if (response.status === 409) return false;
  if (!response.ok) throw new Error(await response.text());
  return response.status === 201;
};

const sendWelcomeEmail = async (email: string, name?: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "NŌMA <hello@nomahome.us>",
      to: [email],
      subject: "Tu primera pieza NŌMA tiene 30% de descuento",
      html: htmlFor(name),
    }),
  });

  if (!response.ok) throw new Error(await response.text());
};

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    if (WEBHOOK_SECRET && req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables.");
    }

    const payload = (await req.json()) as WebhookPayload;
    const user = payload.record;
    const wasConfirmed = Boolean(payload.old_record?.email_confirmed_at);
    const isConfirmed = Boolean(user?.email_confirmed_at);

    if (!user?.id || !user.email || !isConfirmed || wasConfirmed) {
      return new Response(JSON.stringify({ skipped: true }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (user.raw_user_meta_data?.marketing_opt_in === false) {
      return new Response(JSON.stringify({ skipped: true, reason: "marketing_opt_out" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    const inserted = await markDelivery(user.id, user.email);
    if (!inserted) {
      return new Response(JSON.stringify({ skipped: true, reason: "already_sent" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    await sendWelcomeEmail(user.email, user.raw_user_meta_data?.name);

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
