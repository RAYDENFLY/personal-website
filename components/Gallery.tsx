import { galleryItems } from "@/lib/content";
import { renderIcon } from "@/lib/icons";

export function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="reveal">
        <span className="section-label">{"\u2726"} Gallery / Moments</span>
        <h2 className="section-title">
          Momen & <span>Karya</span>
        </h2>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <article className="gallery-item reveal" key={item.label}>
            <div className="gallery-placeholder" aria-hidden="true">
              {renderIcon(item.icon)}
            </div>
            <div className="gallery-item-overlay">
              <span>{item.label}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
