"use client";
import { useState, useEffect } from "react";

export default function Settings() {
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saved, setSaved] = useState(false);

  // Apply settings to document root
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    const sizeMap = { normal: "16px", large: "20px", xlarge: "24px" };
    root.style.setProperty("--user-font-size", sizeMap[fontSize]);
    document.body.style.fontSize = sizeMap[fontSize];

    // High contrast
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }

    // Reduced motion
    if (reducedMotion) {
      document.body.classList.add("reduce-motion");
    } else {
      document.body.classList.remove("reduce-motion");
    }
  }, [fontSize, highContrast, reducedMotion]);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="page">
      <h1>Accessibility Settings</h1>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "25px" }}>
        Adjust these settings to make the app easier to use. Changes apply immediately.
      </p>

      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "20px", maxWidth: "480px" }}>

        {/* Text size */}
        <fieldset style={{ border: "none", padding: 0, marginBottom: "20px" }}>
          <legend style={{ fontFamily: "Courier New", fontSize: "13px", fontWeight: "bold", marginBottom: "10px" }}>
            Text size
          </legend>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {(["normal", "large", "xlarge"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                aria-pressed={fontSize === size}
                style={{
                  background: fontSize === size ? "#8B4513" : "#556B2F",
                  color: "#FFD700",
                  fontSize: size === "normal" ? "12px" : size === "large" ? "14px" : "17px",
                }}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </fieldset>

        {/* High contrast */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="high-contrast"
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <input
              id="high-contrast"
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ fontFamily: "Courier New", fontSize: "13px" }}>
              High contrast mode
            </span>
          </label>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px", marginLeft: "28px" }}>
            Increases colour contrast for text and borders.
          </p>
        </div>

        {/* Reduced motion */}
        <div style={{ marginBottom: "24px" }}>
          <label
            htmlFor="reduced-motion"
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <input
              id="reduced-motion"
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ fontFamily: "Courier New", fontSize: "13px" }}>
              Reduce motion
            </span>
          </label>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px", marginLeft: "28px" }}>
            Disables animations and transitions across the app.
          </p>
        </div>

        <button onClick={handleSave}>Save settings</button>

        {saved && (
          <p role="alert" style={{ color: "#2E5B1E", fontFamily: "Courier New", fontSize: "12px", marginTop: "10px" }}>
            ✓ Settings saved.
          </p>
        )}
      </div>

      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "14px", maxWidth: "480px", marginTop: "16px" }}>
        <h2>Keyboard navigation</h2>
        <p style={{ fontSize: "13px", marginTop: "8px" }}>
          All pages in this app support full keyboard navigation. Use <strong>Tab</strong> to move between links and buttons, and <strong>Enter</strong> or <strong>Space</strong> to activate them.
        </p>
      </div>
    </div>
  );
}
