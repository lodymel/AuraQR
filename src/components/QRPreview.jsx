import styles from "./QRPreview.module.css";

export default function QRPreview({ qrRef, previewCardRef, fgColor, style }) {
  console.log('QRPreview style:', style);
  return (
    <section className={styles.section}>
      <div
        ref={previewCardRef}
        className={styles.card}
        style={{ "--glow": fgColor }}
      >
        <div 
          ref={qrRef} 
          className={`${styles.qrBox} ${style === "star" ? styles.star : ""}`}
          data-style={style}
        />
      </div>
    </section>
  );
}
