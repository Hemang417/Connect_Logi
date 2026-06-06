import React from "react";
import styles from "./css/CustomColorBtn.module.css";
import { useState, useEffect } from "react";

function CustomColorBtn({
  text,
  width,
  disabled,
  height,
  bgcolorlight,
  bgcolordark,
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen to changes within the same tab
    const observer = new MutationObserver(handleStorageChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      disabled={disabled}
      className={styles.span}
      style={{
        width: width,
        height: height ? height : "35px",
        backgroundColor: theme === "dark" ? bgcolordark : bgcolorlight,
        color: theme === "dark" ? "#101322" : "#d1eeff",
      }}
    >
      {text}
    </button>
  );
}

export default CustomColorBtn;
