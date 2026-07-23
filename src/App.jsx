import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ChatBox from './components/ChatBox'
import './App.css'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <p>Built with React + Vite.</p>
      </footer>
      <ChatBox />
    </>
  )
}

export default App
