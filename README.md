# AuraQR - Free Minimal QR Generator

A clean and elegant React application for generating customizable QR codes with a modern design.

## ✨ Features

- **Live QR Preview**: Real-time QR code generation with instant updates
- **Customization Options**:
  - Foreground/Background color pickers
  - Style toggle: Square or Dot patterns
  - Size adjustment (256-768px)
  - Transparent background option
- **Multiple Export Formats**: PNG, SVG, and PDF downloads
- **Responsive Design**: Optimized for all devices
- **Clean Interface**: Minimal and intuitive user experience

## 🛠 Tech Stack

- **React** with JavaScript (ES6+)
- **CSS Modules** for scoped styling
- **qr-code-styling** for QR generation
- **html2canvas** + **jsPDF** for PDF export
- **Create React App** build system

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📱 Responsive Design

- **Mobile (≤767px)**: Single column layout
- **Tablet (768-1023px)**: Adaptive layouts
- **Desktop (≥1024px)**: Spacious layouts

## 🎯 Usage

1. **Enter URL**: Paste any link in the input field
2. **Customize**: Use color pickers and style options
3. **Export**: Download in your preferred format

## 📁 Project Structure

```
/src
  main.jsx              # Application entry point
  App.jsx               # Main application logic
  App.module.css        # Global styles
  /components
    Hero.jsx            # Header component
    QRPreview.jsx       # QR display component
    Controls.jsx        # Form controls
    DownloadBar.jsx    # Download buttons
    Footer.jsx          # Footer component
    FloatingText.jsx   # Animated text component
```

## 📄 License

© 2025 AuraQR