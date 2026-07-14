import Link from "next/link";
import { ArrowLeft, Eye, FileText, Hash, Link2, Users } from "lucide-react";
import { aiReports } from "@/lib/mockAI";

export default function AIReportsPage() {
  return (
    <main className="aiPage narrow">
      <header className="aiSubHeader reveal">
        <Link className="textLink" href="/dashboard/ai-manager">
          <ArrowLeft size={16} />
          AI Manager
        </Link>
        <p className="appleEyebrow">Campaign Insights Reports</p>
        <h1>End-of-campaign reporting, drafted by AI.</h1>
      </header>

      <section className="aiReportList reveal">
        {aiReports.map((report) => (
          <article className="aiReport" key={report.id}>
            <div className="aiPanelTitle">
              <div>
                <span>{report.campaign}</span>
                <h2>{report.headline}</h2>
              </div>
              <FileText size={20} />
            </div>
            <div className="aiReportMetrics">
              {Object.entries(report.metrics).map(([label, value]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <p>{label}</p>
                </div>
              ))}
            </div>
            <p>{report.summary}</p>
            <small>{report.nextAction}</small>

            <div className="reportDetailGrid">
              <section>
                <div className="aiPanelTitle">
                  <h3>Gender breakdown</h3>
                  <Users size={18} />
                </div>
                <div className="audienceBreakdown">
                  {report.audienceGender.map((item) => (
                    <div key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}%</strong>
                      <i style={{ width: `${item.value}%` }} />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="aiPanelTitle">
                  <h3>Age groups</h3>
                  <Users size={18} />
                </div>
                <div className="audienceBreakdown age">
                  {report.audienceAge.map((item) => (
                    <div key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}%</strong>
                      <i style={{ width: `${item.value}%` }} />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="livePostTracker">
              <div className="aiPanelTitle">
                <div>
                  <span>{report.liveTracking.status}</span>
                  <h3>Live post tracking</h3>
                </div>
                <Eye size={18} />
              </div>
              <p>
                Once creators link their social accounts, ConstellaX can track live posts that
                include approved campaign hashtags. This is mock tracking only.
              </p>
              <div className="liveTrackingMeta">
                <div>
                  <Link2 size={16} />
                  {report.liveTracking.linkedAccounts.join(" / ")}
                </div>
                <div>
                  <Hash size={16} />
                  {report.liveTracking.hashtags.join("  ")}
                </div>
                <div>Last sync: {report.liveTracking.lastSync}</div>
              </div>
              <div className="livePostRows">
                {report.liveTracking.posts.map((post) => (
                  <article key={`${report.id}-${post.platform}`}>
                    <div>
                      <strong>{post.platform}</strong>
                      <p>{post.url}</p>
                    </div>
                    <span>{post.views} views</span>
                    <span>{post.er} ER</span>
                    <span>{post.status}</span>
                  </article>
                ))}
              </div>
            </section>
          </article>
        ))}
      </section>
    </main>
  );
}
