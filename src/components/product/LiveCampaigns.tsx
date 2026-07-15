"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";

type CompensationType = "organic_seeding" | "paid" | "token_fee" | "hybrid";
type ApplicationStatus = "submitted" | "shortlisted" | "rejected" | "accepted" | "deal_created";

type LiveCampaign = {
  id: string;
  name: string;
  objective: string;
  status: string;
  campaign_budget: number;
  currency: string;
  campaign_region: string | null;
  start_date: string | null;
  end_date: string | null;
  compensation_type: CompensationType;
  creator_min_fee: number;
  creator_max_fee: number;
  product_value: number;
  product_value_min: number;
  product_value_max: number;
  token_fee_amount: number;
  creator_slots: number;
  application_status: string;
  target_creator_niches: string[];
  target_platforms: string[];
  min_followers: number;
  max_followers: number | null;
  creator_requirements: string | null;
  usage_rights_type: string | null;
  usage_rights_notes: string | null;
  creator_notification_date: string | null;
  selection_cutoff_date: string | null;
  brand_id: string | null;
  agency_id: string | null;
  created_at: string;
};

type CampaignApplication = {
  id: string;
  campaign_id: string;
  creator_id: string;
  status: ApplicationStatus;
  compensation_type: CompensationType;
  proposed_fee: number;
  proposed_fee_min: number;
  proposed_fee_max: number;
  token_fee_amount: number;
  product_value: number;
  follower_count: number;
  photography_budget: number;
  videography_budget: number;
  hair_makeup_budget: number;
  other_fees_budget: number;
  budget_notes: string | null;
  pitch: string;
  social_handle: string | null;
  portfolio_url: string | null;
  audience_notes: string | null;
  created_at: string;
};

const initialCampaignForm = {
  name: "",
  objective: "",
  campaign_budget: "25000",
  currency: "USD",
  campaign_region: "Singapore",
  compensation_type: "paid" as CompensationType,
  creator_min_fee: "1000",
  creator_max_fee: "3500",
  product_value_min: "150",
  product_value_max: "500",
  token_fee_amount: "0",
  creator_slots: "5",
  target_creator_niches: "lifestyle, fashion, everyday utility",
  target_platforms: "Instagram, TikTok",
  min_followers: "10000",
  max_followers: "150000",
  creator_requirements: "Strong engagement quality, clean brand safety history, able to submit draft for approval.",
  usage_rights_type: "free_reposting",
  usage_rights_notes: "Brand may repost approved creator content organically with credit. Paid usage requires separate approval.",
  creator_notification_date: "",
  selection_cutoff_date: "",
  start_date: "",
  end_date: ""
};

const initialApplicationForm = {
  compensation_type: "organic_seeding" as CompensationType,
  proposed_fee_min: "1000",
  proposed_fee_max: "2500",
  token_fee_amount: "0",
  product_value: "0",
  follower_count: "12000",
  photography_budget: "0",
  videography_budget: "0",
  hair_makeup_budget: "0",
  other_fees_budget: "0",
  budget_notes: "Budget includes production support for shooting, editing, and styling where needed.",
  social_handle: "",
  portfolio_url: "",
  audience_notes: "Audience is mostly women 24-34 with strong interest in beauty, routine content, and premium lifestyle.",
  pitch: "I can create a calm product-led story with one hero reel and supporting story frames that show real usage."
};

const compensationLabels: Record<CompensationType, string> = {
  organic_seeding: "Organic seeding",
  paid: "Paid",
  token_fee: "Token fee",
  hybrid: "Hybrid"
};

const statusLabels: Record<ApplicationStatus, string> = {
  submitted: "Submitted",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  accepted: "Accepted",
  deal_created: "Deal created"
};

const productValueOptions = Array.from({ length: 21 }, (_, index) => String(index * 100));

const usageRightsLabels: Record<string, string> = {
  free_usage: "Free usage",
  paid_usage: "Paid usage fee",
  collab: "Collab",
  free_reposting: "Free reposting"
};

function listFromInput(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function money(value: number | string | null | undefined, currency = "USD") {
  return `${currency} ${Number(value || 0).toLocaleString()}`;
}

function rangeMoney(min: number | string | null | undefined, max: number | string | null | undefined, currency = "USD") {
  return `${money(min, currency)} - ${money(max, currency)}`;
}

function titleCase(value: string) {
  return value
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : ""))
    .join(" ");
}

function titleCaseList(values: string[]) {
  return values.map(titleCase).join(", ");
}

function suggestCreatorNiches(name: string, objective: string) {
  const text = `${name} ${objective}`.toLowerCase();
  const matches = [
    { keys: ["crocs", "shoe", "footwear", "sandal"], niches: ["lifestyle", "fashion", "streetwear", "family", "everyday utility"] },
    { keys: ["beauty", "makeup", "skincare", "serum"], niches: ["beauty", "skincare", "lifestyle", "self-care"] },
    { keys: ["fitness", "run", "gym", "wellness"], niches: ["fitness", "wellness", "lifestyle", "performance"] },
    { keys: ["food", "restaurant", "drink", "cafe"], niches: ["food", "lifestyle", "local discovery", "hospitality"] },
    { keys: ["tech", "app", "software", "ai"], niches: ["technology", "productivity", "business", "creator tools"] }
  ];

  return matches.find((match) => match.keys.some((key) => text.includes(key)))?.niches || ["lifestyle", "culture", "creator-led storytelling"];
}

