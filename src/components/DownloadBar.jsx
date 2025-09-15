import styles from "./DownloadBar.module.css";

export default function DownloadBar({ onDownload }) {
  return (
    <section className={styles.wrap}>
      <button className={styles.btn} onClick={() => onDownload("png")}>
        <img src={`${process.env.PUBLIC_URL}/img/png.svg`} alt="PNG" className={styles.icon} />
        <span className={styles.text}>PNG</span>
      </button>
      <button className={styles.btn} onClick={() => onDownload("svg")}>
        <img src={`${process.env.PUBLIC_URL}/img/svg.svg`} alt="SVG" className={styles.icon} />
        <span className={styles.text}>SVG</span>
      </button>
      <button className={styles.btn} onClick={() => onDownload("pdf")}>
        <img src={`${process.env.PUBLIC_URL}/img/pdf.svg`} alt="PDF" className={styles.icon} />
        <span className={styles.text}>PDF</span>
      </button>
    </section>
  );
}
