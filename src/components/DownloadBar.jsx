import styles from "./DownloadBar.module.css";
import pngIcon from "../assets/icons/png.svg";
import svgIcon from "../assets/icons/svg.svg";
import pdfIcon from "../assets/icons/pdf.svg";

export default function DownloadBar({ onDownload }) {
  return (
    <section className={styles.wrap}>
      <button className={styles.btn} onClick={() => onDownload("png")}>
        <img src={pngIcon} alt="PNG" className={styles.icon} />
        <span className={styles.text}>PNG</span>
      </button>
      <button className={styles.btn} onClick={() => onDownload("svg")}>
        <img src={svgIcon} alt="SVG" className={styles.icon} />
        <span className={styles.text}>SVG</span>
      </button>
      <button className={styles.btn} onClick={() => onDownload("pdf")}>
        <img src={pdfIcon} alt="PDF" className={styles.icon} />
        <span className={styles.text}>PDF</span>
      </button>
    </section>
  );
}
