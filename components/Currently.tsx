import type { ReactNode } from "react";
import { currentlyItems } from "@/lib/content";

type CurrentlyProps = {
  children?: ReactNode;
};

export function Currently({ children }: CurrentlyProps) {
  return (
    <section className="currently mb-24" id="currently">
      <div className="reveal">
        <span className="section-label">{"\u2726"} Currently</span>
        <h2 className="section-title">
          Apa yang
          <br />
          <span>Sedang Aku Lakukan</span>
        </h2>
        <p className="section-text">
          Hal-hal yang lagi aku geluti dan kerjain sekarang, dari belajar
          teknologi baru sampai nonton anime baru.
        </p>
        <br />
        {children}
      </div>
      <div className="currently-stack reveal">
        <ul className="currently-list">
          {currentlyItems.map((item) => (
            <li key={`${item.tag}-${item.text}`}>
              <span className="tag">{item.tag}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
