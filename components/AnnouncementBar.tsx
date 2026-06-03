"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isClosed = localStorage.getItem("announcement-closed");
    if (isClosed === "true") {
      setIsVisible(false);
      document.documentElement.style.setProperty("--announcement-height", "0px");
    } else {
      document.documentElement.style.setProperty("--announcement-height", "38px");
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-closed", "true");
    document.documentElement.style.setProperty("--announcement-height", "0px");
  };

  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span>📢 Website sedang dalam perbaikan, mungkin beberapa fitur belum stabil dan kata-kata terasa AI.</span>
      </div>
      <button 
        onClick={handleClose}
        className="announcement-close"
        aria-label="Tutup pengumuman"
      >
        <X size={14} />
      </button>
    </div>
  );
}
