import React, { useEffect, useState, useRef } from 'react';

export default function OpeningSection() {
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef();

  // Trigger animasi masuk HANYA sekali saat pertama kali terlihat
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hasEntered) {
        setHasEntered(true);
        // Step reveal sequence
        setTimeout(() => setStep(1), 300);
        setTimeout(() => setStep(2), 800);
        setTimeout(() => setStep(3), 1300);
        setTimeout(() => setStep(4), 1600);
      }
    }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [hasEntered]);

  // Tick terus berjalan selamanya — bunga & animasi tidak berhenti
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  // Step hanya dipakai untuk animasi masuk — setelah hasEntered, nilainya tetap 4
  const currentStep = hasEntered ? step : 0;

  const anim = (s) => ({
    opacity: currentStep >= s ? 1 : 0,
    transform: currentStep >= s ? 'translateY(0)' : 'translateY(40px)',
    transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)',
  });

  // Bunga melayang — selalu bergerak karena tick terus jalan
  const flowers = ['🌸', '🌺', '✨', '💮', '🌸', '✨', '🌺', '💮'];
  const floatingFlowers = flowers.map((f, i) => {
    const x = (Math.sin(tick * 0.02 + i * 1.2) * 40 + 50 + i * 12) % 100;
    const y = ((tick * 0.3 + i * 80) % 110) - 10;
    const opacity = hasEntered ? (0.3 + Math.sin(tick * 0.05 + i) * 0.2) : 0;
    return { f, x, y, opacity, size: 0.8 + Math.sin(tick * 0.03 + i) * 0.2 };
  });

  return (
    <section ref={sectionRef} id="pembuka-section" style={{
      background: 'linear-gradient(180deg, #fdf0f8 0%, #fce8f5 100%)',
      padding: '80px 20px 60px',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes shimmerText {
          0%, 100% { text-shadow: 0 0 8px rgba(233,30,140,0.3); }
          50%       { text-shadow: 0 0 24px rgba(233,30,140,0.7), 0 0 40px rgba(233,30,140,0.3); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.02); }
        }
        @keyframes shimmerLine {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes verseFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes sourceFade {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        .salam-title {
          animation: shimmerText 3s ease-in-out infinite;
        }
        .bismillah-text {
          animation: breathe 4s ease-in-out infinite;
        }
        .shimmer-divider {
          height: 2px;
          width: 100px;
          margin: 0 auto 28px;
          background: linear-gradient(90deg, transparent, #e91e8c, transparent);
          background-size: 200% auto;
          animation: shimmerLine 2s linear infinite;
        }
        .verse-text {
          animation: verseFloat 5s ease-in-out infinite;
        }
        .source-text {
          animation: sourceFade 3s ease-in-out infinite;
        }
      `}</style>

      {/* Bunga melayang — terus bergerak karena tick tidak berhenti */}
      {floatingFlowers.map((item, i) => (
        <span key={i} style={{
          position: 'absolute',
          left: `${item.x}%`,
          top: `${item.y}%`,
          fontSize: `${item.size}rem`,
          opacity: item.opacity,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}>
          {item.f}
        </span>
      ))}

      {/* Assalamualaikum */}
      <h2
        className={hasEntered ? 'salam-title' : ''}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          color: '#e91e8c',
          marginBottom: '16px',
          position: 'relative', zIndex: 1,
          ...anim(1),
        }}
      >
        Assalamu'alaikum
      </h2>

      {/* Shimmer divider */}
      <div className="shimmer-divider" style={{
        opacity: currentStep >= 1 ? 1 : 0,
        transition: 'opacity 1s ease 0.5s',
        position: 'relative', zIndex: 1,
      }} />

      {/* Bismillah */}
      <p
        className={hasEntered ? 'bismillah-text' : ''}
        style={{
          fontFamily: "'Amiri', serif",
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          color: '#333',
          marginBottom: '32px',
          direction: 'rtl',
          lineHeight: 1.8,
          position: 'relative', zIndex: 1,
          ...anim(2),
        }}
      >
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </p>

      {/* Quran verse */}
      <p
        className={hasEntered ? 'verse-text' : ''}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          color: '#555',
          maxWidth: '700px',
          lineHeight: 1.9,
          marginBottom: '12px',
          position: 'relative', zIndex: 1,
          ...anim(3),
        }}
      >
        Wahai manusia! Bertakwalah kepada Tuhanmu yang telah menciptakan kamu dari diri yang
        satu (Adam), dan (Allah) menciptakan pasangannya (Hawa) dari (diri)-nya; dan dari keduanya
        Allah memperkembangbiakkan laki-laki dan perempuan yang banyak. Bertakwalah kepada
        Allah yang dengan nama-Nya kamu saling meminta, dan (peliharalah) hubungan
        kekeluargaan. Sesungguhnya Allah selalu menjaga dan mengawasimu.
      </p>

      <p
        className={hasEntered ? 'source-text' : ''}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.9rem',
          color: '#888',
          marginBottom: '20px',
          fontStyle: 'italic',
          position: 'relative', zIndex: 1,
          ...anim(4),
        }}
      >
        (QS. An-Nisa' (4) : 1)
      </p>
    </section>
  );
}