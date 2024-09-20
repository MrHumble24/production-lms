import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = process.env.PROJECT_URL!;
const SUPABASE_SERVICE_ROLE_KEY: string = process.env.SUPABASE_API_KEY!;

const supabase: SupabaseClient = createClient(
  "https://shxqgxtugewtbjjknfvr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeHFneHR1Z2V3dGJqamtuZnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTkyMjUsImV4cCI6MjAzMjkzNTIyNX0.VSKP1Pw7HV87AcbkpiUCCt3zbqmzbDcCUqn5f-hRz6U"
);

export default supabase;
