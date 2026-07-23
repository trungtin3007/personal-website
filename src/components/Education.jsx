import { education } from '../data'

export default function Education() {
  return (
    <section id="education" className="section">
      <h2 className="section-title">Education</h2>
      <div className="education-grid">
        {education.map((edu) => (
          <div key={edu.school} className="education-card">
            <div className="timeline-header">
              <h3>{edu.school}</h3>
              <span className="timeline-range">{edu.range}</span>
            </div>
            <p className="timeline-org">{edu.location}</p>
            <p className="timeline-description">
              {edu.degree} · {edu.detail}
            </p>
            <ul className="tag-list">
              {edu.coursework.map((course) => (
                <li key={course} className="tag">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
