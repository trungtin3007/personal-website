export const profile = {
  name: 'Tin Dinh',
  role: 'Full-Stack Developer',
  tagline: 'CS student at UT Dallas building full-stack web apps end to end.',
  location: 'Dallas, TX',
  email: 'trungtin30072005@gmail.com',
  phone: '(346) 717-3276',
  github: 'https://github.com/trungtin3007',
  linkedin: 'https://www.linkedin.com/in/tin-dinh-995233352/',
  resumeUrl: '/resume.pdf',
  // Drop your photo at personal-website/public/profile.jpg — it'll be picked
  // up automatically (falls back to initials if the file isn't there).
  photo: '/profile.jpg',
  metrics: [
    { label: 'GPA', value: '3.5/4.0' },
    { label: 'Projects shipped', value: '3' },
    { label: 'Grad year', value: '2027' },
  ],
}

export const experience = [
  {
    range: '2025 – 2026',
    title: 'Vice-President',
    org: 'VINCEF UTD',
    location: 'Dallas, TX',
    description:
      'Led a 50+ member organization managing operations and event logistics while analyzing engagement and attendance data to optimize programming, increasing participation by 25%.',
    tags: ['Leadership', 'Data Analysis', 'Event Ops'],
  },
  {
    range: '2024 – Present',
    title: 'Barista',
    org: 'Starbucks',
    location: 'Dallas, TX',
    description:
      'Processed 200+ transactions per shift on POS systems, applying data-driven decisions to inventory and resource allocation, reducing waste by 15% through pattern recognition.',
    tags: ['Operations', 'POS Systems'],
  },
]

export const projects = [
  {
    featured: true,
    status: 'Shipped',
    date: 'December 2025',
    title: 'JustMath: Full-Stack Learning Platform',
    description:
      'Full-stack web app with a .NET REST API backend and TypeScript frontend, backed by a normalized PostgreSQL schema serving 1000+ concurrent users. Engineered a user analytics pipeline tracking learning patterns and engagement to power personalized recommendations via collaborative filtering, secured with OAuth 2.0.',
    tech: ['.NET', 'C#', 'TypeScript', 'PostgreSQL', 'OAuth 2.0'],
  },
  {
    featured: false,
    status: 'Shipped',
    date: '2026',
    title: 'Weather App',
    description:
      'Full-stack weather app with a React (Vite) frontend and Node.js/Express backend, featuring city search, a 7-day forecast, and automatic local weather via browser geolocation. Integrated the Open-Meteo and geocoding APIs server-side, returning clean JSON to a responsive UI rendering live conditions, "feels like" temperature, humidity, and wind.',
    tech: ['React', 'Vite', 'Node.js', 'Express'],
  },
  {
    featured: false,
    status: 'Shipped',
    date: 'November 2024',
    title: 'Expression Evaluator and Differentiator',
    description:
      'Java application implementing symbolic differentiation using recursive expression trees, reducing computational overhead by 45% with 99.9% accuracy across 500+ test cases. Designed an extensible, object-oriented class hierarchy and a 500+ case unit-test suite.',
    tech: ['Java', 'Data Structures & Algorithms'],
  },
]

export const education = [
  {
    school: 'University of Texas at Dallas',
    location: 'Dallas, TX',
    degree: 'Bachelor of Computer Science',
    detail: 'GPA: 3.5/4.0 · Certificate: Data Science',
    range: '2023 – 2027',
    coursework: [
      'Data Structures',
      'Database Systems',
      'Probability and Statistics',
      'Linear Algebra',
    ],
  },
]

export const skills = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'C#', 'Java', 'Python', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'HTML/CSS', 'Responsive Design'],
  },
  {
    category: 'Backend',
    items: ['.NET', 'Node.js', 'Express', 'REST APIs', 'PostgreSQL'],
  },
  {
    category: 'Developer Tools',
    items: ['Git', 'Docker', 'Postman', 'Vite', 'Jupyter Notebook'],
  },
  {
    category: 'Concepts',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Design',
      'OAuth 2.0',
      'Unit Testing',
      'Agile/Scrum',
    ],
  },
]

export const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
