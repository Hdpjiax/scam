-- SQL for creating the reviews table in Supabase
-- This table stores product reviews and general store reviews.

CREATE TABLE public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE, -- Si es null, es una reseña general de la tienda
    author_name VARCHAR(100) NOT NULL,
    author_avatar VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    is_verified_purchase BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
-- Permitir lectura a todos (público)
CREATE POLICY "Permitir lectura pública de reseñas"
ON public.reviews FOR SELECT
USING (true);

-- Permitir inserción, actualización y borrado solo a administradores (esto asume que manejan las reseñas internamente por ahora)
-- Si necesitas que usuarios regulares publiquen reseñas, tendrías que ajustar esta política.
CREATE POLICY "Permitir operaciones a usuarios autenticados"
ON public.reviews FOR ALL
USING (auth.role() = 'authenticated');
