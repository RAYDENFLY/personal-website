'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import Image from 'next/image';
import photoray from '@/assets/images/photoray.png';

const faqs = [
  {
    question: 'Kenapa sering diam?',
    answer:
      'Biasanya lagi mikir sesuatu, lagi fokus, atau cuma menikmati suasana. Aku memang lebih suka mengamati daripada banyak bicara.',
  },
  {
    question: 'Kenapa suka teknologi?',
    answer:
      'Karena selalu ada hal baru yang bisa dipelajari. Semakin dalam dicari tahu, semakin banyak hal menarik yang ditemukan.',
  },
  {
    question: 'Kenapa pengen punya Mazda RX-7?',
    answer:
      'Karena RX-7 itu cantik. Dari desain, suara rotary engine, sampai aura mobilnya. Susah dijelaskan, pokoknya suka.',
  },
  {
    question: 'Lagi denger lagu apa sekarang?',
    answer:
      'Kemungkinan besar hip-hop. Rizki Inrahim, Fury+, Crawla, atau playlist random yang muncul jam 2 pagi.',
  },
  {
    question: 'Kenapa website ini dibuat?',
    answer:
      'Karena kadang lebih mudah mengenal seseorang dari hal-hal yang dia sukai daripada dari CV atau portofolio.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="faq"
      style={{
        background: 'var(--white)',
        padding: '6rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '5rem',
      }}
    >
      {/* ── LEFT COLUMN: heading + FAQ list ── */}
      <div>
        <h2 className="sr-only">FAQ — Pertanyaan Tentang Saya</h2>

        <div className="section-heading reveal">
          <span className="section-label">✦ FAQ</span>
          <h2 className="section-title">
            Tentang <span>Saya</span>
          </h2>
          <p className="section-text">
            Beberapa pertanyaan yang sering ditanyakan (atau mungkin kamu ingin tahu).
          </p>
        </div>

        {/* FAQ accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2.5rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;

            // Background: open → pale pink, hovered → very light pink, default → white
            const itemBg = isOpen
              ? 'rgba(226,138,149,0.08)'
              : isHovered
              ? 'rgba(226,138,149,0.05)'
              : '#fff';

            const itemBorder = isOpen || isHovered
              ? 'rgba(226,138,149,0.35)'
              : 'rgba(226,138,149,0.2)';

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: itemBg,
                  border: `0.5px solid ${itemBorder}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
              >
                {/* Trigger */}
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    flex: 1,
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: isOpen ? '#c96b79' : isHovered ? '#e28a95' : 'var(--dark)',
                    transition: 'color 0.2s',
                    lineHeight: 1.4,
                  }}>
                    {faq.question}
                  </span>

                  <span style={{
                    width: '22px',
                    height: '22px',
                    minWidth: '22px',
                    borderRadius: '50%',
                    background: isOpen
                      ? 'rgba(226,138,149,0.3)'
                      : isHovered
                      ? 'rgba(226,138,149,0.18)'
                      : 'rgba(226,138,149,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}>
                    <LuPlus
                      aria-hidden="true"
                      style={{
                        color: '#e28a95',
                        width: '14px',
                        height: '14px',
                        display: 'block',
                        flexShrink: 0,
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '300px' : '0',
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 0.32s ease, opacity 0.25s ease',
                }}>
                  <div style={{
                    padding: '12px 18px 16px',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '13.5px',
                    color: 'var(--gray)',
                    lineHeight: 1.65,
                    borderTop: '0.5px solid rgba(226,138,149,0.15)',
                  }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT COLUMN: photo ── */}
      <div className="hero-image-wrap" style={{ marginTop: '6rem' }}>
        <div className="hero-image-frame">
          {/* Override the global 420px height so the image extends further down */}
          <Image
            src={photoray}
            alt="Foto Ray"
            style={{ height: '420px', width: '100%', objectFit: 'cover', display: 'block', objectPosition: 'top' }}
          />
        </div>
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
      </div>
    </div>
  );
}
