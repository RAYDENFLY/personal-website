import Image from "next/image";

export function Footer() {
  return (
    <footer>
      <Image
        src="/assets/images/logo-white.png"
        alt="Raydenfly"
        width={130}
        height={130}
        style={{ width: "auto", height: "auto" }}
      />
      <p className="footer-tagline">
        &quot;Just a person exploring creativity, technology, and life.&quot;
      </p>
      <p className="footer-copy">&copy; 2026 Raydenfly. All rights reserved.</p>
    </footer>
  );
}
