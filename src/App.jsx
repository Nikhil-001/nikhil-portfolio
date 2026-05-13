import { useState, useEffect, useRef } from 'react'
import './index.css'
import './App.css'

const PROJECTS = [
  {
    name: 'Task Manager API',
    status: 'live',
    desc: 'Stateless REST API with JWT auth, Redis token blacklisting (TTL-matched), per-user data ownership, and multi-stage Docker deployment.',
    tags: ['Java 17', 'Spring Boot 3', 'Redis', 'Docker', 'Railway'],
    live: 'https://taskapi-production-3f0b.up.railway.app',
    github: 'https://github.com/Nikhil-001',
  },
  {
    name: 'URL Shortener',
    status: 'coming',
    desc: 'High-speed URL shortener with click analytics, Redis caching, custom aliases, and rate limiting.',
    tags: ['Spring Boot', 'Redis', 'PostgreSQL', 'Docker'],
    live: null,
    github: null,
  },
  {
    name: 'Job Application Tracker',
    status: 'coming',
    desc: 'Full-stack tracker with JWT auth, status pipeline, note-taking per application, and email reminders via scheduled jobs.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT'],
    live: null,
    github: null,
  },
  {
    name: 'MMO Game Server',
    status: 'shipped',
    desc: 'C++ backend for a live multiplayer game with 10k+ concurrent users. Rule-based state machines, Python NPC scripting, staged deployments.',
    tags: ['C++', 'Python', 'Systems', 'Concurrency'],
    live: null,
    github: null,
  },
]

const SKILLS = {
  'Core Languages': ['Java', 'C++', 'Python', 'SQL'],
  'Backend': ['Spring Boot 3', 'Spring Security', 'REST APIs', 'Microservices'],
  'Auth & Cache': ['JWT', 'BCrypt', 'Redis', 'Stateless Sessions'],
  'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'H2'],
  'DevOps & Cloud': ['Docker', 'AWS (EC2/S3/Lambda)', 'Railway', 'Git', 'Maven'],
  'Testing': ['JUnit 5', 'Mockito', 'Regression Testing'],
}

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <span className="nav__logo">NSB<span>.dev</span></span>
        <div className="nav__links">
          {['about', 'projects', 'skills', 'contact'].map(s => (
              <a key={s} href={`#${s}`}>{s}</a>
          ))}
        </div>
      </nav>
  )
}

function Hero() {
  const role = useTypewriter([
    'Backend Engineer',
    'Java / Spring Boot',
    'Systems Builder',
    'API Architect',
  ])

  return (
      <section className="hero" id="about">
        <div className="hero__inner">
          <span className="hero__badge">// available for hire · open to relocation</span>
          <h1 className="hero__name">
            Nikhil Sai<br /><span>Bobburi.</span>
          </h1>
          <p className="hero__role">
            <span className="mono">&gt; </span>{role}<span className="cursor">|</span>
          </p>
          <p className="hero__desc">
            Backend Software Engineer with 4+ years building high-concurrency server-side systems.
            Production experience with 10,000+ concurrent users. Spring Boot · Redis · Docker · AWS.
          </p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="/Nikhil_Bobburi_Resume.pdf" className="btn btn--secondary" target="_blank">Download Resume</a>
            <a href="https://github.com/Nikhil-001" className="btn btn--ghost" target="_blank">GitHub ↗</a>
          </div>
        </div>
        <div className="hero__decoration" aria-hidden="true">
        <pre className="hero__code">{`// task-manager/src/main/java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  @PostMapping
  public ResponseEntity<Task> create(
    @Valid @RequestBody TaskRequest req,
    @AuthUser UserPrincipal user
  ) {
    return ResponseEntity.ok(
      taskService.create(req, user.getId())
    );
  }
}`}</pre>
        </div>
      </section>
  )
}

function Projects() {
  return (
      <section className="section" id="projects">
        <div className="section__inner">
          <p className="section__label">// PROJECTS</p>
          <h2 className="section__title">Things I've built</h2>
          <div className="projects__grid">
            {PROJECTS.map(p => (
                <div key={p.name} className="card">
                  <div className="card__top">
                    <span className="card__name">{p.name}</span>
                    <span className={`badge badge--${p.status}`}>
                  {p.status === 'live' ? '● LIVE' : p.status === 'shipped' ? '✓ SHIPPED' : 'COMING SOON'}
                </span>
                  </div>
                  <p className="card__desc">{p.desc}</p>
                  <div className="card__tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {(p.live || p.github) && (
                      <div className="card__links">
                        {p.live && <a href={p.live} target="_blank" className="card__link card__link--live">Live demo ↗</a>}
                        {p.github && <a href={p.github} target="_blank" className="card__link">GitHub ↗</a>}
                      </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}

function Skills() {
  return (
      <section className="section section--alt" id="skills">
        <div className="section__inner">
          <p className="section__label">// SKILLS</p>
          <h2 className="section__title">What I work with</h2>
          <div className="skills__grid">
            {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group} className="skills__group">
                  <p className="skills__group-name">{group}</p>
                  <div className="skills__items">
                    {items.map(s => <span key={s} className="skill">{s}</span>)}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}

function Contact() {
  return (
      <section className="section" id="contact">
        <div className="section__inner contact__inner">
          <p className="section__label">// CONTACT</p>
          <h2 className="section__title">Let's work together</h2>
          <p className="contact__desc">
            Actively seeking backend engineering roles. Open to relocation — US, Singapore, Europe, UAE.
            Feel free to reach out directly.
          </p>
          <div className="contact__links">
            <a href="mailto:nikhilsai0330@gmail.com" className="btn btn--primary">nikhilsai0330@gmail.com</a>
            <a href="https://github.com/Nikhil-001" target="_blank" className="btn btn--secondary">GitHub</a>
            <a href="https://linkedin.com/in/nikhil-bobburi-007b26373" target="_blank" className="btn btn--secondary">LinkedIn</a>
          </div>
          <p className="contact__visa">
            <span className="mono">visa_status:</span> F1 OPT STEM (14 months remaining) · eligible for H1B sponsorship
          </p>
        </div>
      </section>
  )
}

function Footer() {
  return (
      <footer className="footer">
        <span className="mono">© 2025 Nikhil Sai Bobburi</span>
        <span>Built with React + Vite · Deployed on Vercel</span>
      </footer>
  )
}

export default function App() {
  return (
      <>
        <Nav />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </>
  )
}