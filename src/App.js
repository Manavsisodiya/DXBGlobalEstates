import './App.css';
import About from './Components/About';
import Expertise from './Components/Expertise';
import Navbar from './Components/Navbar';
import OurProperties from './Components/OurProperties';
import ProjectSlider from './Components/ProjectSlider';
import WhyUs from './Components/WhyUs';
import Hero from './Components/hero';

function App() {
  return (
    
    <>
      <div className='container'>
        <Navbar/>
        <Hero/>
      </div>
      <About/>
      <WhyUs/>
      <Expertise/>
      <OurProperties/>
      <ProjectSlider/>
    
    </>
  );
}

export default App;
