"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "./SectionHeading";

type ProjectStatus = "LIVE" | "BETA" | "RESEARCH" | "PRIVATE" | "OPEN SOURCE";

const STATUS_STYLES: Record<ProjectStatus, { bg: string; text: string; dot: string }> = {
    LIVE: { bg: "rgba(34, 197, 94, 0.12)", text: "#16a34a", dot: "#22c55e" },
    BETA: { bg: "rgba(251, 146, 60, 0.12)", text: "#ea580c", dot: "#fb923c" },
    RESEARCH: { bg: "rgba(147, 51, 234, 0.12)", text: "#9333ea", dot: "#a855f7" },
    PRIVATE: { bg: "rgba(107, 114, 128, 0.12)", text: "#6b7280", dot: "#9ca3af" },
    "OPEN SOURCE": { bg: "rgba(59, 130, 246, 0.12)", text: "#2563eb", dot: "#60a5fa" },
};

type Project = {
    id: string;
    title: string;
    description: string;
    status: ProjectStatus;
    tech: string[];
    github?: string;
    website?: string;
    image?: string;
};

const PROJECTS: Project[] = [
    {
        id: "astel-research",
        title: "Astel Research",
        description:
            "An autonomous AI trading system combining ML, LLM reasoning, and self-reflection to execute trading decisions on Gate.io Futures.",
        status: "BETA",
        tech: ["Python", "FastAPI", "PostgreSQL", "Next.js", "TensorFlow", "Docker"],
        github: "https://github.com/RAYDENFLY/Astel",
        image: "/assets/images/projects/screenshot/astetextbgblack.png",
    },
    {
        id: "quantum-terminal",
        title: "Quantum Terminal",
        description:
            "Professional crypto market intelligence dashboard inspired by Bloomberg Terminal with real-time data and analytics.",
        status: "LIVE",
        tech: ["React", "Next.js", "TailwindCSS", "CoinGecko API", "MongoDB"],
        website: "https://quantumterminal.vercel.app/",
        github: "https://github.com/RAYDENFLY/quantumterminal",
        image: "/assets/images/projects/screenshot/quantum.png",
    },
    {
        id: "melon-irrigation",
        title: "Melon Smart Irrigation",
        description:
            "ESP32-based automatic irrigation system with a real-time monitoring dashboard for smart agriculture.",
        status: "RESEARCH",
        tech: ["ESP32", "Arduino", "C++"],
        github: "https://github.com/RAYDENFLY/sistem-penyiraman-otomatis-melon-esp32",
        image: "/assets/images/projects/penyiramanmelon.png",
    },
    {
        id: "arteria-online",
        title: "Arteria Online",
        description:
            "A chat MMORPG MVP with realtime combat, quests, guilds, and parties — all powered by WebSocket.",
        status: "OPEN SOURCE",
        tech: ["TypeScript", "Node.js", "WebSocket", "MongoDB"],
        github: "https://github.com/RAYDENFLY/Arteria-Online-MMORPG",
        image: "/assets/images/projects/arteria.png",
    },
    {
        id: "quiz-merdeka",
        title: "Quiz Merdeka",
        description:
            "Interactive quiz platform with FastAPI backend, AI-powered features, and Mailry email integration.",
        status: "OPEN SOURCE",
        tech: ["Next.js", "TailwindCSS", "FastAPI", "MongoDB", "React"],
        github: "https://github.com/RAYDENFLY/quiz-merdeka",
        image: "/assets/images/projects/quizmerdeka.png",
    },
];

/* ─── Status Badge ─────────────────────────────────────────────── */
function StatusBadge({ status }: { status: ProjectStatus }) {
    const s = STATUS_STYLES[status];
    return (
        <span className="pj-badge" style={{ background: s.bg, color: s.text }}>
            <span className="pj-badge-dot" style={{ background: s.dot }} />
            {status}
        </span>
    );
}

/* ─── Tech Pill ────────────────────────────────────────────────── */
function TechPill({ label }: { label: string }) {
    return <span className="pj-pill">{label}</span>;
}

/* ─── Icons ────────────────────────────────────────────────────── */
function GithubIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M7 7h10v10" />
        </svg>
    );
}

/* ─── Project Card (uniform for all) ──────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <article
            className="pj-card reveal group"
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            {/* Screenshot */}
            <div className="pj-card-img-wrap">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="pj-card-img"
                    />
                ) : (
                    <div className="pj-card-img-placeholder">
                        <span>{project.title}</span>
                    </div>
                )}
                <div className="pj-card-img-overlay" />
            </div>

            {/* Body */}
            <div className="pj-card-body">
                <StatusBadge status={project.status} />
                <h3 className="pj-card-title">{project.title}</h3>
                <p className="pj-card-desc">{project.description}</p>

                <div className="pj-card-pills">
                    {project.tech.slice(0, 3).map((t) => (
                        <TechPill key={t} label={t} />
                    ))}
                    {project.tech.length > 3 && (
                        <span className="pj-pill pj-pill-more">+{project.tech.length - 3}</span>
                    )}
                </div>

                <div className="pj-card-actions">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pj-btn pj-btn-ghost"
                        >
                            <GithubIcon />
                            GitHub
                        </a>
                    )}
                    {project.website && (
                        <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pj-btn pj-btn-primary"
                        >
                            Demo
                            <ArrowIcon />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

/* ─── Section ──────────────────────────────────────────────────── */
export function Projects() {
    const rowRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
        );

        section.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="pj-section" id="projects" ref={sectionRef}>
            <div className="pj-bg-blob" aria-hidden="true" />

            <div className="pj-heading-wrap">
                <SectionHeading
                    align="center"
                    label="✦ Featured Projects"
                    title={
                        <>
                            My <span>Projects</span>
                        </>
                    }
                />
            </div>

            {/* Single horizontal row — scrollable on smaller screens */}
            <div className="pj-row-outer">
                <div className="pj-row" ref={rowRef}>
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}