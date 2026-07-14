import { Sparkles } from "lucide-react";

export function AIRecommendationCard({
  title,
  detail,
  score
}: {
  title: string;
  detail: string;
  score: number;
}) {
  return (
    <article className="aiRecommendationCard">
      <Sparkles size={18} />
      <div>
        <h3>{title}</h3>
        <p>{detail}</p>
      </div>
      <strong>{score}</strong>
    </article>
  );
}
