import React from 'react'
// import Header from './Components/Header';
import Hero from './Hero';
import About from './About';
import Projects from './Projects'; // this will fetch portfolio items
import Blog from './Blog';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';
const Portfolio = () => {
  return (
    <div>
    <Header />
      <Hero />
      <About />
      <Projects />   {/* fetches from backend now */}
      <Blog />
      <Contact />
      <Footer />
    </div>
  )
}

export default Portfolio