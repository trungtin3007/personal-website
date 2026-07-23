import { useState } from 'react'
import { navLinks, profile } from '../data'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top" onClick={closeMenu}>
          {profile.name}
        </a>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a
            className="nav-resume"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </nav>

        <button
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="nav-links-mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Resume
          </a>
        </nav>
      )}
    </header>
  )
}
