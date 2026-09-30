import { site } from "@/data/site";

type SocialLinksProps = {
  className?: string;
  showLabels?: boolean;
};

const socialAccounts = [
  {
    name: "Facebook",
    label: "Facebook",
    url: site.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 22v-8h2.8l.4-3h-3.2V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.3v3h2.8v8h3.4Z"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    label: "@technovision343",
    url: site.social.tiktok,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M15.6 3c.3 2.2 1.6 3.6 3.9 3.8v3.1c-1.5 0-2.8-.4-3.9-1.2v6.2a6 6 0 1 1-5.2-5.9v3.2a2.9 2.9 0 1 0 2 2.7V3h3.2Z"
        />
      </svg>
    ),
  },
] as const;

export function SocialLinks({ className = "", showLabels = false }: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {socialAccounts.map(
        (account) =>
          account.url && (
            <a
              key={account.name}
              className="social-link"
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Techno Vision Group on ${account.name}${
                account.name === "TikTok" ? " (@technovision343)" : ""
              }`}
            >
              {account.icon}
              {showLabels && <span>{account.label}</span>}
            </a>
          ),
      )}
    </div>
  );
}
