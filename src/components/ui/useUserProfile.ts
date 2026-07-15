"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";

export function useUserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      if (!isSupabaseConfigured || !supabase) {
        setLoading(false);
        return;
      }

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("id,email,full_name,role,company_name,created_at")
        .eq("id", user.id)
        .single();

      if (!mounted) return;

      setProfile((data as Profile) || null);
      setLoading(false);
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return { profile, loading };
}
