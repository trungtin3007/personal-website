import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <ol className="timeline">
        {experience.map((role) => (
          <li key={role.title + role.org} className="timeline-item">
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{role.title}</h3>
                <span className="timeline-range">{role.range}</span>
              </div>
              <p className="timeline-org">
                {role.org} · {role.location}
              </p>
              <p className="timeline-description">{role.description}</p>
              <ul className="tag-list">
                {role.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
