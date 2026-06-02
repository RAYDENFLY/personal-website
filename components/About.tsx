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
          Nama lengkapku Azis Maulana Suhada, tapi panggil aja Ray. Aku mahasiswa D3 Teknik Komputer yang sedang menyelesaikan sidang tugas akhir sambil ngerjain beberapa project freelance.
        </p>
        <p className="section-text section-text-spaced">
          Kadang aku bisa diam seharian, kadang malah jadi orang paling berisik kalau topiknya cocok. Aku suka teknologi, suka ngulik hal-hal yang bikin penasaran, dan sering kepikiran hal random yang akhirnya bikin buka 20 tab browser cuma buat cari tahu satu hal kecil.
        </p>
        <p className="section-text section-text-spaced">
          Sebagian besar waktuku dihabiskan di depan layar—coding, nyoba teknologi baru, baca sesuatu yang menarik, main game, atau sekadar dengerin lagu sambil bengong mikirin hidup.
        </p>
      </div>
    </section>
  );
}
