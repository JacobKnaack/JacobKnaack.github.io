import Nav from './components/nav/Nav';
import Header from './components/header/Header';
import About from './components/about/About';
import Services from './components/services/Services';
import Projects from './components/projects/Projects';
import Experience from './components/experience/Experience';
import Contact from './components/contact/Contact';
import './App.css';

function App() {

  const navItems = [{
    text: "Home",
    url: '/'
  }, {
    text: 'About',
    url: '#About'
  }, {
    text: 'Services',
    url: '#Services'
  }, {
    text: 'Projects',
    url: '#Projects'
  }, {
    text: 'Experience',
    url: '#Experience'
  }, {
    text: 'Contact',
    url: '#Contact'
  }]

  return (
    <>
      <Nav title="Jacob Knaack" items={navItems}/>
      <main className="dark">
        <Header />
        <About />
        <Services />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}

export default App
