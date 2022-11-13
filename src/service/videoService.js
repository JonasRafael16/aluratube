import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = "https://bagorjfquyvidaaxqswy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ29yamZxdXl2aWRhYXhxc3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjYwMDcsImV4cCI6MTk4Mzc0MjAwN30.ctwgbHyJyp44OZ44IBLJWPajmI8z8B2G6rBJ1QwCrKM";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("videos")
        .select("*");
    }
  }
}
