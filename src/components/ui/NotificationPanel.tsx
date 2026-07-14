import { Bell } from "lucide-react";

export function NotificationPanel({
  title,
  body,
  meta
}: {
  title: string;
  body: string;
  meta: string;
}) {
  return (
    <article className="notificationPanel">
      <Bell size={18} />
      <div>
        <span>{meta}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}
