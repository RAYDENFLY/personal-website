import Image from "next/image";
import heroImage from "@/assets/images/yuigahama.png";

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-badge">{"\u2726"} D3 Teknik Komputer & Developer</span>
        <h1 className="hero-title">
          Halo, Aku
          <br />
          <span>Ray</span>
        </h1>
        <p className="hero-desc">
          Mahasiswa yang sedang berjuang dengan tugas akhir sambil ngulik teknologi. Suka musik, coding, racing games, dan kepikiran hal random di jam-jam yang tidak masuk akal.
        </p>
        <a href="#about" className="btn-primary">
          Lihat Karyaku
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="hero-image-wrap">
        <div className="hero-image-frame">
          <Image
            src={heroImage}
            alt="Raydenfly"
            priority
          />
        </div>
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
      </div>
    </section>
  );
}
