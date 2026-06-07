import React, { useState, useEffect } from 'react';
import CoverPage from './components/CoverPage';
import HeroSection from './components/HeroSection';
import OpeningSection from './components/OpeningSection';
import BrideGroomSection from './components/BrideGroomSection';
import EventSection from './components/EventSection';
import LocationSection from './components/LocationSection';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const guestName = new URLSearchParams(window.location.search).get('n') || 'Tamu Undangan';

  useEffect(() => {
    document.title = 'Wedding Nobita ❤️ Shizuka';
  }, []);

  if (!isOpen) {
    return <CoverPage guestName={guestName} onOpen={() => setIsOpen(true)} />;
  }

  return (
    <div className="app">
      <HeroSection guestName={guestName} />
      <OpeningSection />
      <BrideGroomSection />
      <EventSection />
      <LocationSection />
      <BottomNav />
    </div>
  );
}

export default App;
