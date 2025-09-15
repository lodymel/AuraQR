import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Hero from "./components/Hero";
import QRPreview from "./components/QRPreview";
import Controls from "./components/Controls";
import DownloadBar from "./components/DownloadBar";
import Footer from "./components/Footer";
import FloatingText from "./components/FloatingText";
import QRCodeStyling from "qr-code-styling";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Create a single QR instance and update it based on state changes.
// Display uses fixed size, download uses selected size
const qrCode = new QRCodeStyling({
  width: 320, 
  height: 320,
  type: "svg",
  data: "https://auraqr.app",
  qrOptions: { errorCorrectionLevel: "M" },
  dotsOptions: { color: "#000000", type: "square" },
  backgroundOptions: { color: "#ffffff" },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.5, margin: 24 },
});

export default function App() {
  const [url, setUrl] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgTransparency, setBgTransparency] = useState(false);
  const [style, setStyle] = useState("square");
  const [size, setSize] = useState(320);
  const qrRef = useRef(null);
  const previewCardRef = useRef(null);

  // Append QR to render target on mount
  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, []);

  // Update QR whenever state changes (display uses fixed size)
  useEffect(() => {
    const backgroundColor = bgTransparency ? "transparent" : bgColor;
    
    qrCode.update({
      data: url && url.trim() ? normalizeUrl(url) : "https://auraqr.app",
      width: 320,
      height: 320,
      dotsOptions: { color: fgColor, type: style },
      backgroundOptions: { color: backgroundColor },
    });

  }, [url, fgColor, bgColor, bgTransparency, style]);

  // Download: PNG/SVG uses selected size, PDF captures card area
  const download = (ext) => {
    // Check if URL is empty or only whitespace
    if (!url || !url.trim()) {
      alert("Please enter a link to generate your QR code.");
      return;
    }

    if (ext === "pdf") {
      if (!previewCardRef.current) return;
      html2canvas(previewCardRef.current, { scale: 2, backgroundColor: null }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth * 0.8;
        const ratio = canvas.height / canvas.width;
        const imgHeight = imgWidth * ratio;
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;
        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save(makeFilename("pdf"));
      });
      return;
    }
    
    if (ext === "svg") {
      // Use qrcode library for SVG download
      const qrData = url && url.trim() ? normalizeUrl(url) : "https://auraqr.app";
      
      // Generate SVG using qrcode library
      QRCode.toString(qrData, {
        type: 'svg',
        width: size,
        margin: 1,
        color: {
          dark: fgColor,
          light: bgTransparency ? '#0000' : bgColor
        },
        errorCorrectionLevel: 'M'
      }, (err, svgString) => {
        if (err) {
          console.error('SVG generation error:', err);
          return;
        }
        
        // Download SVG
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = makeFilename(ext, false) + '.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
      });
      return;
    }
    
    // PNG download
    const backgroundColor = bgTransparency ? "transparent" : bgColor;
    const downloadQR = new QRCodeStyling({
      width: size,
      height: size,
      type: "canvas",
      data: url && url.trim() ? normalizeUrl(url) : "https://auraqr.app",
      qrOptions: { errorCorrectionLevel: "M" },
      dotsOptions: { color: fgColor, type: style },
      backgroundOptions: { color: backgroundColor },
    });
    
    downloadQR.download({ name: makeFilename(ext, false), extension: ext });
  };


  return (
    <div className={styles.container}>
      <Hero />

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.qrSection}>
            <QRPreview
              qrRef={qrRef}
              previewCardRef={previewCardRef}
              fgColor={fgColor}
              style={style}
            />
            <div className={styles.desktopDownloadBar}>
              <DownloadBar onDownload={download} />
            </div>
            <FloatingText />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <Controls
            url={url}
            setUrl={setUrl}
            fgColor={fgColor}
            setFgColor={setFgColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            bgTransparency={bgTransparency}
            setBgTransparency={setBgTransparency}
            style={style}
            setStyle={setStyle}
            size={size}
            setSize={setSize}
          />
        </div>
        
        {/* Download button for mobile only */}
        <div className={styles.mobileDownloadBar}>
          <DownloadBar onDownload={download} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Auto-correct protocol if user omits https://
function normalizeUrl(value) {
  try {
    if (!/^https?:\/\//i.test(value)) return `https://${value}`;
    return value;
  } catch {
    return "https://auraqr.app";
  }
}

// Filename timestamp utility
function makeFilename(ext, withExt = true) {
  const d = new Date();
  const stamp =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0") +
    "-" +
    String(d.getHours()).padStart(2, "0") +
    String(d.getMinutes()).padStart(2, "0") +
    String(d.getSeconds()).padStart(2, "0");
  return withExt ? `auraqr-${stamp}.${ext}` : `auraqr-${stamp}`;
}
