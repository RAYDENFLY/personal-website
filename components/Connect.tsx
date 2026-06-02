import { socialLinks } from "@/lib/content";
import { renderIcon } from "@/lib/icons";

export function Connect() {
  return (
    <section className="connect" id="connect">
      <span className="section-label reveal">{"\u2726"} Connect With Me</span>
      <h2 className="section-title reveal">
        Yuk, <span>Terhubung!</span>
      </h2>
      <p className="section-text reveal">
        Mau kolaborasi, diskusi project, atau sekadar say hi? Pintu digitalku
        selalu terbuka.
      </p>
      <div className="connect-links reveal">
        {socialLinks.map((link) => (
          <a href={link.href} className="social-btn" key={link.label}>
            <span className="social-icon" aria-hidden="true">
              {renderIcon(link.icon)}
            </span>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
