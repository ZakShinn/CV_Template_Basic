import type { ContactLink } from "@/resume";

type IconProps = { className?: string };

export function IconEmail({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 6h16v12H4V6Z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6.5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15.5 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 4 8.5 2 2 0 0 1 6.5 4Z" />
    </svg>
  );
}

export function IconLocation({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 8.5h3v11h-3v-11ZM8 6.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM11 8.5h2.9v1.5h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v6.4h-3v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H11V8.5Z" />
    </svg>
  );
}

export function IconGitHub({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.31 6.84 9.65.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.12-1.5-1.12-1.5-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.02A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function IconWebsite({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10.9H8v3.1h2.3v8h3.2Z" />
    </svg>
  );
}

export function IconZalo({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.87 1.55 5.42 3.97 7.03L5 22l4.55-2.37c.78.11 1.58.17 2.45.17 5.52 0 10-3.82 10-8.5S17.52 2 12 2Zm-2.2 9.8h-2V8.6h2v3.2Zm4 0h-2V8.6h2v3.2Zm4 0h-2V8.6h2v3.2Z" />
    </svg>
  );
}

export function IconTelegram({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.95 4.57a1.2 1.2 0 0 0-1.22-.17L3.08 11.03c-1.15.47-1.14 1.1-.2 1.38l4.58 1.43 1.76 5.38c.22.64.4.88.8.88.3 0 .48-.1.74-.36l2.1-2.04 4.37 3.22c.8.44 1.38.21 1.58-.74l2.85-13.42c.26-1.05-.38-1.53-1.21-1.21ZM9.17 14.57l9.9-6.2c.48-.3.92-.14.56.19l-8.48 7.76-.32 3.24-1.66-5Z" />
    </svg>
  );
}

const contactIcons: Record<ContactLink["icon"], React.FC<IconProps>> = {
  email: IconEmail,
  phone: IconPhone,
  location: IconLocation,
  linkedin: IconLinkedIn,
  github: IconGitHub,
  website: IconWebsite,
  facebook: IconFacebook,
  zalo: IconZalo,
  telegram: IconTelegram,
};

export function ContactIcon({ type, className }: { type: ContactLink["icon"]; className?: string }) {
  const Icon = contactIcons[type];
  return <Icon className={className} />;
}
