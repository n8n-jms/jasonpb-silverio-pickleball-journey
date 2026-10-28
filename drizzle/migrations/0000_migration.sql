CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  preferred_date date NOT NULL,
  preferred_time text NOT NULL CHECK (char_length(preferred_time) <= 30),
  session_type text NOT NULL CHECK (session_type IN ('1-on-1','Small group')),
  hours integer NOT NULL DEFAULT 2 CHECK (hours BETWEEN 2 AND 6),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking request" ON public.booking_requests FOR INSERT TO anon, authenticated WITH CHECK (true);