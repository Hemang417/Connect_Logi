import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleBarChart = ({
  data,
  xDataKey,
  bars,
  title,
  height = 300,
  width = "100%",
  margin = { top: 10, right: 10, left: 0, bottom: 10 },
}) => {
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

  // Generate a unique color for each bar if not provided
  const defaultColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

  return (
    <div style={{ width: width, height: height }}>
      {title && (
        <h6
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: theme === "dark" ? "#F6FCF2" : "#1E2652",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </h6>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey={xDataKey} tick={{ fontSize: "12" }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={bar.fill || defaultColors[index % defaultColors.length]}
              style={{ transition: "fill 0.3s ease" }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
