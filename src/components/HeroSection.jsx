import React, { useState, useEffect, useRef } from 'react';

const WEDDING_DATE = new Date('2026-07-27T09:00:00');

export default function HeroSection({ guestName }) {
  const [countdown, setCountdown] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const sectionRef = useRef();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = WEDDING_DATE - now;
      if (diff > 0) {
        setCountdown({
          hari:  Math.floor(diff / (1000 * 60 * 60 * 24)),
          jam:   Math.floor((diff / (1000 * 60 * 60)) % 24),
          menit: Math.floor((diff / (1000 * 60)) % 60),
          detik: Math.floor((diff / 1000) % 60),
        });
      } else {
        setCountdown({ hari: 0, jam: 0, menit: 0, detik: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouse = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouseX(x);
      setMouseY(y);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Varied snowflakes / particles
  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 5 + 5,
    size: Math.random() * 12 + 5,
    type: ['✦', '✧', '·', '⋆', '✺'][Math.floor(Math.random() * 5)],
    opacity: Math.random() * 0.5 + 0.3,
  }));

  return (
    <section ref={sectionRef} id="hero-section" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#1a0808',
    }}>
      <style>{`
        /* ── Particles ── */
        @keyframes snowfall {
          0%   { transform: translateY(-30px) rotate(0deg) scale(1);   opacity: 0.9; }
          50%  { opacity: 0.6; transform: translateY(50vh) rotate(200deg) scale(1.2); }
          100% { transform: translateY(105vh) rotate(400deg) scale(0.8); opacity: 0; }
        }

        /* ── Text reveal ── */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }

        /* ── Countdown digit pulse ── */
        @keyframes countPulse {
          0%, 100% { transform: scale(1);    text-shadow: 0 2px 10px rgba(0,0,0,0.6); }
          50%      { transform: scale(1.14); text-shadow: 0 4px 20px rgba(255,200,200,0.6); }
        }

        /* ── Shimmer on couple names ── */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── Soft glow pulse on date ── */
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 2px 12px rgba(0,0,0,0.7); }
          50%      { text-shadow: 0 0 20px rgba(255,180,180,0.7), 0 2px 12px rgba(0,0,0,0.5); }
        }

        /* ── Button shine sweep ── */
        @keyframes btnShine {
          0%   { left: -80%; }
          100% { left: 130%;  }
        }

        /* ── Overlay vignette breathe ── */
        @keyframes vignetteBreathe {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.75; }
        }

        /* ── Photo subtle float ── */
        @keyframes photoFloat {
          0%, 100% { transform: scale(1.03) translate(0px, 0px); }
          33%      { transform: scale(1.04) translate(-4px, -3px); }
          66%      { transform: scale(1.03) translate(3px, 2px); }
        }

        /* ── Countdown box pop on change ── */
        @keyframes digitPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .hfu { animation: heroFadeUp 1s cubic-bezier(0.22,1,0.36,1) forwards; }
        .d1  { animation-delay: 0.15s; opacity: 0; }
        .d2  { animation-delay: 0.4s;  opacity: 0; }
        .d3  { animation-delay: 0.62s; opacity: 0; }
        .d4  { animation-delay: 0.82s; opacity: 0; }
        .d5  { animation-delay: 1.05s; opacity: 0; }

        .name-shimmer {
          background: linear-gradient(
            90deg,
            #fff 0%, #fff 40%,
            rgba(255,220,220,0.95) 50%,
            #fff 60%, #fff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear 1.5s infinite;
        }

        .date-glow {
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        .cnt {
          animation: countPulse 1s ease-in-out infinite;
          display: inline-block;
        }

        .photo-float {
          animation: photoFloat 8s ease-in-out infinite;
        }

        .open-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .open-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: btnShine 2.8s ease-in-out 2s infinite;
        }
        .open-btn:hover {
          transform: scale(1.06) translateY(-2px);
          box-shadow: 0 10px 32px rgba(255,255,255,0.3) !important;
        }

        .vignette {
          animation: vignetteBreathe 4s ease-in-out infinite;
        }

        /* countdown separator blink */
        @keyframes sepBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }
        .sep { animation: sepBlink 1s step-start infinite; }
      `}</style>

      {/* ── Background photo with parallax + float ── */}
      <div style={{
        position: 'absolute',
        inset: '-8%',
        zIndex: 0,
        transform: `translate(${mouseX * -8}px, ${mouseY * -6}px)`,
        transition: 'transform 0.15s ease-out',
      }}>
        <img
          className="photo-float"
          src="/wedding-invitation/foto-couple.jpg"
          alt="Couple"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            display: 'block',
          }}
          onError={e => { e.currentTarget.style.opacity = '0'; }}
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div className="vignette" style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%),
          linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.62) 100%)
        `,
        zIndex: 1,
      }} />

      {/* ── Particles ── */}
      {snowflakes.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: s.left + '%',
          top: '-20px',
          color: `rgba(255,255,255,${s.opacity})`,
          fontSize: s.size + 'px',
          pointerEvents: 'none',
          animation: `snowfall ${s.duration}s linear ${s.delay}s infinite`,
          zIndex: 2,
        }}>{s.type}</div>
      ))}

      {/* ── Content ── */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        color: 'white',
        padding: '40px 20px',
        width: '100%',
        maxWidth: '600px',
        transform: `translate(${mouseX * 4}px, ${mouseY * 3}px)`,
        transition: 'transform 0.2s ease-out',
      }}>

        {/* Guest name */}
        <p className="hfu d1" style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '1rem',
          fontWeight: 400,
          marginBottom: '10px',
          textShadow: '0 2px 12px rgba(0,0,0,0.7)',
          letterSpacing: '0.06em',
        }}>
          Kepada {guestName},
        </p>

        {/* Couple names — shimmer effect */}
        <h1 className="hfu d2 name-shimmer" style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(2.6rem, 9vw, 4.8rem)',
          fontWeight: 700,
          marginBottom: '18px',
          lineHeight: 1.1,
        }}>
          Armita &amp; Febri
        </h1>

        {/* Subtitle */}
        <p className="hfu d3" style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(0.8rem, 2.4vw, 1rem)',
          fontWeight: 300,
          marginBottom: '6px',
          textShadow: '0 2px 12px rgba(0,0,0,0.7)',
        }}>
          Akan segera melangsungkan pernikahan pada tanggal
        </p>

        {/* Date — glow pulse */}
        <p className="hfu d3 date-glow" style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(1rem, 2.8vw, 1.25rem)',
          fontWeight: 700,
          marginBottom: '28px',
        }}>
          Minggu, 27 Juli 2026
        </p>

        {/* Countdown */}
        <div className="hfu d4" style={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '36px',
        }}>
          {[
            { val: countdown.hari,  label: 'Hari' },
            { val: countdown.jam,   label: 'Jam' },
            { val: countdown.menit, label: 'Menit' },
            { val: countdown.detik, label: 'Detik' },
          ].map(({ val, label }, idx) => (
            <React.Fragment key={label}>
              <div style={{
                textAlign: 'center',
                minWidth: '58px',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '10px 6px 8px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}>
                <div className="cnt" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                }}>
                  {String(val).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  opacity: 0.85,
                  marginTop: '5px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </div>
              </div>
              {/* Separator blink antara angka kecuali terakhir */}
              {idx < 3 && (
                <span className="sep" style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  opacity: 0.7,
                  marginBottom: '14px',
                }}>:</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Button */}
        <div className="hfu d5">
          <button
            className="open-btn"
            onClick={() => {
              const el = document.getElementById('pembuka-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'white',
              color: '#e91e8c',
              border: 'none',
              borderRadius: '50px',
              padding: '14px 42px',
              fontSize: '0.88rem',
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            📖 BUKA UNDANGAN
          </button>
        </div>
      </div>
    </section>
  );
}