import { useEffect, useState } from 'react';
import styles from './FloatingText.module.css';

export default function FloatingText() {
  const [visibleChars, setVisibleChars] = useState([]);
  const text = "Design Your Aura, Share Your World.";
  const mobileText = ["Design your Aura,", "Share your world."];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars(prev => {
        if (prev.length >= text.length) {
          return prev;
        }
        return [...prev, prev.length];
      });
    }, 300);

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <div className={styles.floatingText}>
      <div className={styles.textContainer}>
        <div className={styles.desktopText}>
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={`${styles.char} ${
                visibleChars.includes(index) ? styles.visible : styles.hidden
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className={styles.mobileText}>
          {mobileText.map((line, lineIndex) => (
            <div key={lineIndex} className={styles.mobileLine}>
              {line.split('').map((char, index) => (
                <span
                  key={index}
                  className={`${styles.char} ${
                    visibleChars.includes(index) ? styles.visible : styles.hidden
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
