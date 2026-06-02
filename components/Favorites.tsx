import { favorites } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Favorites() {
  return (
    <section className="favorites" id="favorites">
      <SectionHeading
        align="center"
        label={`${"\u2726"} My Favorites`}
        title={
          <>
            Favorit<span>-ku</span>
          </>
        }
      />
      <div className="fav-grid">
        {favorites.map((item) => (
          <article className="fav-card reveal" key={item.title}>
            <span className="fav-emoji" aria-hidden="true">
              {item.icon}
            </span>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
