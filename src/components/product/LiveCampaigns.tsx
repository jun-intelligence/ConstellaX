"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, BriefcaseBusiness, Loader2, Plus, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";

type LiveCampaign = {
  id: string;
  name: string;
  objective: string;
  status: string;
  campaign_budget: number;
  currency: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
};

const initialForm = {
  name: "",
  objective: "",
  campaign_budget: "25000",
  start_date: "",
  end_date: ""
};

export function LiveCampaigns() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [campaigns, setCampaigns] = useState<LiveCampaign[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadCampaigns() {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      setMessage("Supabase is not configured yet.");
      return;
    }

    setLoading(true);
    setMessage("");

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage(userError?.message || "Log in to manage live campaigns.");
      setLoading(false);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("id,email,full_name,role,company_name,created_at")
      .eq("id", user.id)
      .single();

    if (profileError) {
      setMessage(profileError.message);
      setLoading(false);
      return;
    }

    setProfile(profileData);

    const ownerColumn = profileData.role === "agency" ? "agency_id" : "brand_id";
    const { data, error } = await supabase
      .from("campaigns")
      .select("id,name,objective,status,campaign_budget,currency,start_date,end_date,created_at")
      .eq(ownerColumn, user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setCampaigns(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured || !supabase || !profile) return;

    if (!["brand", "agency"].includes(profile.role)) {
      setMessage("Only brand and agency accounts can create campaigns in this MVP workflow.");
      return;
    }

    setSaving(true);
    setMessage("");

    const brandId = profile.role === "brand" ? profile.id : null;
    const agencyId = profile.role === "agency" ? profile.id : null;

    const { error } = await supabase.from("campaigns").insert({
      name: form.name,
      objective: form.objective,
      brand_id: brandId,
      agency_id: agencyId,
      campaign_budget: Number(form.campaign_budget || 0),
      currency: "USD",
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      status: "planning"
    });

    if (error) {
      setMessage(error.message);
    } else {
      setForm(initialForm);
      await loadCampaigns();
      setMessage("Campaign created and stored in Supabase.");
    }

    setSaving(false);
  }

  return (
    <main className="workspacePage">
      <header className="workspaceHeader compact">
        <div>
          <p className="eyebrow">Live Supabase workflow</p>
          <h1>Live campaigns</h1>
          <p>Create and read campaign records from Supabase. This is the first real backend-backed workflow.</p>
        </div>
        <span className="statusPill active">Supabase connected</span>
      </header>

      {message ? <p className="formMessage">{message}</p> : null}

      <section className="splitLayout">
        <div className="workspacePanel">
          <div className="panelTitle">
            <div>
              <h2>Create campaign</h2>
              <p>For brand and agency accounts.</p>
            </div>
            <Plus size={18} />
          </div>

          <form className="liveCampaignForm" onSubmit={createCampaign}>
            <input
              placeholder="Campaign name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
            />
            <textarea
              placeholder="Campaign objective"
              value={form.objective}
              onChange={(event) => setForm((current) => ({ ...current, objective: event.target.value }))}
              required
            />
            <input
              min="0"
              placeholder="Budget"
              type="number"
              value={form.campaign_budget}
              onChange={(event) => setForm((current) => ({ ...current, campaign_budget: event.target.value }))}
              required
            />
            <div className="liveCampaignDates">
              <label>
                Start
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(event) => setForm((current) => ({ ...current, start_date: event.target.value }))}
                />
              </label>
              <label>
                End
                <input
                  type="date"
                  value={form.end_date}
                  onChange={(event) => setForm((current) => ({ ...current, end_date: event.target.value }))}
                />
              </label>
            </div>
            <button type="submit" disabled={saving || !profile}>
              {saving ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
              Create live campaign
            </button>
          </form>
        </div>

        <div className="workspacePanel">
          <div className="panelTitle">
            <div>
              <h2>Your campaign records</h2>
              <p>{profile ? `${profile.full_name} / ${profile.role}` : "Loading account..."}</p>
            </div>
            <ShieldCheck size={18} />
          </div>

          {loading ? (
            <div className="loadingShell compact"><div /><div /><div /></div>
          ) : campaigns.length === 0 ? (
            <div className="emptyState">
              <BriefcaseBusiness size={22} />
              <strong>No live campaigns yet</strong>
              <p>Create the first campaign to test the Supabase workflow.</p>
            </div>
          ) : (
            <div className="dataRows">
              {campaigns.map((campaign) => (
                <article className="dataRow" key={campaign.id}>
                  <div>
                    <strong>{campaign.name}</strong>
                    <p>{campaign.objective}</p>
                  </div>
                  <span>{campaign.currency} {Number(campaign.campaign_budget).toLocaleString()}</span>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
