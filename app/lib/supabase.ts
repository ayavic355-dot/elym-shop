import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fniiuatohqdagbqhfvyt.supabase.co";
const supabaseAnonKey = "sb_publishable_DNMgHAv46a9FIKbuFs0aCw_wdmmrPfP";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);