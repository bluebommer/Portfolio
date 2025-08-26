import React from 'react';
import './App.css';
import './index.css';

import Header from './Components/Header';
import Hero from './Components/Hero';
import About from './Components/About';
import Projects from './Components/Projects'; // this will fetch portfolio items
import Blog from './Components/Blog';
import Contact from './Components/Contact';
import Admin from './Components/Admin';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Projects />   {/* fetches from backend now */}
      <Blog />
      <Contact />
      <Admin />
      <Footer />
    </div>
  );
}

export default App;
