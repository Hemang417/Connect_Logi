import React from "react";
import { useState, useEffect } from "react";

const RightShift = ({ disabled }) => {
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
        {" "}
        <path
          d="M22.2806 11.4694L13.2806 2.46936C13.1757 2.36435 13.042 2.29282 12.8965 2.26383C12.7509 2.23485 12.6 2.2497 12.4629 2.30651C12.3258 2.36333 12.2086 2.45955 12.1262 2.58299C12.0438 2.70644 11.9999 2.85156 12 2.99998V6.74998H4.5C4.10218 6.74998 3.72064 6.90802 3.43934 7.18932C3.15804 7.47063 3 7.85216 3 8.24998V15.75C3 16.1478 3.15804 16.5293 3.43934 16.8106C3.72064 17.0919 4.10218 17.25 4.5 17.25H12V21C11.9999 21.1484 12.0438 21.2935 12.1262 21.417C12.2086 21.5404 12.3258 21.6366 12.4629 21.6934C12.6 21.7503 12.7509 21.7651 12.8965 21.7361C13.042 21.7071 13.1757 21.6356 13.2806 21.5306L22.2806 12.5306C22.3504 12.461 22.4057 12.3782 22.4434 12.2872C22.4812 12.1961 22.5006 12.0985 22.5006 12C22.5006 11.9014 22.4812 11.8038 22.4434 11.7128C22.4057 11.6217 22.3504 11.539 22.2806 11.4694ZM13.5 19.1897V16.5C13.5 16.3011 13.421 16.1103 13.2803 15.9697C13.1397 15.829 12.9489 15.75 12.75 15.75H4.5V8.24998H12.75C12.9489 8.24998 13.1397 8.17096 13.2803 8.03031C13.421 7.88966 13.5 7.69889 13.5 7.49998V4.81029L20.6897 12L13.5 19.1897Z"
          fill={theme === "dark" ? (disabled ? "#A2A8C9" : "#D1EEFF") : (disabled ? "#A2A8C9" : "#1E2652")}

          fill-opacity={disabled ? "0.77" : "1"}
        />
      </svg>
    </div>
  );
};

export default RightShift;
