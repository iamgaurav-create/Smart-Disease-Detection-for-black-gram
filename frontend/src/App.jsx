import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageUpload from './components/ImageUpload';
import ResultCard from './components/ResultCard';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePredictionResult = (result) => {
    setPrediction(result);
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('prediction-results')?.offsetTop - 100,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleReset = () => {
    setPrediction(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <Hero />
        
        <ImageUpload onPredictionResult={handlePredictionResult} />
        
        {prediction && (
          <div id="prediction-results">
            <ResultCard result={prediction} onReset={handleReset} />
          </div>
        )}
        
        <InfoSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
