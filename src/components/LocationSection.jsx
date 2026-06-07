import React, { useEffect, useRef, useState } from 'react';

export default function LocationSection() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => s + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const anim = (s) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${s}s, transform 0.8s ease ${s}s`,
  });

  const btnGlow = Math.sin(step * 0.9) > 0;

  return (
    <section ref={ref} style={{
      background: 'linear-gradient(180deg, #fff 0%, #fce8f5 100%)',
      padding: '80px 20px 120px',
      textAlign: 'center',
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatPin {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: #f0d0e8; box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
          50% { border-color: #e91e8c; box-shadow: 0 8px 40px rgba(233,30,140,0.25); }
        }
        .map-btn:hover {
          background: linear-gradient(135deg, #c91578, #a01060) !important;
          transform: translateY(-2px) !important;
        }
        .map-container {
          border-radius: 16px;
          overflow: hidden;
          border: 3px solid #f0d0e8;
          animation: borderGlow 3s ease-in-out infinite;
        }
        .pin-icon {
          display: inline-block;
          animation: floatPin 2s ease-in-out infinite;
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .shimmer-line {
          height: 2px;
          width: 80px;
          margin: 0 auto 30px;
          background: linear-gradient(90deg, transparent, #e91e8c, transparent);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      {/* Pin icon animasi */}
      <div style={{ ...anim(0.05) }}>
        <span className="pin-icon">📍</span>
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
        color: '#e91e8c',
        marginBottom: '12px',
        ...anim(0.1),
      }}>
        Lokasi Akad &amp; Resepsi Pernikahan
      </h2>

      {/* Shimmer divider */}
      <div className="shimmer-line" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }} />

      {/* Open Maps button */}
      <div style={{ ...anim(0.3), display: 'inline-block', marginBottom: '36px' }}>
        <button
          className="map-btn"
          onClick={() => window.open('https://maps.app.goo.gl/F1n6ThNggwHMEpZK7', '_blank')}
          style={{
            background: 'linear-gradient(135deg, #e91e8c, #c91578)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '14px 36px',
            fontSize: '0.9rem',
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            cursor: 'pointer',
            letterSpacing: '0.08em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s',
            boxShadow: btnGlow
              ? '0 6px 30px rgba(233,30,140,0.55)'
              : '0 4px 15px rgba(233,30,140,0.3)',
          }}
        >
          📍 BUKA DI GOOGLE MAPS
        </button>
      </div>

      {/* Map embed */}
      <div
        className="map-container"
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          ...anim(0.5),
        }}
      >
        <iframe
          title="Lokasi Pernikahan - Karangduren"
          src="https://www.google.com/maps/embed?pb=!4v1780721636516!6m8!1m7!1sljYNhPzCkLkjFBUdbKyNoQ!2m2!1d-7.392451777232163!2d110.5158578898957!3f150.75!4f-24.08!5f0.7379397467202298"
          width="100%"
          height="420"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}