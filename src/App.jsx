import MatrixRain      from './components/MatrixRain';
import CustomCursor    from './components/CustomCursor';
import Navbar          from './components/Navbar';
import FloatingSocials from './components/FloatingSocials';
import Hero            from './components/Hero';
import About           from './components/About';
import Skills          from './components/Skills';
import GameProjects    from './components/GameProjects';
import CyberProjects   from './components/CyberProjects';
import Experience      from './components/Experience';
import Contact         from './components/Contact';

export default function App() {
  return (
    <>
      {/* Persistent background effects */}
      <MatrixRain opacity={0.14} />
      <CustomCursor />

      {/* Layout shell */}
      <Navbar />
      <FloatingSocials />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <GameProjects />
        <CyberProjects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
