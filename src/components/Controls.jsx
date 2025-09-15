import styles from "./Controls.module.css";

export default function Controls({
  url, setUrl,
  fgColor, setFgColor,
  bgColor, setBgColor,
  bgTransparency, setBgTransparency,
  style, setStyle,
  size, setSize
}) {

  return (
    <section className={styles.panel}>
      <div className={styles.grid}>
        {/* URL 입력 */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>Link</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Paste your link (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* Foreground & Background */}
        <div className={styles.colorRow}>
          <div className={styles.colorGroup}>
            <label className={styles.label}>Foreground</label>
            <input
              className={styles.color}
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              aria-label="Foreground color"
            />
          </div>
          
          <div className={styles.colorGroup}>
            <label className={styles.label}>Background</label>
            <input
              className={styles.color}
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              aria-label="Background color"
              disabled={bgTransparency}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={bgTransparency}
                onChange={(e) => setBgTransparency(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>Transparent</span>
            </label>
          </div>
        </div>
        
        {/* Download Size */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>Download Size</label>
          <input
            className={styles.range}
            type="range"
            min="256"
            max="768"
            step="16"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <div className={styles.rangeInfo}>{size}px</div>
        </div>
        
        {/* Style */}
        <div className={styles.controlGroup}>
          <span className={styles.label}>Style</span>
          <div className={styles.styleWrap}>
            <button
              className={`${styles.styleBtn} ${style === "square" ? styles.active : ""}`}
              onClick={() => setStyle("square")}
              aria-pressed={style === "square"}
            >
              ■ Pixel
            </button>
            <button
              className={`${styles.styleBtn} ${style === "dots" ? styles.active : ""}`}
              onClick={() => setStyle("dots")}
              aria-pressed={style === "dots"}
            >
              ● Dot
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
