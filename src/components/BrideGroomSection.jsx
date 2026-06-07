import React, { useEffect, useRef, useState } from 'react';

export default function BrideGroomSection() {
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  const flowers = ['🌸', '🌺', '💮', '🌸', '✨', '🌺', '💐', '🌸', '✨', '💮'];
  const floatingFlowers = flowers.map((f, i) => {
    const x = (Math.sin(tick * 0.018 + i * 1.3) * 35 + 50 + i * 9) % 100;
    const y = ((tick * 0.25 + i * 90) % 115) - 10;
    const opacity = visible ? (0.25 + Math.sin(tick * 0.04 + i) * 0.15) : 0;
    const size = 0.9 + Math.sin(tick * 0.03 + i * 0.7) * 0.25;
    return { f, x, y, opacity, size };
  });

  return (
    <section id="mempelai-section" ref={ref} style={{
      background: 'linear-gradient(180deg, #fce8f5 0%, #fdf0f8 100%)',
      padding: '40px 20px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringGlow {
          0%, 100% { box-shadow: 0 12px 48px rgba(233,30,140,0.25); border-color: rgba(233,30,140,0.2); }
          50%      { box-shadow: 0 12px 60px rgba(233,30,140,0.5); border-color: rgba(233,30,140,0.5); }
        }

        .sc { opacity: 0; }
        .sc.vis { animation: scaleIn 0.7s ease 0.1s forwards; }

        .sl { opacity: 0; }
        .sr { opacity: 0; }
        .sl.vis { animation: slideLeft  0.8s ease 0.3s forwards; }
        .sr.vis { animation: slideRight 0.8s ease 0.5s forwards; }

        .fu1 { opacity: 0; }
        .fu2 { opacity: 0; }
        .fu1.vis { animation: fadeInUp 0.8s ease 0.5s forwards; }
        .fu2.vis { animation: fadeInUp 0.8s ease 0.7s forwards; }

        .couple-full-photo {
          width: min(420px, 90vw);
          height: min(420px, 90vw);
          border-radius: 50% 50% 50% 50% / 45% 45% 55% 55%;
          overflow: hidden;
          margin: 0 auto 40px;
          box-shadow: 0 12px 48px rgba(233,30,140,0.25);
          border: 5px solid rgba(233,30,140,0.2);
          position: relative;
        }
        .couple-full-photo.floating {
          animation: floating 4s ease-in-out infinite, ringGlow 3s ease-in-out infinite;
        }
        .couple-full-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 5%;
          display: block;
        }

        .amp {
          opacity: 0;
          font-family: 'Dancing Script', cursive;
          font-size: 2.8rem;
          color: #e91e8c;
          padding: 0 10px;
        }
        .amp.vis { animation: fadeInUp 0.8s ease 0.4s forwards; }
      `}</style>

      {/* Bunga melayang */}
      {floatingFlowers.map((item, i) => (
        <span key={i} style={{
          position: 'absolute',
          left: `${item.x}%`,
          top: `${item.y}%`,
          fontSize: `${item.size}rem`,
          opacity: item.opacity,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'opacity 0.5s',
          zIndex: 0,
        }}>
          {item.f}
        </span>
      ))}

      {/* Konten utama */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Foto couple */}
        <div className={`sc${visible ? ' vis' : ''}`}>
          <div className={`couple-full-photo${visible ? ' floating' : ''}`}>
            <img src="/wedding-invitation/foto-couple.jpg" alt="Eko & Armita" />
          </div>
        </div>

        {/* Nama mempelai */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '20px',
          flexWrap: 'wrap',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {/* Mempelai Pria */}
          <div style={{ flex: 1, minWidth: '220px', textAlign: 'center' }}>
            <h2 className={`sl${visible ? ' vis' : ''}`} style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              color: '#333',
              marginBottom: '8px',
            }}>
              Eko Febriyanto
            </h2>
            <p className={`fu1${visible ? ' vis' : ''}`} style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.9rem',
              color: '#666',
              marginBottom: '4px',
            }}>
              Putra dari:
            </p>
            <p className={`fu1${visible ? ' vis' : ''}`} style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.88rem',
              color: '#555',
              fontWeight: 500,
              lineHeight: 1.7,
            }}>
              Bp. Sholikin &amp; Ibu Siti Sumarsih<br />
              Sruwen 1 RT.05/RW.01<br />
              Kec. Tengaran, Kab. Semarang
            </p>
          </div>

          {/* Ampersand */}
          <div className={`amp${visible ? ' vis' : ''}`}>&amp;</div>

          {/* Mempelai Wanita */}
          <div style={{ flex: 1, minWidth: '220px', textAlign: 'center' }}>
            <h2 className={`sr${visible ? ' vis' : ''}`} style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              color: '#333',
              marginBottom: '8px',
            }}>
              Armita Elza Saputri
            </h2>
            <p className={`fu2${visible ? ' vis' : ''}`} style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.9rem',
              color: '#666',
              marginBottom: '4px',
            }}>
              Putri dari:
            </p>
            <p className={`fu2${visible ? ' vis' : ''}`} style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.88rem',
              color: '#555',
              fontWeight: 500,
              lineHeight: 1.7,
            }}>
              Bp. Muhamad Fahrudin &amp; Ibu Sri Jumiyatun<br />
              Karangduren RT.01/RW.01<br />
              Kec. Tengaran, Kab. Semarang
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}