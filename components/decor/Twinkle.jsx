import React from 'react';

/** Twinkle-Stern ✦: absolut positionierte, sanft funkelnde Deko auf Terra/Dunkel. */
export function Twinkle({ left, right, top, bottom, size = 11, delay = 0, duration = 5.5, color = '#FFFFFF', style }) {
  return (
    <span aria-hidden="true" style={{
      position: 'absolute', left, right, top, bottom,
      color, fontSize: `${size}px`, pointerEvents: 'none',
      animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`, ...style,
    }}>✦</span>
  );
}
