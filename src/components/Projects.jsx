import { projects } from '../data'

function ProjectCard({ project }) {
  return (
    <div
      className={`project-card${project.featured ? ' project-card-featured' : ''}`}
    >
      <div className="project-card-header">
        <span className="project-status">{project.status}</span>
        <span className="project-date">{project.date}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="tag-list">
        {project.tech.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="section">
      <h2 className="section-title">Projects</h2>
      {featured && (
        <div className="project-featured">
          <ProjectCard project={featured} />
        </div>
      )}
      <div className="project-grid">
        {rest.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
