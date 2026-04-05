
-- Add missing columns to appointments
ALTER TABLE public.appointments 
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS appointment_time text,
  ADD COLUMN IF NOT EXISTS service_type text;

-- Change default status to 'pending'
ALTER TABLE public.appointments 
  ALTER COLUMN status SET DEFAULT 'pending';

-- Drop the old SELECT policy and replace with public access for admin dashboard
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON public.appointments;
CREATE POLICY "Anyone can view appointments" 
  ON public.appointments 
  FOR SELECT 
  TO public
  USING (true);
