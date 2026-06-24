CREATE TABLE IF NOT EXISTS public.welcome_email_deliveries (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.welcome_email_deliveries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read welcome email deliveries" ON public.welcome_email_deliveries;
CREATE POLICY "Admins can read welcome email deliveries"
ON public.welcome_email_deliveries
FOR SELECT
USING (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE profiles.id = (SELECT auth.uid())
          AND profiles.role = 'admin'
    )
);
