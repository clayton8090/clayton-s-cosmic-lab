import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type LabItem = Database["public"]["Tables"]["lab_items"]["Row"];
export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("sort_order");
  if (error) throw error;
  return data;
}
export async function getLabItems() {
  const { data, error } = await supabase.from("lab_items").select("*").order("sort_order");
  if (error) throw error;
  return data;
}