function suggestedCompensationByFollowers(followerCount: number) {
  if (followerCount < 10000) return "Organic seeding with guaranteed content";
  if (followerCount <= 30000) return "Token fee range with creator bid";
  return "Paid fee range with AI-supported negotiation";
}

export function LiveCampaigns() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [campaigns, setCampaigns] = useState<LiveCampaign[]>([]);
  const [applications, setApplications] = useState<CampaignApplication[]>([]);
  const [creatorProfiles, setCreatorProfiles] = useState<Record<string, Profile>>({});
  const [campaignForm, setCampaignForm] = useState(initialCampaignForm);
  const [applicationForm, setApplicationForm] = useState(initialApplicationForm);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [editingCampaignId, setEditingCampaignId] = useState("");
  const [activeTab, setActiveTab] = useState<"brief" | "applications" | "deals">("brief");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const selectedCampaign = useMemo(
    () => campaigns.find((campaign) => campaign.id === selectedCampaignId) || campaigns[0],
    [campaigns, selectedCampaignId]
  );

  const isCampaignOwner = profile ? ["brand", "agency"].includes(profile.role) : false;
  const isCreator = profile?.role === "creator";

  async function loadApplications(campaignId: string) {
    if (!supabase || !campaignId) return;

    const { data, error } = await supabase
      .from("campaign_applications")
      .select("*")
      .eq("campaign_id", campaignId)
      .order("created_at", { ascending: false });

    if (error) {
      setApplications([]);
      setMessage(error.message);
      return;
    }

    const applicationRows = (data || []) as CampaignApplication[];
    setApplications(applicationRows);

    const creatorIds = Array.from(new Set(applicationRows.map((application) => application.creator_id)));
    if (creatorIds.length === 0) {
      setCreatorProfiles({});
      return;
    }

    const { data: profiles } = await supabase
      .from("users")
      .select("id,email,full_name,role,company_name,created_at")
      .in("id", creatorIds);

    setCreatorProfiles(
      ((profiles || []) as Profile[]).reduce<Record<string, Profile>>((map, creator) => {
        map[creator.id] = creator;
        return map;
      }, {})
    );
  }

  async function loadCampaigns(nextSelectedCampaignId?: string) {
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

    const currentProfile = profileData as Profile;
    setProfile(currentProfile);

    let query = supabase
      .from("campaigns")
      .select(
        "id,name,objective,status,campaign_budget,currency,campaign_region,start_date,end_date,compensation_type,creator_min_fee,creator_max_fee,product_value,product_value_min,product_value_max,token_fee_amount,creator_slots,application_status,target_creator_niches,target_platforms,min_followers,max_followers,creator_requirements,usage_rights_type,usage_rights_notes,creator_notification_date,selection_cutoff_date,brand_id,agency_id,created_at"
      )
      .order("created_at", { ascending: false });

    if (currentProfile.role === "agency") {
      query = query.eq("agency_id", user.id);
    } else if (currentProfile.role === "brand") {
      query = query.eq("brand_id", user.id);
    } else {
      query = query.eq("application_status", "open");
    }

    const { data, error } = await query;

    if (error) {
      setCampaigns([]);
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const rows = (data || []) as LiveCampaign[];
    setCampaigns(rows);

    const nextId = nextSelectedCampaignId || selectedCampaignId || rows[0]?.id || "";
    setSelectedCampaignId(nextId);
    if (nextId) await loadApplications(nextId);

    setLoading(false);
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  function beginEditCampaign(campaign: LiveCampaign) {
    setEditingCampaignId(campaign.id);
    setActiveTab("brief");
    setCampaignForm({
      name: campaign.name,
      objective: campaign.objective,
      campaign_budget: String(campaign.campaign_budget || 0),
      currency: campaign.currency || "USD",
      campaign_region: campaign.campaign_region || "Singapore",
      compensation_type: campaign.compensation_type,
      creator_min_fee: String(campaign.creator_min_fee || 0),
      creator_max_fee: String(campaign.creator_max_fee || 0),
      product_value_min: String(campaign.product_value_min ?? campaign.product_value ?? 0),
      product_value_max: String(campaign.product_value_max ?? campaign.product_value ?? 0),
      token_fee_amount: String(campaign.token_fee_amount || 0),
      creator_slots: String(campaign.creator_slots || 1),
      target_creator_niches: campaign.target_creator_niches.join(", "),
      target_platforms: campaign.target_platforms.join(", "),
      min_followers: String(campaign.min_followers || 0),
      max_followers: campaign.max_followers ? String(campaign.max_followers) : "",
      creator_requirements: campaign.creator_requirements || "",
      usage_rights_type: campaign.usage_rights_type || "free_reposting",
      usage_rights_notes: campaign.usage_rights_notes || "",
      creator_notification_date: campaign.creator_notification_date || "",
      selection_cutoff_date: campaign.selection_cutoff_date || "",
      start_date: campaign.start_date || "",
      end_date: campaign.end_date || ""
    });
  }

  async function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured || !supabase || !profile) return;

    if (!isCampaignOwner) {
      setMessage("Only brand and agency accounts can create campaigns in this MVP workflow.");
      return;
    }

    setSaving(true);
    setMessage("");

    const campaignPayload = {
        name: campaignForm.name,
        objective: campaignForm.objective,
        brand_id: profile.role === "brand" ? profile.id : null,
        agency_id: profile.role === "agency" ? profile.id : null,
        campaign_budget: Number(campaignForm.campaign_budget || 0),
        currency: campaignForm.currency,
        campaign_region: campaignForm.campaign_region,
        compensation_type: campaignForm.compensation_type,
        creator_min_fee: Number(campaignForm.creator_min_fee || 0),
        creator_max_fee: Number(campaignForm.creator_max_fee || 0),
        product_value: Number(campaignForm.product_value_max || 0),
        product_value_min: Number(campaignForm.product_value_min || 0),
        product_value_max: Number(campaignForm.product_value_max || 0),
        token_fee_amount: Number(campaignForm.token_fee_amount || 0),
        creator_slots: Number(campaignForm.creator_slots || 1),
        target_creator_niches: listFromInput(campaignForm.target_creator_niches),
        target_platforms: listFromInput(campaignForm.target_platforms),
        min_followers: Number(campaignForm.min_followers || 0),
        max_followers: campaignForm.max_followers ? Number(campaignForm.max_followers) : null,
        creator_requirements: campaignForm.creator_requirements,
        usage_rights_type: campaignForm.usage_rights_type,
        usage_rights_notes: campaignForm.usage_rights_notes,
        creator_notification_date: campaignForm.creator_notification_date || null,
        selection_cutoff_date: campaignForm.selection_cutoff_date || null,
        start_date: campaignForm.start_date || null,
        end_date: campaignForm.end_date || null,
        application_status: "open",
        status: "planning"
      };

    const request = editingCampaignId
      ? supabase.from("campaigns").update(campaignPayload).eq("id", editingCampaignId).select("id").single()
      : supabase.from("campaigns").insert(campaignPayload).select("id").single();

    const { data, error } = await request;

    if (error) {
      setMessage(error.message);
    } else {
      setEditingCampaignId("");
      setCampaignForm(initialCampaignForm);
      await loadCampaigns(data?.id);
      setMessage(editingCampaignId ? "Campaign controls updated." : "Campaign created. Creators can now submit interest from the creator view.");
    }

    setSaving(false);
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !profile || !selectedCampaign) return;

    if (!isCreator) {
      setMessage("Only creator accounts can submit interest in this campaign.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("campaign_applications").insert({
      campaign_id: selectedCampaign.id,
      creator_id: profile.id,
      compensation_type: applicationForm.compensation_type,
      proposed_fee: Number(applicationForm.proposed_fee_max || 0),
      proposed_fee_min: Number(applicationForm.proposed_fee_min || 0),
      proposed_fee_max: Number(applicationForm.proposed_fee_max || 0),
      token_fee_amount: Number(applicationForm.token_fee_amount || 0),
      product_value: Number(applicationForm.product_value || 0),
      follower_count: Number(applicationForm.follower_count || 0),
      photography_budget: Number(applicationForm.photography_budget || 0),
      videography_budget: Number(applicationForm.videography_budget || 0),
      hair_makeup_budget: Number(applicationForm.hair_makeup_budget || 0),
      other_fees_budget: Number(applicationForm.other_fees_budget || 0),
      budget_notes: applicationForm.budget_notes || null,
      pitch: applicationForm.pitch,
      social_handle: applicationForm.social_handle || null,
      portfolio_url: applicationForm.portfolio_url || null,
      audience_notes: applicationForm.audience_notes || null,
      status: "submitted"
    });

    if (error) {
      setMessage(error.message.includes("duplicate") ? "You have already submitted interest for this campaign." : error.message);
    } else {
      setApplicationForm(initialApplicationForm);
      await loadApplications(selectedCampaign.id);
      setMessage("Interest submitted. The campaign owner can now review and create a deal.");
    }

    setSaving(false);
  }

  async function updateApplicationStatus(application: CampaignApplication, status: ApplicationStatus) {
    if (!supabase || !selectedCampaign) return;
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("campaign_applications")
      .update({ status })
      .eq("id", application.id);

    if (error) {
      setMessage(error.message);
    } else {
      await loadApplications(selectedCampaign.id);
      setMessage(`Application marked as ${statusLabels[status].toLowerCase()}.`);
    }

    setSaving(false);
  }

  async function createDealFromApplication(application: CampaignApplication) {
    if (!supabase || !selectedCampaign) return;
    setSaving(true);
    setMessage("");

    const creatorFee = application.proposed_fee_max || application.proposed_fee || selectedCampaign.creator_max_fee || 0;
    const creatorName = creatorProfiles[application.creator_id]?.full_name || "Creator";

    const { data: deal, error } = await supabase
      .from("deals")
      .insert({
        campaign_id: selectedCampaign.id,
        title: `${selectedCampaign.name} - ${creatorName}`,
        brief: selectedCampaign.objective,
        brand_id: selectedCampaign.brand_id,
        agency_id: selectedCampaign.agency_id,
        creator_id: application.creator_id,
        status: "pending_creator",
        campaign_budget: selectedCampaign.campaign_budget,
        creator_fee: creatorFee,
        agency_fee: selectedCampaign.agency_id ? Math.round(selectedCampaign.campaign_budget * 0.15) : 0,
        platform_fee: Math.round(selectedCampaign.campaign_budget * 0.03),
        compensation_type: application.compensation_type,
        payment_status: "scheduled",
        contract_status: "drafting",
        nda_status: "drafting",
        due_date: selectedCampaign.end_date,
        usage_rights: `${usageRightsLabels[selectedCampaign.usage_rights_type || "free_reposting"] || "Usage rights"}: ${selectedCampaign.usage_rights_notes || "Usage terms to be confirmed before creator approval."}`
      })
      .select("id")
      .single();

    if (error || !deal) {
      setMessage(error?.message || "Could not create deal.");
      setSaving(false);
      return;
    }

    await supabase.from("payment_terms").insert({
      deal_id: deal.id,
      custom_deposit: Math.round(creatorFee * 0.3),
      milestone_payments: [
        { name: "Draft approval", amount: Math.round(creatorFee * 0.4) },
        { name: "Final delivery", amount: Math.round(creatorFee * 0.3) }
      ],
      net_terms: "Net 60 upon completion",
      production_budget: selectedCampaign.product_value_max ?? selectedCampaign.product_value,
      usage_rights_fee: 0,
      notes: compensationLabels[application.compensation_type]
    });

    await supabase.from("deliverables").insert([
      {
        deal_id: deal.id,
        title: "Hero short-form video",
        description: "Primary campaign deliverable for approval.",
        format: "Reel / TikTok",
        owner_id: application.creator_id,
        due_date: selectedCampaign.end_date
      },
      {
        deal_id: deal.id,
        title: "Story support frames",
        description: "Supporting content with campaign hashtag and brand tag.",
        format: "Stories",
        owner_id: application.creator_id,
        due_date: selectedCampaign.end_date
      }
    ]);

    await supabase.from("campaign_applications").update({ status: "deal_created" }).eq("id", application.id);
    await loadApplications(selectedCampaign.id);
    setMessage("Deal created with starter payment terms and deliverables.");
    setSaving(false);
  }

  return (
    <main className="workspacePage liveCampaignPage">
      <header className="workspaceHeader compact">
        <div>
          <p className="eyebrow">Live campaign operating workflow</p>
          <h1>Campaign deal creation</h1>
          <p>
            Structure the brief, control compensation, receive creator interest, shortlist applicants, and convert approved
            creators into live deals.
          </p>
          <div className="liveHeroMeta" aria-label="Workflow principles">
            <span>Human-approved</span>
            <span>Budget transparent</span>
            <span>Creator-safe</span>
          </div>
        </div>
        <span className="statusPill active">Supabase connected</span>
      </header>

      {message ? <p className="formMessage">{message}</p> : null}

      <section className="livePrincipleStrip" aria-label="Live campaign principles">
        <article>
          <span>01</span>
          <strong>Brief with care</strong>
          <p>Campaign controls stay structured so brands can launch without losing operational clarity.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Invite creator context</strong>
          <p>Applications capture fit, rate, production needs, and usage boundaries before negotiation.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Convert with records</strong>
          <p>Approved creators become trackable deals with terms, timelines, and payment visibility.</p>
        </article>
      </section>

      <section className="liveWorkflowTabs" aria-label="Campaign workflow">
        {[
          { id: "brief", label: "Brief & budget", icon: BriefcaseBusiness },
          { id: "applications", label: "Creator applications", icon: Users },
          { id: "deals", label: "Deal creation", icon: ClipboardCheck }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={activeTab === item.id ? "active" : ""}
              key={item.id}
              onClick={() => setActiveTab(item.id as "brief" | "applications" | "deals")}
              type="button"
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </section>

      {loading ? (
        <div className="workspacePanel">
          <div className="loadingShell compact"><div /><div /><div /></div>
        </div>
      ) : (
        <>
          {activeTab === "brief" ? (
            <section className="splitLayout liveCampaignSuite">
              <div className="workspacePanel">
                <div className="panelTitle">
                  <div>
                    <h2>{isCampaignOwner ? "Create campaign brief" : "Available campaigns"}</h2>
                    <p>{profile ? `${profile.full_name} / ${profile.role}` : "Loading account..."}</p>
                  </div>
                  <Plus size={18} />
                </div>

                {isCampaignOwner ? (
                  <form className="liveCampaignForm" onSubmit={createCampaign}>
                    <input
                      placeholder="Campaign name"
                      value={campaignForm.name}
                      onChange={(event) => setCampaignForm((current) => ({ ...current, name: event.target.value }))}
                      required
                    />
                    <textarea
                      placeholder="Campaign objective"
                      value={campaignForm.objective}
                      onChange={(event) => setCampaignForm((current) => ({ ...current, objective: event.target.value }))}
                      required
                    />
                    <div className="liveFieldGrid">
                      <label>
                        Internal total budget
                        <input
                          min="0"
                          type="number"
                          value={campaignForm.campaign_budget}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, campaign_budget: event.target.value }))}
                          required
                        />
                      </label>
                      <label>
                        Currency
                        <select
                          value={campaignForm.currency}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, currency: event.target.value }))}
                        >
                          <option value="USD">USD</option>
                          <option value="SGD">SGD</option>
                          <option value="MYR">MYR</option>
                          <option value="PHP">PHP</option>
                          <option value="IDR">IDR</option>
                          <option value="THB">THB</option>
                        </select>
                      </label>
                      <label>
                        Campaign region
                        <input
                          value={campaignForm.campaign_region}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, campaign_region: event.target.value }))}
                          placeholder="Singapore"
                        />
                      </label>
                      <label>
                        Creator slots
                        <input
                          min="1"
                          type="number"
                          value={campaignForm.creator_slots}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, creator_slots: event.target.value }))}
                          required
                        />
                      </label>
                      <label>
                        Compensation
                        <select
                          value={campaignForm.compensation_type}
                          onChange={(event) =>
                            setCampaignForm((current) => ({ ...current, compensation_type: event.target.value as CompensationType }))
                          }
                        >
                          {Object.entries(compensationLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Min creator fee
                        <input
                          min="0"
                          type="number"
                          value={campaignForm.creator_min_fee}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, creator_min_fee: event.target.value }))}
                        />
                      </label>
                      <label>
                        Max creator fee
                        <input
                          min="0"
                          type="number"
                          value={campaignForm.creator_max_fee}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, creator_max_fee: event.target.value }))}
                        />
                      </label>
                      <label>
                        Product value min
                        <select
                          value={campaignForm.product_value_min}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, product_value_min: event.target.value }))}
                        >
                          {productValueOptions.map((value) => (
                            <option key={value} value={value}>{money(value, campaignForm.currency)}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Product value max
                        <select
                          value={campaignForm.product_value_max}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, product_value_max: event.target.value }))}
                        >
                          {productValueOptions.map((value) => (
                            <option key={value} value={value}>{money(value, campaignForm.currency)}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Token fee
                        <input
                          min="0"
                          type="number"
                          value={campaignForm.token_fee_amount}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, token_fee_amount: event.target.value }))}
                        />
                      </label>
                    </div>
                    <div className="liveFieldGrid">
                      <label>
                        AI suggested creator niches
                        <input
                          value={campaignForm.target_creator_niches}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, target_creator_niches: event.target.value }))}
                        />
                      </label>
                      <button
                        className="liveSecondaryButton"
                        onClick={() =>
                          setCampaignForm((current) => ({
                            ...current,
                            target_creator_niches: suggestCreatorNiches(current.name, current.objective).join(", ")
                          }))
                        }
                        type="button"
                      >
                        <Sparkles size={16} />
                        Suggest niches
                      </button>
                      <label>
                        Platforms
                        <input
                          value={campaignForm.target_platforms}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, target_platforms: event.target.value }))}
                        />
                      </label>
                      <label>
                        Min followers
                        <input
                          min="0"
                          type="number"
                          value={campaignForm.min_followers}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, min_followers: event.target.value }))}
                        />
                      </label>
                      <label>
                        Max followers
                        <input
                          min="0"
                          type="number"
                          value={campaignForm.max_followers}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, max_followers: event.target.value }))}
                        />
                      </label>
                    </div>
                    <textarea
                      placeholder="Creator requirements and approval notes"
                      value={campaignForm.creator_requirements}
                      onChange={(event) => setCampaignForm((current) => ({ ...current, creator_requirements: event.target.value }))}
                    />
                    <div className="liveFieldGrid">
                      <label>
                        Usage rights
                        <select
                          value={campaignForm.usage_rights_type}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, usage_rights_type: event.target.value }))}
                        >
                          {Object.entries(usageRightsLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Creator notified on
                        <input
                          type="date"
                          value={campaignForm.creator_notification_date}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, creator_notification_date: event.target.value }))}
                        />
                      </label>
                      <label>
                        Selection cutoff
                        <input
                          type="date"
                          value={campaignForm.selection_cutoff_date}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, selection_cutoff_date: event.target.value }))}
                        />
                      </label>
                    </div>
                    <textarea
                      placeholder="Usage rights notes"
                      value={campaignForm.usage_rights_notes}
                      onChange={(event) => setCampaignForm((current) => ({ ...current, usage_rights_notes: event.target.value }))}
                    />
                    <div className="liveCampaignDates">
                      <label>
                        Campaign goes live
                        <input
                          type="date"
                          value={campaignForm.start_date}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, start_date: event.target.value }))}
                        />
                      </label>
                      <label>
                        Final delivery
                        <input
                          type="date"
                          value={campaignForm.end_date}
                          onChange={(event) => setCampaignForm((current) => ({ ...current, end_date: event.target.value }))}
                        />
                      </label>
                    </div>
                    <button type="submit" disabled={saving || !profile}>
                      {saving ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
                      {editingCampaignId ? "Save campaign controls" : "Create live campaign"}
                    </button>
                    {editingCampaignId ? (
                      <button
                        className="liveSecondaryButton"
                        onClick={() => {
                          setEditingCampaignId("");
                          setCampaignForm(initialCampaignForm);
                        }}
                        type="button"
                      >
                        Cancel editing
                      </button>
                    ) : null}
                  </form>
                ) : (
                  <CampaignList campaigns={campaigns} selectedCampaignId={selectedCampaign?.id} onSelect={setSelectedCampaignId} />
                )}
              </div>

              <CampaignControlPanel
                campaign={selectedCampaign}
                campaigns={campaigns}
                isCampaignOwner={isCampaignOwner}
                onSelect={(id) => {
                  setSelectedCampaignId(id);
                  loadApplications(id);
                }}
                onEdit={beginEditCampaign}
              />
            </section>
          ) : null}

          {activeTab === "applications" ? (
            <section className="splitLayout liveCampaignSuite">
              <div className="workspacePanel">
                <div className="panelTitle">
                  <div>
                    <h2>{isCreator ? "Submit interest" : "Applications queue"}</h2>
                    <p>{selectedCampaign?.name || "Select a campaign"}</p>
                  </div>
                  <Send size={18} />
                </div>

                {isCreator ? (
                  <form className="liveCampaignForm" onSubmit={submitApplication}>
                    <CampaignSelector campaigns={campaigns} selectedCampaignId={selectedCampaign?.id} onSelect={setSelectedCampaignId} />
                    <div className="liveFieldGrid">
                      <label>
                        Application type
                        <select
                          value={applicationForm.compensation_type}
                          onChange={(event) =>
                            setApplicationForm((current) => ({ ...current, compensation_type: event.target.value as CompensationType }))
                          }
                        >
                          <option value="organic_seeding">Organic seeding</option>
                          <option value="paid">State a rate</option>
                        </select>
                      </label>
                      <label>
                        Follower count
                        <input
                          min="0"
                          type="number"
                          value={applicationForm.follower_count}
                          onChange={(event) => setApplicationForm((current) => ({ ...current, follower_count: event.target.value }))}
                        />
                      </label>
                      <label>
                        Budget I can work with min
                        <input
                          min="0"
                          type="number"
                          value={applicationForm.proposed_fee_min}
                          onChange={(event) => setApplicationForm((current) => ({ ...current, proposed_fee_min: event.target.value }))}
                        />
                      </label>
                      <label>
                        Budget I can work with max
                        <input
                          min="0"
                          type="number"
                          value={applicationForm.proposed_fee_max}
                          onChange={(event) => setApplicationForm((current) => ({ ...current, proposed_fee_max: event.target.value }))}
                        />
                      </label>
                      <label>
                        Token fee
                        <input
                          min="0"
                          type="number"
                          value={applicationForm.token_fee_amount}
                          onChange={(event) => setApplicationForm((current) => ({ ...current, token_fee_amount: event.target.value }))}
                        />
                      </label>
                      <label>
                        Product value
                        <input
                          min="0"
                          type="number"
                          value={applicationForm.product_value}
                          onChange={(event) => setApplicationForm((current) => ({ ...current, product_value: event.target.value }))}
                        />
                      </label>
                    </div>
                    <div className="liveBudgetPlanner">
                      <div>
                        <h3>Creator budget planning</h3>
                        <p>Break down what you need to produce the content, so brands can understand where resources go.</p>
                      </div>
                      <div className="liveFieldGrid">
                        <label>
                          Photography
                          <input
                            min="0"
                            type="number"
                            value={applicationForm.photography_budget}
                            onChange={(event) => setApplicationForm((current) => ({ ...current, photography_budget: event.target.value }))}
                          />
                        </label>
                        <label>
                          Videography
                          <input
                            min="0"
                            type="number"
                            value={applicationForm.videography_budget}
                            onChange={(event) => setApplicationForm((current) => ({ ...current, videography_budget: event.target.value }))}
                          />
                        </label>
                        <label>
                          Hair and makeup
                          <input
                            min="0"
                            type="number"
                            value={applicationForm.hair_makeup_budget}
                            onChange={(event) => setApplicationForm((current) => ({ ...current, hair_makeup_budget: event.target.value }))}
                          />
                        </label>
                        <label>
                          Other fees
                          <input
                            min="0"
                            type="number"
                            value={applicationForm.other_fees_budget}
                            onChange={(event) => setApplicationForm((current) => ({ ...current, other_fees_budget: event.target.value }))}
                          />
                        </label>
                      </div>
                      <textarea
                        placeholder="Budget planning notes"
                        value={applicationForm.budget_notes}
                        onChange={(event) => setApplicationForm((current) => ({ ...current, budget_notes: event.target.value }))}
                      />
                    </div>
                    <div className="trustNote">
                      <Sparkles size={18} />
                      <p>{suggestedCompensationByFollowers(Number(applicationForm.follower_count || 0))}. Organic seeding applications can submit with no fee, while paid applicants can state the range they can work with.</p>
                    </div>
                    <input
                      placeholder="@socialhandle"
                      value={applicationForm.social_handle}
                      onChange={(event) => setApplicationForm((current) => ({ ...current, social_handle: event.target.value }))}
                    />
                    <input
                      placeholder="Portfolio or media kit URL"
                      value={applicationForm.portfolio_url}
                      onChange={(event) => setApplicationForm((current) => ({ ...current, portfolio_url: event.target.value }))}
                    />
                    <textarea
                      placeholder="Audience fit notes"
                      value={applicationForm.audience_notes}
                      onChange={(event) => setApplicationForm((current) => ({ ...current, audience_notes: event.target.value }))}
                    />
                    <textarea
                      placeholder="Why are you a good fit?"
                      value={applicationForm.pitch}
                      onChange={(event) => setApplicationForm((current) => ({ ...current, pitch: event.target.value }))}
                      required
                    />
                    <button type="submit" disabled={saving || !selectedCampaign}>
                      {saving ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
                      Submit interest
                    </button>
                  </form>
                ) : applications.length === 0 ? (
                  <div className="emptyState">
                    <Users size={22} />
                    <strong>No applications yet</strong>
                    <p>Share this campaign with creators or test with a creator account.</p>
                  </div>
                ) : (
                  <ApplicationList
                    applications={applications}
                    creatorProfiles={creatorProfiles}
                    onCreateDeal={createDealFromApplication}
                    onUpdateStatus={updateApplicationStatus}
                    saving={saving}
                  />
                )}
              </div>

              <CampaignControlPanel
                campaign={selectedCampaign}
                campaigns={campaigns}
                isCampaignOwner={isCampaignOwner}
                onSelect={(id) => {
                  setSelectedCampaignId(id);
                  loadApplications(id);
                }}
                onEdit={beginEditCampaign}
              />
            </section>
          ) : null}

          {activeTab === "deals" ? (
            <section className="workspacePanel">
              <div className="panelTitle">
                <div>
                  <h2>Deal creation control room</h2>
                  <p>Convert shortlisted creators into trackable deals with starter terms, deliverables, and approvals.</p>
                </div>
                <ShieldCheck size={18} />
              </div>

              {applications.length === 0 ? (
                <div className="emptyState">
                  <ClipboardCheck size={22} />
                  <strong>No creator applications to convert</strong>
                  <p>Applications will appear here after creators submit interest.</p>
                </div>
              ) : (
                <div className="dealCreationGrid">
                  {applications.map((application) => {
                    const creator = creatorProfiles[application.creator_id];
                    return (
                      <article className="dealCreationCard" key={application.id}>
                        <span className={`statusPill ${application.status}`}>{statusLabels[application.status]}</span>
                        <h3>{creator?.full_name || "Creator applicant"}</h3>
                        <p>{application.pitch}</p>
                        <div className="moneyGrid">
                          <span><BadgeDollarSign size={15} /> {rangeMoney(application.proposed_fee_min, application.proposed_fee_max)}</span>
                          <span>{compensationLabels[application.compensation_type]}</span>
                          <span>{Number(application.follower_count || 0).toLocaleString()} followers</span>
                          <span>{application.social_handle || "Handle pending"}</span>
                        </div>
                        <button
                          className="appleCta compact"
                          disabled={saving || application.status === "deal_created"}
                          onClick={() => createDealFromApplication(application)}
                          type="button"
                        >
                          <CheckCircle2 size={17} />
                          {application.status === "deal_created" ? "Deal created" : "Create deal"}
                        </button>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}

function CampaignSelector({
  campaigns,
  selectedCampaignId,
  onSelect
}: {
  campaigns: LiveCampaign[];
  selectedCampaignId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <label>
      Campaign
      <select value={selectedCampaignId || ""} onChange={(event) => onSelect(event.target.value)}>
        {campaigns.map((campaign) => (
          <option key={campaign.id} value={campaign.id}>
            {campaign.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function CampaignList({
  campaigns,
  selectedCampaignId,
  onSelect
}: {
  campaigns: LiveCampaign[];
  selectedCampaignId?: string;
  onSelect: (id: string) => void;
}) {
  if (campaigns.length === 0) {
    return (
      <div className="emptyState">
        <BriefcaseBusiness size={22} />
        <strong>No open campaigns yet</strong>
        <p>Open campaigns will appear here for creator applications.</p>
      </div>
    );
  }

  return (
    <div className="dataRows">
      {campaigns.map((campaign) => (
        <button
          className={`campaignSelectRow ${selectedCampaignId === campaign.id ? "active" : ""}`}
          key={campaign.id}
          onClick={() => onSelect(campaign.id)}
          type="button"
        >
          <div>
            <strong>{campaign.name}</strong>
            <p>{campaign.objective}</p>
          </div>
          <span>{compensationLabels[campaign.compensation_type]}</span>
        </button>
      ))}
    </div>
  );
}

function CampaignControlPanel({
  campaign,
  campaigns,
  isCampaignOwner,
  onSelect,
  onEdit
}: {
  campaign?: LiveCampaign;
  campaigns: LiveCampaign[];
  isCampaignOwner: boolean;
  onSelect: (id: string) => void;
  onEdit: (campaign: LiveCampaign) => void;
}) {
  if (!campaign) {
    return (
      <div className="workspacePanel">
        <div className="emptyState">
          <BriefcaseBusiness size={22} />
          <strong>No campaign selected</strong>
          <p>Create or select a campaign to see budget control and creator criteria.</p>
        </div>
      </div>
    );
  }

  const estimatedCreatorPool = campaign.creator_slots * campaign.creator_max_fee;
  const budgetRemaining = Math.max(campaign.campaign_budget - estimatedCreatorPool - campaign.token_fee_amount, 0);

  return (
    <div className="workspacePanel liveControlPanel">
      <div className="panelTitle">
        <div>
          <h2>{isCampaignOwner ? "Campaign controls" : "Campaign terms"}</h2>
          <p>{isCampaignOwner ? "Budget, compensation, creator fit, and application rules." : "Visible creator terms. Internal budget is private."}</p>
        </div>
        <ShieldCheck size={18} />
      </div>

      <CampaignSelector campaigns={campaigns} selectedCampaignId={campaign.id} onSelect={onSelect} />

      <div className="liveBudgetCards">
        {isCampaignOwner ? (
          <div>
            <span>Internal total budget</span>
            <strong>{money(campaign.campaign_budget, campaign.currency)}</strong>
          </div>
        ) : null}
        <div>
          <span>Creator fee range</span>
          <strong>{rangeMoney(campaign.creator_min_fee, campaign.creator_max_fee, campaign.currency)}</strong>
        </div>
        <div>
          <span>Product value range</span>
          <strong>{rangeMoney(campaign.product_value_min ?? campaign.product_value, campaign.product_value_max ?? campaign.product_value, campaign.currency)}</strong>
        </div>
        <div>
          <span>Slots</span>
          <strong>{campaign.creator_slots}</strong>
        </div>
        {isCampaignOwner ? (
          <div>
            <span>Buffer</span>
            <strong>{money(budgetRemaining, campaign.currency)}</strong>
          </div>
        ) : null}
        <div>
          <span>Region</span>
          <strong>{campaign.campaign_region || "Regional"}</strong>
        </div>
      </div>

      {isCampaignOwner ? (
        <div className="liveBudgetBar" aria-label="Budget allocation">
          <span style={{ width: `${Math.min((estimatedCreatorPool / Math.max(campaign.campaign_budget, 1)) * 100, 100)}%` }} />
          <span style={{ width: `${Math.min((campaign.token_fee_amount / Math.max(campaign.campaign_budget, 1)) * 100, 100)}%` }} />
          <span style={{ width: `${Math.min((budgetRemaining / Math.max(campaign.campaign_budget, 1)) * 100, 100)}%` }} />
        </div>
      ) : null}

      <div className="liveCriteriaGrid">
        <Criteria label="Compensation" value={compensationLabels[campaign.compensation_type]} />
        <Criteria label="Applications" value={titleCase(campaign.application_status || "open")} />
        <Criteria label="Niches" value={titleCaseList(campaign.target_creator_niches) || "Open"} />
        <Criteria label="Platforms" value={campaign.target_platforms.join(", ") || "Open"} />
        <Criteria label="Usage" value={usageRightsLabels[campaign.usage_rights_type || "free_reposting"] || "Free reposting"} />
        <Criteria
          label="Followers"
          value={`${campaign.min_followers.toLocaleString()} - ${campaign.max_followers?.toLocaleString() || "open"}`}
        />
        <Criteria label="Payment" value="Net 60 upon completion" />
      </div>

      <div className="liveTimeline">
        <div>
          <span>Campaign goes live</span>
          <strong>{campaign.start_date || "Pending"}</strong>
        </div>
        <div>
          <span>Creators notified</span>
          <strong>{campaign.creator_notification_date || "Pending"}</strong>
        </div>
        <div>
          <span>Selection cutoff</span>
          <strong>{campaign.selection_cutoff_date || "Pending"}</strong>
        </div>
        <div>
          <span>Final delivery</span>
          <strong>{campaign.end_date || "Pending"}</strong>
        </div>
      </div>

      <div className="trustNote">
        <CheckCircle2 size={18} />
        <p>{campaign.creator_requirements || "Creator requirements will appear here."}</p>
      </div>

      <div className="trustNote">
        <ShieldCheck size={18} />
        <p>{campaign.usage_rights_notes || "Usage rights and reposting terms will appear here."}</p>
      </div>

      {isCampaignOwner ? (
        <button className="liveSecondaryButton" onClick={() => onEdit(campaign)} type="button">
          Edit live campaign controls
        </button>
      ) : (
        <div className="trustNote">
          <ShieldCheck size={18} />
          <p>Total campaign budget is hidden from creator view. You can submit the fee range you can work with.</p>
        </div>
      )}
    </div>
  );
}

function Criteria({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ApplicationList({
  applications,
  creatorProfiles,
  onCreateDeal,
  onUpdateStatus,
  saving
}: {
  applications: CampaignApplication[];
  creatorProfiles: Record<string, Profile>;
  onCreateDeal: (application: CampaignApplication) => void;
  onUpdateStatus: (application: CampaignApplication, status: ApplicationStatus) => void;
  saving: boolean;
}) {
  return (
    <div className="applicationQueue">
      {applications.map((application) => {
        const creator = creatorProfiles[application.creator_id];
        return (
          <article key={application.id}>
            <div>
              <span className={`statusPill ${application.status}`}>{statusLabels[application.status]}</span>
              <h3>{creator?.full_name || "Creator applicant"}</h3>
              <p>{application.pitch}</p>
            </div>
            <div className="liveApplicantMeta">
              <span>{compensationLabels[application.compensation_type]}</span>
              <span>{rangeMoney(application.proposed_fee_min, application.proposed_fee_max)}</span>
              <span>{Number(application.follower_count || 0).toLocaleString()} followers</span>
              <span>{application.social_handle || "Handle pending"}</span>
            </div>
            <div className="liveApplicantMeta">
              <span>Photo {money(application.photography_budget)}</span>
              <span>Video {money(application.videography_budget)}</span>
              <span>H&MU {money(application.hair_makeup_budget)}</span>
              <span>Other {money(application.other_fees_budget)}</span>
            </div>
            {application.budget_notes ? <p>{application.budget_notes}</p> : null}
            {application.audience_notes ? <p>{application.audience_notes}</p> : null}
            <div className="liveActionRow">
              <button disabled={saving} onClick={() => onUpdateStatus(application, "shortlisted")} type="button">
                Shortlist
              </button>
              <button disabled={saving} onClick={() => onUpdateStatus(application, "rejected")} type="button">
                Reject
              </button>
              <button disabled={saving || application.status === "deal_created"} onClick={() => onCreateDeal(application)} type="button">
                Create deal
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
