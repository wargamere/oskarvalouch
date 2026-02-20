"use client";

import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Predikce akcií pomocí LLM",
    desc: "Experimentální projekt zkoumající schopnost velkých jazykových modelů předpovídat vývoj akciového trhu.",
    details: [
      "Testováno bez instrukcí, následně s napojením na Python API (50 akcií) a analýzou mediálních zpráv.",
      "Naučeno: základy akciového trhu, Google Sheets, limity AI.",
    ],
    conclusion: "LLM nejsou vhodné pro spolehlivou predikci, spíše pro interpretaci dat.",
    link: null,
  },
  {
    title: "Moje webová stránka",
    desc: "Osobní portfolio prezentující mé projekty, dovednosti a zkušenosti.",
    details: [
      "Hlavní web: wargamere.github.io/oskarvalouch",
      "Blog (WordPress): oskarvalouch.cz",
      "Naučeno: HTML, CSS, JavaScript, GitHub Pages, WordPress, budování osobní značky.",
    ],
    conclusion: null,
    link: "https://wargamere.github.io/oskarvalouch/",
  },
  {
    title: "MENACE (1961 Remake)",
    desc: "Fyzický model strojového učení pro hru piškvorky podle Donalda Michieho.",
    details: [
      "Krabičky se sirkami reprezentující stavy hry.",
      "Naučeno: základní principy posilovaného učení (Reinforcement Learning) bez počítače.",
    ],
    conclusion: null,
    link: null,
  },
  {
    title: "Python projekty",
    desc: "Sada menších aplikací pro procvičení programování.",
    details: [
      "Klon hry Wordle, učitel malé násobilky s využitím ChatGPT API.",
      "Naučeno: syntax Pythonu, práce s externími API, logika her.",
    ],
    conclusion: null,
    link: null,
  },
  {
    title: "Vibecoding",
    desc: "Experimenty s Google Antigravity a GitHubem.",
    details: [
      "Projekt: napodobenina hororové hry WTTG 3.",
      "Naučeno: rychlé prototypování (vibecoding), práce s verzovacími systémy.",
    ],
    conclusion: null,
    link: "https://wargamere.github.io/sigma/",
  },
];

const timeline = [
  { date: "2. 2. 2026", title: "Politická soutěž v NextZone", desc: "Účast na SSPŠ" },
  { date: "2025", title: "Kybersoutěž", desc: "3. místo (Junior, Praha)" },
  { date: "2025", title: "Bobřík informatiky", desc: "129 bodů (Kategorie Junior)" },
  { date: "2024–2025", title: "AI dětem", desc: "Brigáda – testování AI aplikací, správa počítačů a technická podpora." },
  { date: "2024", title: "SCIO OSP", desc: "3. místo v Praze" },
  { date: "2018–2025", title: "Vzdělávací akce", desc: "Minecraft tábory, AI a robotika kroužky, letní školy a workshopy (SSPŠ, UŠI kemp)." },
  { date: "2019", title: "Future Factory", desc: "1. místo" },
];

const skills = [
  {
    category: "Technické",
    items: ["Prompting (LLM)", "Vibe Coding", "3D modelování", "Pájení", "Základy sítí"],
  },
  {
    category: "Software",
    items: ["Linux nástroje", "Antigravity", "ChatGPT / OpenAI API", "GitHub / Git"],
  },
  {
    category: "Programování",
    items: ["Python", "HTML & CSS"],
  },
  {
    category: "Jazyky",
    items: ["Čeština (rodilý mluvčí)", "Angličtina"],
  },
];

const interests = [
  { emoji: "🏎️", label: "Formule 1" },
  { emoji: "🧗", label: "Lezení" },
  { emoji: "🏛️", label: "Politika" },
  { emoji: "⚽", label: "Sport" },
  { emoji: "🚀", label: "Nové technologie" },
];

