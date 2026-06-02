import { interests } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Interests() {
  return (
    <section className="interest" id="interest">
      <SectionHeading
        align="center"
        label={`${"\u2726"} Interest`}
        title={
          <>
            Hal yang Aku <span>Sukai</span>
          </>
        }
      />
      <div className="interest-grid">
        {interests.map((item) => (
          <article className="interest-card reveal" key={item.title}>
            <div className="interest-icon" aria-hidden="true">
              {item.icon}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
