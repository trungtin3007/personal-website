import { useState } from 'react'
import { profile } from '../data'

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false)
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
  const showPhoto = profile.photo && !photoFailed

  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="eyebrow">{profile.role} · CS @ UT Dallas</p>
        <h1>{profile.name}</h1>
        <p className="hero-tagline">{profile.tagline}</p>

        <dl className="hero-metrics">
          {profile.metrics.map((metric) => (
            <div key={metric.label} className="metric">
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#experience">
            View experience
          </a>
          <a className="btn btn-secondary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>

      <div className="hero-avatar" aria-hidden="true">
        {showPhoto ? (
          <img
            src={profile.photo}
            alt=""
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          initials
        )}
      </div>
    </section>
  )
}
