import React, { useState } from 'react';

const styles = {
  cover: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  names: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  nameTxt: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: '3.5rem',
    color: '#222',
    animation: 'fadeIn 1.5s ease forwards',
  },
  doorWrapper: {
    position: 'relative',
    width: '320px',
    height: '520px',
    zIndex: 3,
    cursor: 'pointer',
    perspective: '1000px',
  },
  clickHint: {
    position: 'absolute',
    bottom: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.85rem',
    color: '#999',
    whiteSpace: 'nowrap',
    animation: 'pulse 2s infinite',
  },
};

export default function CoverPage({ guestName, onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  return (
    <div style={styles.cover}>
      <style>{`
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .door-left { transform-origin: left center; transition: transform 1.2s cubic-bezier(0.4,0,0.2,1); }
        .door-right { transform-origin: right center; transition: transform 1.2s cubic-bezier(0.4,0,0.2,1); }
        .door-left.open { transform: perspective(800px) rotateY(-85deg); }
        .door-right.open { transform: perspective(800px) rotateY(85deg); }
      `}</style>

      <div style={styles.names}>
        <span style={{...styles.nameTxt, animation: 'fadeIn 1.5s ease 0.3s both'}}>Armita</span>
        <span style={{...styles.nameTxt, animation: 'fadeIn 1.5s ease 0.6s both'}}>Febri</span>
      </div>

      <div style={styles.doorWrapper} onClick={handleOpen}>
        <div style={{ position: 'relative', width: '320px', height: '520px' }}>
          {/* Full door background */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #ffd6e0, #ffe8f0)',
            borderRadius: '160px 160px 8px 8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem', color: '#e91e8c', opacity: 0.5 }}>
              ❤️ Buka Undangan
            </span>
          </div>
          {/* Left door half */}
          <div className={`door-left${opening ? ' open' : ''}`} style={{
            position: 'absolute', left: 0, top: 0, width: '50%', height: '100%',
            background: 'linear-gradient(160deg, #f5f0e8, #ede8de)',
            borderRadius: '160px 0 0 8px',
            borderRight: '1px solid #ccc5b0',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}>
            <DoorHalfDesign side="left" />
          </div>
          {/* Right door half */}
          <div className={`door-right${opening ? ' open' : ''}`} style={{
            position: 'absolute', right: 0, top: 0, width: '50%', height: '100%',
            background: 'linear-gradient(200deg, #f5f0e8, #ede8de)',
            borderRadius: '0 160px 8px 0',
            borderLeft: '1px solid #ccc5b0',
            boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}>
            <DoorHalfDesign side="right" />
          </div>
        </div>

        <div style={styles.clickHint}>
          {opening ? 'Membuka...' : '🖱️ Klik untuk membuka undangan'}
        </div>
      </div>
    </div>
  );
}

function DoorHalfDesign({ side }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <svg width="100%" height="300" viewBox="0 0 160 300" style={{ position: 'absolute', top: 0 }}>
        <path
          d={side === 'left'
            ? 'M10,300 L10,140 Q10,10 80,10 L160,10 L160,300 Z'
            : 'M0,300 L0,10 L80,10 Q150,10 150,140 L150,300 Z'
          }
          fill="none" stroke="#c8c0b0" strokeWidth="2.5"
        />
        <ellipse cx="80" cy="140" rx="50" ry="110" fill="none" stroke="#c8c0b0" strokeWidth="2" />
        {[50, 90, 130, 170].map((y, i) => (
          <path key={i}
            d={`M30,${y} Q80,${y - 15} 130,${y}`}
            fill="none" stroke="#bab0a0" strokeWidth="1.5"
          />
        ))}
        <circle cx="80" cy="70" r="12" fill="#d8d0be" />
        <circle cx="80" cy="70" r="6" fill="#c8c0b0" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse key={i}
            cx={80 + 18 * Math.cos((angle * Math.PI) / 180)}
            cy={70 + 18 * Math.sin((angle * Math.PI) / 180)}
            rx="7" ry="4"
            transform={`rotate(${angle}, ${80 + 18 * Math.cos((angle * Math.PI) / 180)}, ${70 + 18 * Math.sin((angle * Math.PI) / 180)})`}
            fill="#d4ccba"
          />
        ))}
        <path d="M50,110 Q80,95 110,110 Q80,125 50,110Z" fill="#ccc0aa" opacity="0.7" />
        <path d="M45,140 Q80,125 115,140 Q80,155 45,140Z" fill="#ccc0aa" opacity="0.6" />
        <path d="M48,165 Q80,150 112,165 Q80,180 48,165Z" fill="#ccc0aa" opacity="0.5" />
        <rect
          x={side === 'left' ? 130 : 20}
          y="240"
          width="8" height="25" rx="4"
          fill="#b0a888"
        />
      </svg>

      <div style={{
        position: 'absolute', bottom: '20px', left: '10px', right: '10px',
        height: '110px',
        border: '2px solid #ccc5b0',
        borderRadius: '6px',
        background: '#eae5d8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="100%" height="60" viewBox="0 0 140 60">
          <path d="M20,30 Q70,15 120,30 Q70,45 20,30Z" fill="#d4ccb8" />
          <path d="M30,30 Q70,22 110,30 Q70,38 30,30Z" fill="#c8c0b0" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}