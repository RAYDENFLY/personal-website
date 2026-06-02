import type { ReactNode } from "react";

type SectionHeadingProps = {
  align?: "left" | "center";
  label: string;
  title: ReactNode;
  text?: string;
};

export function SectionHeading({
  align = "left",
  label,
  title,
  text
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading-${align} reveal`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {text ? <p className="section-text">{text}</p> : null}
    </div>
  );
}
