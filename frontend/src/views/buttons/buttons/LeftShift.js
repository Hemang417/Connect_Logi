import React from "react";
import { useState, useEffect } from "react";

const LeftShift = ({ disabled }) => {
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
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M19.5 6.74998H12V2.99998C12.0001 2.85156 11.9562 2.70644 11.8738 2.58299C11.7914 2.45955 11.6742 2.36333 11.5371 2.30651C11.4 2.2497 11.2491 2.23485 11.1035 2.26383C10.958 2.29282 10.8243 2.36435 10.7194 2.46936L1.71937 11.4694C1.64964 11.539 1.59432 11.6217 1.55658 11.7128C1.51884 11.8038 1.49941 11.9014 1.49941 12C1.49941 12.0985 1.51884 12.1961 1.55658 12.2872C1.59432 12.3782 1.64964 12.461 1.71937 12.5306L10.7194 21.5306C10.8243 21.6356 10.958 21.7071 11.1035 21.7361C11.2491 21.7651 11.4 21.7503 11.5371 21.6934C11.6742 21.6366 11.7914 21.5404 11.8738 21.417C11.9562 21.2935 12.0001 21.1484 12 21V17.25H19.5C19.8978 17.25 20.2794 17.0919 20.5607 16.8106C20.842 16.5293 21 16.1478 21 15.75V8.24998C21 7.85216 20.842 7.47063 20.5607 7.18932C20.2794 6.90802 19.8978 6.74998 19.5 6.74998ZM19.5 15.75H11.25C11.0511 15.75 10.8603 15.829 10.7197 15.9697C10.579 16.1103 10.5 16.3011 10.5 16.5V19.1897L3.31031 12L10.5 4.81029V7.49998C10.5 7.69889 10.579 7.88966 10.7197 8.03031C10.8603 8.17096 11.0511 8.24998 11.25 8.24998H19.5V15.75Z"
          //   fill={disabled ? "#A2A8C9" : "#1E2652"}
          fill={
            theme === "dark"
              ? disabled
                ? "#A2A8C9"
                : "#D1EEFF"
              : disabled
              ? "#A2A8C9"
              : "#1E2652"
          }
          fill-opacity={disabled ? "0.77" : "1"}
        />
      </svg>
    </div>
  );
};

export default LeftShift;
