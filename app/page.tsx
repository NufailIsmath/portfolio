import {
  achievements,
  education,
  experience,
  principles,
  profile,
  projects,
  skills,
  stats,
} from "@/lib/data";
import BlockHeader from "@/components/BlockHeader";
import CommandPalette from "@/components/CommandPalette";
import CopyEmail from "@/components/CopyEmail";
import Nav from "@/components/Nav";
import PhoneMockup from "@/components/PhoneMockup";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import TimezoneOverlap from "@/components/TimezoneOverlap";
import TraceGraph from "@/components/TraceGraph";

const TITLES = ["About", "Skills", "Selected work", "Mobile", "Experience", "Education", "Contact"];
const prevOf = (i: number) => (i === 0 ? "genesis" : TITLES[i - 1]);

const MOBILE_FEATURES = [
  "Expo Router with typed, file-based routes and auth-guarded route groups",
  "OTP sign-up and multi-step KYC: personal info → address → ID documents + selfie capture",
  "Biometric unlock and tokens kept in the iOS Keychain / Android Keystore",
  "Smart-wallet and on-chain deed management; external EVM wallets via WalletConnect",
  "Shareable identity card: QR code, image capture, print and share sheet",
  "Offline-aware data layer with TanStack Query; persisted Zustand stores",
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Home() {
  const aegis = projects.find((p) => p.slug === "aegis")!;
  const cleanId = projects.find((p) => p.slug === "clean-id")!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Nav />
      <CommandPalette />
      <Reveal />

      <main id="top">
        {/* ─── Hero ─── */}
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="pill">
              <b className="dot" /> {profile.availability}
            </span>
            <h1>
              {profile.name}
              <span className="hero-role">
                {profile.role} <em>·</em> {profile.subRole}
              </span>
            </h1>
            <p className="lead">{profile.headline}</p>
            <div className="hero-cta">
              <a href="#work" className="btn btn-primary">
                View selected work
              </a>
              <a href={profile.resume} className="btn" target="_blank" rel="noopener">
                Download CV
              </a>
              <CopyEmail />
            </div>
            <ul className="hero-meta mono">
              <li>{profile.location}</li>
              <li>{profile.tzLabel}</li>
              <li>
                <a href={profile.links.github} target="_blank" rel="noopener">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.links.medium} target="_blank" rel="noopener">
                  Medium
                </a>
              </li>
            </ul>
          </div>
          <div className="hero-visual">
            <TraceGraph />
            <p className="caption">
              A simulated fund trace, modelled on <a href="#aegis">Aegis</a>, the forensics platform I'm building. Hover
              over the nodes.
            </p>
          </div>
        </section>

        <section className="wrap stats reveal" aria-label="At a glance">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* ─── About ─── */}
        <section id="about" className="wrap section">
          <BlockHeader index={1} title={TITLES[0]} prev={prevOf(0)} />
          <div className="about reveal">
            <div>
              <p className="about-summary">{profile.summary}</p>
              <div className="principles">
                {principles.map((p) => (
                  <div key={p.title} className="principle">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="card now">
              <span className="eyebrow">
                <b className="dot" /> Currently building
              </span>
              <h3>Aegis</h3>
              <p className="muted">
                An AI-assisted blockchain forensics platform. It traces illicit funds across chains, flags scam
                entities and writes grounded investigation briefings.
              </p>
              <a href="#aegis" className="link">
                Read the case study <Arrow />
              </a>
              <hr />
              <span className="eyebrow">Best fit</span>
              <ul className="fit">
                <li>Senior Blockchain / Smart Contract Engineer</li>
                <li>Senior Backend Engineer (Node / NestJS)</li>
                <li>Full-stack Web3 Engineer</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* ─── Skills ─── */}
        <section id="skills" className="wrap section">
          <BlockHeader
            index={2}
            title={TITLES[1]}
            prev={prevOf(1)}
            kicker="Grouped by the problems they solve. Every item here is used in the projects below."
          />
          <div className="grid-skills">
            {skills.map((g) => (
              <div key={g.domain} className="card skill reveal">
                <h3>{g.domain}</h3>
                <p className="muted small">{g.blurb}</p>
                <div className="stack">
                  {g.items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Work ─── */}
        <section id="work" className="wrap section">
          <BlockHeader
            index={3}
            title={TITLES[2]}
            prev={prevOf(2)}
            kicker="Case studies of systems I've architected and shipped, covering smart contracts, backends, infrastructure and apps."
          />

          <article id="aegis" className="feature reveal">
            <div className="feature-head">
              <div>
                <span className="eyebrow">
                  Featured · {aegis.period} · <span className="status">{aegis.status}</span>
                </span>
                <h3>{aegis.name}</h3>
                <p className="project-tagline">{aegis.tagline}</p>
              </div>
              <span className="role mono">{aegis.role}</span>
            </div>
            <p className="feature-context">{aegis.context}</p>
            <div className="feature-body">
              <ul className="ticks">
                {aegis.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="arch" aria-label="Aegis architecture">
                <span className="eyebrow">Architecture</span>
                {aegis.architecture!.map((l, i) => (
                  <div key={l.layer} className="arch-layer">
                    <span className="arch-name mono">{l.layer}</span>
                    <div className="arch-items">
                      {l.items.map((it) => (
                        <span key={it}>{it}</span>
                      ))}
                    </div>
                    {i < aegis.architecture!.length - 1 && <span className="arch-arrow" aria-hidden />}
                  </div>
                ))}
                <p className="small muted arch-note">
                  An Nx monorepo of NestJS services that talk over NATS events, with shared libraries for auth,
                  crypto, chain adapters and the graph store.
                </p>
              </div>
            </div>
            <div className="stack">
              {aegis.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>

          <article className="feature feature-alt reveal">
            <div className="feature-head">
              <div>
                <span className="eyebrow">Featured · {cleanId.period}</span>
                <h3>{cleanId.name}</h3>
                <p className="project-tagline">{cleanId.tagline}</p>
              </div>
              <span className="role mono">{cleanId.role}</span>
            </div>
            <p className="feature-context">{cleanId.context}</p>
            <div className="layers">
              {[
                { k: "On-chain", v: cleanId.highlights[0] },
                { k: "Backend", v: cleanId.highlights[1] },
                { k: "Mobile", v: cleanId.highlights[2] },
              ].map((x) => (
                <div key={x.k} className="layer">
                  <span className="mono eyebrow">{x.k}</span>
                  <p>{x.v}</p>
                </div>
              ))}
            </div>
            <div className="stack">
              {cleanId.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>

          <h3 className="subhead">More projects</h3>
          <ProjectGrid projects={rest} />
        </section>

        {/* ─── Mobile ─── */}
        <section id="mobile" className="wrap section">
          <BlockHeader
            index={4}
            title={TITLES[3]}
            prev={prevOf(3)}
            kicker="I also build native apps for iOS and Android, currently in React Native and previously in Flutter."
          />
          <div className="mobile reveal">
            <PhoneMockup />
            <div>
              <span className="eyebrow">Clean ID · iOS & Android</span>
              <h3 className="mobile-title">A native React Native / Expo app, built from scratch</h3>
              <p className="muted">
                A native rewrite of the Clean ID web client that uses the same backend API. It needed features Expo Go
                can't provide, including camera-based KYC, biometrics and Web3 wallet connections, so it runs on a
                custom dev client.
              </p>
              <ul className="ticks">
                {MOBILE_FEATURES.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="stack">
                {[
                  "React Native",
                  "Expo SDK",
                  "Expo Router",
                  "TypeScript (strict)",
                  "NativeWind",
                  "Reanimated",
                  "react-hook-form + zod",
                  "wagmi / viem",
                  "Reown AppKit",
                  "SecureStore",
                ].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="card mini">
                <span className="eyebrow">Earlier · Flutter</span>
                <p>
                  <strong>EDoc:</strong> a telemedicine app. I led its Flutter UI and integrated Twilio video
                  consultations with a .NET backend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Experience ─── */}
        <section id="experience" className="wrap section">
          <BlockHeader index={5} title={TITLES[4]} prev={prevOf(4)} />
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className="reveal">
                <div className="tl-side">
                  <strong>{job.company}</strong>
                  <span className="mono muted small">{job.period}</span>
                </div>
                <div className="tl-body">
                  {job.roles.map((r) => (
                    <div key={r.title} className="tl-role">
                      <h3>
                        {r.title} <span className="mono muted small">{r.period}</span>
                      </h3>
                      <ul className="ticks">
                        {r.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Education ─── */}
        <section id="education" className="wrap section">
          <BlockHeader index={6} title={TITLES[5]} prev={prevOf(5)} />
          <div className="edu reveal">
            <div className="card">
              <span className="eyebrow">Education</span>
              <ul className="edu-list">
                {education.map((e) => (
                  <li key={e.title}>
                    <strong>{e.title}</strong>
                    <span className="muted">{e.place}</span>
                    <span className="mono small muted">{e.period}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <span className="eyebrow">Hackathons</span>
              <ul className="edu-list">
                {achievements.map((a) => (
                  <li key={a}>
                    <strong>{a}</strong>
                  </li>
                ))}
              </ul>
              <span className="eyebrow" style={{ marginTop: "1.25rem" }}>
                Writing
              </span>
              <p className="muted">
                I write educational blockchain content for clients and teammates, and publish on{" "}
                <a href={profile.links.medium} target="_blank" rel="noopener" className="link">
                  Medium <Arrow />
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" className="wrap section">
          <BlockHeader index={7} title={TITLES[6]} prev={prevOf(6)} />
          <div className="contact reveal">
            <div>
              <h3 className="contact-title">Hiring for a remote blockchain or backend role? Let's talk.</h3>
              <p className="muted">
                I'm available for full-time and contract work with remote teams. I usually reply within a day.
              </p>
              <a className="contact-email mono" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <div className="hero-cta">
                <CopyEmail className="btn btn-primary" />
                <a href={profile.resume} className="btn" target="_blank" rel="noopener">
                  Download CV
                </a>
                <a href={profile.links.linkedin} className="btn" target="_blank" rel="noopener">
                  LinkedIn
                </a>
                <a href={profile.links.github} className="btn" target="_blank" rel="noopener">
                  GitHub
                </a>
              </div>
            </div>
            <div className="card">
              <TimezoneOverlap />
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer mono">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          Press <kbd>Ctrl K</kbd> to navigate
        </span>
      </footer>
    </>
  );
}
