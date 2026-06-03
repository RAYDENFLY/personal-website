import { navLinks } from "@/lib/content";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export function Navbar() {
  return (
    <nav className="site-nav" aria-label="Navigasi utama">
      <a href="#home" className="nav-logo">
        <Image 
          src={logo} 
          alt="Raydenfly" 
          priority 
          width={130}
          height={40}
          className="nav-logo-img"
          style={{ width: "auto", height: "auto", marginRight: "1rem" }}
        />
      </a>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
