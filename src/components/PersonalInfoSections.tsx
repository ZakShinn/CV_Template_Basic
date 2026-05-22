import { cv } from "@/data/cv";
import { Section } from "./Section";

type PersonalLabels = {
  motto: string;
  softSkills: string;
  interests: string;
  aspirations: string;
};

type PersonalInfoSectionsProps = {
  labels: PersonalLabels;
};

function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-[var(--color-border)] bg-white px-2 py-0.5 text-xs text-[var(--color-ink)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PersonalInfoSections({ labels }: PersonalInfoSectionsProps) {
  const { motto, softSkills, interests, aspirations } = cv.personalInfo;

  const hasMotto = motto.trim().length > 0;
  const hasSoftSkills = softSkills.length > 0;
  const hasInterests = interests.length > 0;
  const hasAspirations = aspirations.trim().length > 0;

  if (!hasMotto && !hasSoftSkills && !hasInterests && !hasAspirations) {
    return null;
  }

  return (
    <div className="space-y-10">
      {hasMotto && (
        <Section id="motto" title={labels.motto}>
          <blockquote className="border-l-2 border-[var(--color-accent)]/40 pl-3 text-sm italic leading-relaxed text-[var(--color-ink-muted)]">
            &ldquo;{motto}&rdquo;
          </blockquote>
        </Section>
      )}

      {hasSoftSkills && (
        <Section id="soft-skills" title={labels.softSkills}>
          <TagList items={softSkills} />
        </Section>
      )}

      {hasInterests && (
        <Section id="interests" title={labels.interests}>
          <TagList items={interests} />
        </Section>
      )}

      {hasAspirations && (
        <Section id="aspirations" title={labels.aspirations}>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{aspirations}</p>
        </Section>
      )}
    </div>
  );
}
