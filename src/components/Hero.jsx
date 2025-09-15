import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <span className={styles.logoText}>AuraQR</span>
        </div>
        <div className={styles.tagline}>
          <span className={styles.taglineText}>Free Minimal QR Generator</span>
          <div className={styles.taglineDot}></div>
        </div>
      </div>
    </header>
  );
}
