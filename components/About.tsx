import Image from "next/image";

export function About() {
  return (
    <section className="about" id="about">
      <div className="about-image reveal">
        <div className="about-image-inner">
          <Image
            src="/assets/images/photoray.png"
            alt="Tentang Raydenfly"
            width={1615}
            height={903}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="about-accent" />
      </div>
      <div className="reveal">
        <span className="section-label">{"\u2726"} About Me</span>
        <h2 className="section-title">
          Sedikit
          <br />
          <span>Tentang Aku</span>
        </h2>
        <p className="section-text">
          Aku adalah seorang developer dan desainer yang percaya bahwa teknologi
          dan seni bisa berjalan beriringan. Aku suka membangun hal-hal yang
          tidak hanya fungsional, tapi juga indah secara visual.
        </p>
        <p className="section-text section-text-spaced">
          Di luar coding, aku sering tenggelam dalam dunia anime, musik lo-fi,
          dan secangkir kopi di malam hari. Hidup terlalu singkat untuk karya
          yang membosankan.
        </p>
      </div>
    </section>
  );
}
