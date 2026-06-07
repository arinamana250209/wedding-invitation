import React, { useState, useEffect, useRef } from 'react';

export default function BottomNav() {
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(null);
  const audioRef = useRef(null);

  const MUSIC_URL = '/musikk.mp3';

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Langsung play tanpa tunggu interaksi
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Jika browser masih block (jarang), fallback ke klik pertama
        const tryPlay = () => {
          audio.play().then(() => setPlaying(true)).catch(() => {});
          document.removeEventListener('click', tryPlay);
        };
        document.addEventListener('click', tryPlay);
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { icon: '📅', label: 'Acara',    href: '#acara-section' },
    { icon: '📍', label: 'Lokasi',   href: '#lokasi-section' },
    { icon: '❤️', label: 'Mempelai', href: '#mempelai-section' },
  ];

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          color: white;
          flex: 1;
          transition: transform 0.15s;
        }
        .nav-btn:hover { transform: translateY(-3px); }
        .nav-icon { font-size: 1.3rem; line-height: 1; }
        .nav-lbl {
          font-family: 'Poppins', sans-serif;
          font-size: 0.65rem;
          white-space: nowrap;
          opacity: 0.92;
        }
        .disc-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #111;
          border: 3px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-top: -24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .disc-btn:hover { transform: scale(1.1); }
        .disc-inner {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, #555, #1a1a1a);
          border: 2px solid #444;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .disc-inner.spinning { animation: spin 1.8s linear infinite; }
        .disc-center {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #999;
          border: 1.5px solid #bbb;
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(90deg, #e91e8c, #d41680)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 10px 14px',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(233,30,140,0.4)',
      }}>
        {/* Acara & Lokasi — kiri */}
        {navItems.slice(0, 2).map((item, i) => (
          <button
            key={i}
            className="nav-btn"
            onClick={() => { setActive(i); scrollTo(item.href); }}
            style={{ opacity: active === i ? 1 : 0.85 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-lbl">{item.label}</span>
          </button>
        ))}

        {/* Disc musik — tengah */}
        <button className="disc-btn" onClick={toggleMusic} title={playing ? 'Pause' : 'Play Musik'}>
          <div className={`disc-inner${playing ? ' spinning' : ''}`}>
            <div className="disc-center" />
          </div>
        </button>

        {/* Mempelai — kanan */}
        {navItems.slice(2).map((item, i) => (
          <button
            key={i + 2}
            className="nav-btn"
            onClick={() => { setActive(i + 2); scrollTo(item.href); }}
            style={{ opacity: active === i + 2 ? 1 : 0.85 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-lbl">{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{ height: '75px' }} />
    </>
  );
}