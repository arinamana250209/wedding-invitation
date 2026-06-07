import React, { useEffect, useRef, useState } from 'react';

function EventCard({ title, date, time, location, delay, visible }) {
  const addToCalendar = () => {
    const start = title === 'Akad Nikah' ? '20260613T090000' : '20260727T090000';
    const end = title === 'Akad Nikah' ? '20260613T120000' : '20260727T120000';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Eko+%26+Armita+-+${encodeURIComponent(title)}&dates=${start}/${end}&details=Pernikahan+Eko+%26+Armita&location=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '36px 30px',
      flex: 1,
      minWidth: '280px',
      maxWidth: '380px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f0e0ec',
      opacity: 0,
      animation: visible ? `fadeUp 0.7s ease ${delay}s forwards` : 'none',
    }}>
      <h3 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.3rem',
        fontWeight: 600,
        color: '#333',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #f0e0ec',
      }}>
        {title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.1rem' }}>📅</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#555' }}>{date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.1rem' }}>🕘</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#555' }}>{time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.1rem' }}>📍</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#555' }}>{location}</span>
        </div>
      </div>

      <button
        onClick={addToCalendar}
        style={{
          width: '100%',
          background: '#e91e8c',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 20px',
          fontSize: '0.85rem',
          fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          cursor: 'pointer',
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#c91578'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#e91e8c'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        📅 SIMPAN KE KALENDER
      </button>
    </div>
  );
}

export default function EventSection() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
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
    const interval = setInterval(() => setStep(s => s + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  const glowStyle = (offset) => ({
    boxShadow: Math.sin((step + offset) * 0.8) > 0
      ? '0 8px 40px rgba(233,30,140,0.25), 0 4px 20px rgba(0,0,0,0.08)'
      : '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'box-shadow 1.5s ease',
  });

  const flowers = ['🌸', '🌺', '💮', '✨', '🌸', '💐', '✨', '🌺', '🌸', '💮'];
  const floatingFlowers = flowers.map((f, i) => {
    const x = (Math.sin(tick * 0.018 + i * 1.3) * 35 + 50 + i * 9) % 100;
    const y = ((tick * 0.25 + i * 90) % 115) - 10;
    const opacity = visible ? (0.2 + Math.sin(tick * 0.04 + i) * 0.12) : 0;
    const size = 0.85 + Math.sin(tick * 0.03 + i * 0.7) * 0.2;
    return { f, x, y, opacity, size };
  });

  return (
    <section ref={ref} style={{
      background: 'white',
      padding: '80px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .event-title {
          animation: fadeUp 0.7s ease 0.1s forwards, pulse 3s ease-in-out 1s infinite;
        }
        .ring-icon {
          display: inline-block;
          animation: floatIcon 2.5s ease-in-out infinite;
          font-size: 2rem;
          margin-bottom: 12px;
        }
        .shimmer-divider {
          height: 2px;
          width: 80px;
          margin: 0 auto 40px;
          background: linear-gradient(90deg, transparent, #e91e8c, transparent);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
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

        {/* Icon */}
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.05s' }}>
          <span className="ring-icon">💍</span>
        </div>

        {/* Section title */}
        <h2
          className={visible ? 'event-title' : ''}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: '#e91e8c',
            marginBottom: '12px',
            opacity: visible ? 1 : 0,
          }}
        >
          Acara Pernikahan
        </h2>

        {/* Shimmer divider */}
        <div className="shimmer-divider" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.3s' }} />

        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto 50px',
          lineHeight: 1.8,
          opacity: 0,
          animation: visible ? 'fadeUp 0.7s ease 0.2s forwards' : 'none',
        }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila, Bapak/Ibu/Saudara/i
          berkenan hadir untuk memberikan do'a restunya, kami ucapkan terima kasih.
        </p>

        {/* Event cards */}
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <div style={{ flex: 1, minWidth: '280px', maxWidth: '380px', borderRadius: '16px', ...glowStyle(0), transition: 'box-shadow 1.5s ease' }}>
            <EventCard
              title="Akad Nikah"
              date="13 Juni 2026"
              time="09:00 WIB - Selesai"
              location="Karangduren Rt.01/Rw.01"
              delay={0.3}
              visible={visible}
            />
          </div>
          <div style={{ flex: 1, minWidth: '280px', maxWidth: '380px', borderRadius: '16px', ...glowStyle(2), transition: 'box-shadow 1.5s ease' }}>
            <EventCard
              title="Resepsi"
              date="Minggu, 27 Juli 2026"
              time="09:00 WIB - Selesai"
              location="Karangduren Rt.01/Rw.01"
              delay={0.5}
              visible={visible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}