import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Brain,
  CircleDollarSign,
  FileText,
  Lightbulb,
  MessageSquareText,
  PenLine,
  Send,
  ShieldAlert,
  Sparkles
} from "lucide-react";

const roles = ["Creator", "Manager", "Agency", "Brand"];

const prompts = [
  "What should I negotiate before accepting this campaign?",
  "Create a storyboard for the Lumina serum reel.",
  "Review the brief and identify risks.",
  "Draft a calm follow-up to brand finance.",
  "What should the final report highlight?"
];

const quickActions = [
  "Generate campaign concept",
  "Create storyboard",
  "Suggest content hooks",
  "Draft caption",
  "Review brief",
  "Recommend negotiation points",
  "Identify risks",
  "Generate final report outline"
];

const context = [
  ["Campaign", "Lumina Spring Launch"],
  ["Brand", "Lumina Beauty"],
  ["Agency", "Northstar Social"],
  ["Creator", "Maya Chen"],
  ["Budget", "$260,000"],
  ["Deliverables", "3 reels, 1 carousel, usage pack"],
  ["Deadline", "Final assets due May 21"],
  ["Payment terms", "50% deposit, Net 30 balance"],
  ["Usage rights", "60-day paid social, renewal option"],
  ["Contract", "Signed"],
  ["Approval", "First cut in progress"]
];

const storyboard = [
  {
    frame: "01",
    scene: "Creator opens with a close-up of product texture against a clean bathroom counter.",
    shot: "Macro close-up",
    action: "Maya applies one drop and pauses before blending.",
    script: "If your skin barrier feels stressed, start with texture, not hype.",
    styling: "Soft daylight, white towel, serum bottle, minimal jewelry.",
    edit: "Slow push-in, subtle product label hold, no heavy transitions.",
    format: "9:16 reel opening"
  },
  {
    frame: "02",
    scene: "Creator explains barrier repair in one simple visual metaphor.",
    shot: "Medium talking head",
    action: "Maya gestures to a simple skin-layer prop card.",
    script: "Think of your barrier as the part that keeps the good in and the irritation out.",
    styling: "Neutral top, soft sage background card.",
    edit: "Add clean caption keywords: barrier, hydration, calm.",
    format: "Education segment"
  },
  {
    frame: "03",
    scene: "Routine integration shows serum between cleanser and moisturizer.",
    shot: "Top-down routine layout",
    action: "Hands place products in order and remove clutter.",
    script: "Use it after cleansing, before moisturizer, and keep the rest simple.",
    styling: "Three-product layout, no competing brands visible.",
    edit: "Quick cuts synced to gentle UI clicks.",
    format: "Usage demonstration"
  },
  {
    frame: "04",
    scene: "Creator closes with transparent usage claim and CTA.",
    shot: "Medium close",
    action: "Maya holds product and points to pinned caption.",
    script: "I would use this when my routine needs to feel calmer and more consistent.",
    styling: "Product centered, clean CTA overlay.",
    edit: "End card with campaign hashtag and disclosure.",
    format: "Final CTA"
  }
];

export default function AIManagerChatStudioPage() {
  return (
    <main className="chatStudioPage">
      <header className="chatStudioHero reveal">
        <div>
          <p className="appleEyebrow">AI Manager Chat Studio</p>
          <h1>Strategic advice for creator business, with humans in control.</h1>
          <p>
            Ask campaign, creative, negotiation, workflow, and reporting questions. Mock AI only.
            The assistant advises and structures options; it does not auto-send, approve, or commit terms.
          </p>
        </div>
      </header>

      <section className="chatStudioLayout reveal">
        <aside className="campaignContextPanel">
          <div className="systemPanelTitle">
            <h2>Campaign context</h2>
            <FileText size={18} />
          </div>
          <div className="contextRows">
            {context.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </aside>

        <section className="chatPanel">
          <div className="roleSelector" aria-label="Role selector">
            {roles.map((role, index) => (
              <button className={index === 0 ? "active" : ""} type="button" key={role}>
                {role}
              </button>
            ))}
          </div>

          <div className="suggestedPrompts">
            {prompts.map((prompt) => (
              <button type="button" key={prompt}>{prompt}</button>
            ))}
          </div>

          <div className="conversationHistory">
            <article className="chatBubble user">
              <span>Creator</span>
              <p>Can you help me turn the Lumina brief into a strong concept while protecting my usage rights?</p>
            </article>
            <article className="chatBubble ai">
              <span><Bot size={16} /> AI Manager</span>
              <p>
                Yes. I would separate the work into three tracks: creative concept, rights and fee protection,
                and delivery workflow. Keep the concept educational, limit paid usage to the approved 60-day
                window, and make the usage renewal a separate approval before the campaign closes.
              </p>
              <div className="aiResponseCards">
                <div><Lightbulb size={16} /><strong>Creative angle</strong><p>Barrier repair as a calm routine reset.</p></div>
                <div><CircleDollarSign size={16} /><strong>Negotiation</strong><p>Usage renewal should trigger a new fee.</p></div>
                <div><ShieldAlert size={16} /><strong>Risk</strong><p>Do not broaden whitelisting language without manager approval.</p></div>
              </div>
              <div className="aiSaveActions">
                <button type="button">Save to campaign</button>
                <button type="button">Export as PDF placeholder</button>
                <button type="button">Send to manager placeholder</button>
                <button type="button">Add to deliverables placeholder</button>
              </div>
            </article>
          </div>

          <form className="chatComposer">
            <input placeholder="Ask the AI Manager about strategy, creative, negotiation, or workflow..." />
            <button type="button">
              <Send size={18} />
            </button>
          </form>
        </section>
      </section>

      <section className="creativeToolsPanel reveal">
        <div className="systemPanelTitle">
          <h2>Creative vision tools</h2>
          <Sparkles size={18} />
        </div>
        <div className="creativeActionGrid">
          {quickActions.map((action) => (
            <button type="button" key={action}>
              <PenLine size={16} />
              {action}
            </button>
          ))}
        </div>
      </section>

      <section className="storyboardPanel reveal">
        <div className="systemPanelTitle">
          <h2>Storyboard generator output</h2>
          <Brain size={18} />
        </div>
        <div className="storyboardGrid">
          {storyboard.map((frame) => (
            <article key={frame.frame}>
              <div className="storyboardFrameNumber">{frame.frame}</div>
              <h3>{frame.scene}</h3>
              <dl>
                <div><dt>Shot type</dt><dd>{frame.shot}</dd></div>
                <div><dt>Talent action</dt><dd>{frame.action}</dd></div>
                <div><dt>Voiceover/script</dt><dd>{frame.script}</dd></div>
                <div><dt>Props/styling</dt><dd>{frame.styling}</dd></div>
                <div><dt>Editing direction</dt><dd>{frame.edit}</dd></div>
                <div><dt>Deliverable format</dt><dd>{frame.format}</dd></div>
              </dl>
              <div className="aiSaveActions">
                <button type="button">Save to campaign</button>
                <button type="button">Add to deliverables</button>
                <button type="button">Export PDF</button>
              </div>
            </article>
          ))}
        </div>
        <div className="humanControlNotice">
          <BadgeCheck size={18} />
          AI outputs are drafts. A human must confirm messages, approvals, contracts, and payment terms.
          <ArrowRight size={18} />
        </div>
      </section>
    </main>
  );
}
