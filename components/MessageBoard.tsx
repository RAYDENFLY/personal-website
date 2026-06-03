"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";

type Message = {
  id?: string;
  timestamp: string;
  name: string;
  message: string;
  type?: string;
  answer?: string; // Balasan dari Ray (ditambah manual di MongoDB Atlas)
};

export function MessageBoard() {
  const [activeTab, setActiveTab] = useState<"qna" | "pendapat">("qna");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchMessages = async (type: "qna" | "pendapat") => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/messages?type=${type}`);
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setMessages(data.data);
      } else {
        setMessages([]);
      }
    } catch (e) {
      console.error(e);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(activeTab);
  }, [activeTab]);

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          name: name.trim() || "Anonim",
          message: text,
        }),
      });
      if (res.ok) {
        setText("");
        setName("");
        setSuccessMsg("Pesan berhasil dikirim! 🎉");
        fetchMessages(activeTab);
        setTimeout(() => {
          setSuccessMsg("");
          setIsModalOpen(false);
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (isoStr: string) => {
    if (!isoStr) return "";
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <>
      {/* ─── Main Section ─── */}
      <div
        id="messages"
        style={{
          background: "var(--white)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionHeading
            align="center"
            label="✦ Sampaikan Pesan"
            title={
              <>
                Ruang <span>Interaksi</span>
              </>
            }
            text="Tinggalkan jejak, opini, atau tanyakan apapun secara anonim. Semua tersimpan dengan aman."
          />

          {/* Tab + CTA Row */}
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {/* Tabs */}
            <div
              style={{
                display: "flex",
                padding: "4px",
                background: "var(--pink-pale)",
                borderRadius: "9999px",
                border: "1px solid var(--border-pink)",
              }}
            >
              {(["qna", "pendapat"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSuccessMsg("");
                  }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    background: activeTab === tab ? "var(--pink)" : "transparent",
                    color: activeTab === tab ? "#fff" : "var(--gray)",
                    boxShadow: activeTab === tab ? "0 4px 12px rgba(226,138,149,0.35)" : "none",
                  }}
                >
                  {tab === "qna" ? "Tanya (QnA)" : "Pendapat Ttg Saya"}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: "10px 22px",
                background: "var(--pink)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(226,138,149,0.35)",
                transition: "all 0.25s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(226,138,149,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(226,138,149,0.35)";
              }}
            >
              <span>✏️</span>
              Kirim {activeTab === "qna" ? "Pertanyaan" : "Pendapat"}
            </button>
          </div>

          {/* Messages Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--dark)",
              }}
            >
              Riwayat {activeTab === "qna" ? "QnA" : "Pendapat"}
            </h3>
            {isLoading && (
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid var(--pink)",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                }}
              />
            )}
          </div>

          {/* Message Grid */}
          {messages.length === 0 && !isLoading ? (
            <div
              style={{
                padding: "4rem 2rem",
                textAlign: "center",
                color: "var(--gray)",
                background: "var(--pink-pale)",
                borderRadius: "16px",
                border: "1.5px dashed var(--pink-light)",
                fontSize: "14px",
              }}
            >
              Belum ada {activeTab === "qna" ? "pertanyaan" : "pendapat"} yang masuk. Jadi yang pertama ya!
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: "1rem",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={msg.id || i}
                  style={{
                    background: "#fff",
                    padding: "1.25rem",
                    borderRadius: "16px",
                    border: "1px solid var(--border-pink)",
                    transition: "all 0.3s",
                    animation: `fadeUp 0.4s ease forwards ${i * 0.05}s`,
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(226,138,149,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Message content */}
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--dark)",
                      marginBottom: "0.75rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    &ldquo;{msg.message}&rdquo;
                  </p>

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--gray)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "var(--pink-light)",
                          display: "inline-block",
                        }}
                      />
                      {msg.name}
                    </span>
                    <span>{formatDate(msg.timestamp)}</span>
                  </div>

                  {/* ─── Reply section ─── */}
                  {msg.answer && (
                    <div
                      style={{
                        marginTop: "1rem",
                        marginLeft: "0.5rem",
                        padding: "0.75rem 1rem",
                        background: "var(--pink-ultra)",
                        borderLeft: "3px solid var(--pink)",
                        borderRadius: "0 12px 12px 0",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "var(--pink-dark)",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        ↩ Balasan Ray
                      </p>
                      <p
                        style={{
                          fontSize: "13.5px",
                          lineHeight: 1.65,
                          color: "var(--dark)",
                        }}
                      >
                        {msg.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Modal Popup ─── */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,26,26,0.5)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "2rem",
              width: "100%",
              maxWidth: "460px",
              boxShadow: "0 24px 64px rgba(226,138,149,0.25)",
              position: "relative",
              animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid var(--border-pink)",
                background: "var(--pink-pale)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "var(--gray)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--pink)";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--pink-pale)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--gray)";
              }}
            >
              ✕
            </button>

            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--dark)",
                marginBottom: "4px",
              }}
            >
              Kirim {activeTab === "qna" ? "Pertanyaan" : "Pendapatmu"}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--gray)", marginBottom: "1.5rem" }}>
              {activeTab === "qna"
                ? "Tanyain apa aja, aku baca semuanya."
                : "Kesan atau pesanmu tentang aku, bebas & anonim."}
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--gray)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Nama (Opsional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Biarkan kosong jika anonim"
                  style={{
                    padding: "12px 16px",
                    border: "1.5px solid var(--border-pink)",
                    borderRadius: "12px",
                    outline: "none",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                    background: "var(--pink-ultra)",
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--pink)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border-pink)"; }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--gray)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {activeTab === "qna" ? "Pertanyaanmu" : "Pendapatmu"}
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  placeholder={
                    activeTab === "qna"
                      ? "Mau tanya apa nih?"
                      : "Kesan / pesan buat Ray..."
                  }
                  rows={5}
                  style={{
                    padding: "12px 16px",
                    border: "1.5px solid var(--border-pink)",
                    borderRadius: "12px",
                    outline: "none",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    resize: "none",
                    transition: "border-color 0.2s",
                    background: "var(--pink-ultra)",
                  }}
                  onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--pink)"; }}
                  onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--border-pink)"; }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !text.trim()}
                style={{
                  padding: "14px",
                  background: isSubmitting || !text.trim() ? "var(--pink-light)" : "var(--pink)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: isSubmitting || !text.trim() ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 16px rgba(226,138,149,0.3)",
                  transition: "all 0.25s",
                }}
              >
                {isSubmitting ? "Mengirim..." : "Kirim Sekarang →"}
              </button>

              {successMsg && (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#4caf7d",
                    animation: "fadeUp 0.3s ease",
                  }}
                >
                  {successMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