const selfStudy = [
  { title: "Elements of AI", desc: "Dokončený kurz základů umělé inteligence." },
  {
    title: "Kyberbezpečnost",
    desc: "Vlastní studijní plán generovaný ChatGPT.",
  },
  {
    title: "CCC 39 (Hamburk, 2025)",
    desc: "Sledování přednášek z Chaos Communication Congress.",
    link: "https://media.ccc.de/c/39c3",
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PortfolioContent() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    console.log("Theme toggled to:", next);
  };

  const isDark = theme === "dark";

  return (
    <div
      data-theme={theme}
      className="portfolio-body"
      style={{ fontFamily: "var(--font-syne), system-ui, sans-serif" }}
    >
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--p-header-bg)",
          borderBottom: "1px solid var(--p-border)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img
              src="https://oskarvalouch.cz/wp-content/uploads/2025/10/logo-2.png"
              alt="Oskar Valouch"
              style={{ height: 36, width: "auto" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--p-text)",
                letterSpacing: "-0.02em",
              }}
            >
              Oskar Valouch
            </span>
          </a>

          {/* Nav + Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {["Projekty", "Timeline", "Skills", "Kontakt"].map((label, i) => {
              const anchors: Record<string, string> = {
                Projekty: "#projects",
                Timeline: "#timeline-section",
                Skills: "#skills",
                Kontakt: "#contact",
              };
              return (
                <a
                  key={label}
                  href={anchors[label]}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--p-muted)",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    transition: "color 0.2s, background 0.2s",
                    display: "none",
                  }}
                  className="nav-link"
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "var(--p-accent)";
                    (e.target as HTMLElement).style.background = "var(--p-accent-glow)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "var(--p-muted)";
                    (e.target as HTMLElement).style.background = "transparent";
                  }}
                >
                  {label}
                </a>
              );
            })}

            <button
              onClick={toggleTheme}
              aria-label="Přepnout téma"
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-border)",
                color: "var(--p-text)",
                cursor: "pointer",
                padding: "8px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, border-color 0.2s",
                marginLeft: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--p-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--p-border)";
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* Nav bar (desktop) — hidden on mobile via inline, shown below with media */}
        <style>{`
          @media (min-width: 640px) {
            .nav-link { display: inline-flex !important; }
          }
        `}</style>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="hero-grid"
        style={{
          padding: "100px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(2,132,199,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          {/* Mono tag */}
          <div
            className="animate-fade-in"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.8rem",
              color: "var(--p-accent)",
              marginBottom: 20,
              letterSpacing: "0.1em",
            }}
          >
            {">"} student · kyberbezpečnost · AI · Python
          </div>

          {/* Name */}
          <h1
            className="animate-fade-in-up delay-100"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: 16,
              color: "var(--p-text)",
            }}
          >
            Oskar Valouch
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-in-up delay-200"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--p-accent)",
              fontSize: "1rem",
              marginBottom: 24,
              letterSpacing: "0.02em",
            }}
          >
            Student se zájmem o kyberbezpečnost, Python a AI
          </p>

          {/* Intro */}
          <p
            className="animate-fade-in-up delay-300"
            style={{
              color: "var(--p-muted)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 40px auto",
            }}
          >
            Nadšenec do informačních technologií s hlavním zaměřením na kybernetickou
            bezpečnost a umělou inteligenci. Baví mě zkoumat limity moderních AI modelů,
            programovat v Pythonu a tvořit webové projekty. Neustále se vzdělávám a hledám
            nové výzvy ve světě IT.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-in-up delay-400"
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "var(--p-accent)",
                color: isDark ? "#000" : "#fff",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Projekty
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "transparent",
                color: "var(--p-text)",
                border: "1.5px solid var(--p-border)",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--p-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--p-accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--p-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--p-text)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Kontakt
            </a>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <Section id="projects" title="Projekty">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {projects.map((p) => (
            <article
              key={p.title}
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-border)",
                borderRadius: 12,
                padding: 24,
                transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = "var(--p-accent)";
                el.style.boxShadow = `0 12px 32px var(--p-accent-glow)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "var(--p-border)";
                el.style.boxShadow = "none";
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--p-text)",
                  letterSpacing: "-0.02em",
                }}
              >
                {p.title}
              </h3>
              <p style={{ color: "var(--p-muted)", fontSize: "0.9rem", fontStyle: "italic" }}>
                {p.desc}
              </p>
              <div style={{ fontSize: "0.88rem", color: "var(--p-muted)", flex: 1 }}>
                {p.details.map((d, i) => (
                  <p key={i} style={{ marginBottom: 6 }}>
                    {d}
                  </p>
                ))}
              </div>
              {p.conclusion && (
                <p
                  style={{
                    fontSize: "0.88rem",
                    borderTop: "1px solid var(--p-border)",
                    paddingTop: 10,
                    color: "var(--p-muted)",
                  }}
                >
                  <strong style={{ color: "var(--p-text)" }}>Závěr:</strong> {p.conclusion}
                </p>
              )}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--p-accent)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    marginTop: 4,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Zobrazit projekt <ExternalLinkIcon />
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* ── TIMELINE ────────────────────────────────────────────────────── */}
      <Section id="timeline-section" title="Cesta & Úspěchy">
        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 8,
              bottom: 8,
              width: 2,
              background: `linear-gradient(to bottom, var(--p-accent), var(--p-border))`,
              borderRadius: 2,
            }}
          />
          {timeline.map((item, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 32 }}>
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: -28,
                  top: 4,
                  width: 12,
                  height: 12,
                  background: "var(--p-accent)",
                  borderRadius: "50%",
                  border: `2px solid var(--p-bg)`,
                  boxShadow: `0 0 8px var(--p-accent-glow)`,
                }}
              />
              {/* Content */}
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.78rem",
                  color: "var(--p-accent)",
                  letterSpacing: "0.05em",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                {item.date}
              </span>
              <strong style={{ fontSize: "1rem", color: "var(--p-text)", fontWeight: 700 }}>
                {item.title}
              </strong>
              <p style={{ color: "var(--p-muted)", fontSize: "0.9rem", marginTop: 2 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SELF STUDY ──────────────────────────────────────────────────── */}
      <Section id="self-study" title="Samostudium">
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {selfStudy.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "16px 0",
                borderBottom: i < selfStudy.length - 1 ? "1px solid var(--p-border)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <strong style={{ color: "var(--p-text)", fontSize: "1rem" }}>{item.title}</strong>
              <span style={{ color: "var(--p-muted)", fontSize: "0.9rem" }}>
                {item.desc}{" "}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--p-accent)", textDecoration: "none" }}
                  >
                    media.ccc.de
                  </a>
                )}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <Section id="skills" title="Skills">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 20,
          }}
        >
          {skills.map((group) => (
            <div
              key={group.category}
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-border)",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <h3
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--p-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--p-border)",
                  fontFamily: "var(--font-mono), monospace",
                }}
              >
                {group.category}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--p-muted)",
                      padding: "5px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "var(--p-accent)", fontSize: "0.7rem" }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── INTERESTS ───────────────────────────────────────────────────── */}
      <Section id="interests" title="Zájmy">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {interests.map((item) => (
            <div
              key={item.label}
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-border)",
                padding: "12px 24px",
                borderRadius: 50,
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--p-text)",
                cursor: "default",
                transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.borderColor = "var(--p-accent)";
                el.style.boxShadow = `0 6px 20px var(--p-accent-glow)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "var(--p-border)";
                el.style.boxShadow = "none";
              }}
            >
              <span>{item.emoji}</span>
              {item.label}
            </div>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <Section id="contact" title="Kontakt">
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ color: "var(--p-muted)", marginBottom: 32, fontSize: "1rem", lineHeight: 1.7 }}>
            Chceš se spojit, prodiskutovat projekt nebo jen pozdravit? Neváhej napsat.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:oskarvalouch@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "var(--p-accent)",
                color: isDark ? "#000" : "#fff",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              📧 Napište mi e-mail
            </a>
            <a
              href="https://github.com/wargamere"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "transparent",
                color: "var(--p-text)",
                border: "1.5px solid var(--p-border)",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--p-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--p-accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--p-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--p-text)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              🐙 GitHub Profil
            </a>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 24px",
          borderTop: "1px solid var(--p-border)",
          color: "var(--p-muted)",
          fontSize: "0.85rem",
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        <p>© 2025 Oskar Valouch. Vytvořeno s pomocí AI.</p>
      </footer>
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        padding: "72px 24px",
        borderBottom: "1px solid var(--p-border)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--p-text)",
            marginBottom: 40,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--p-accent)",
              fontSize: "1.2rem",
              fontWeight: 400,
            }}
          >
            {"//"}
          </span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
