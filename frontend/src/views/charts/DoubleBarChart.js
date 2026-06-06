import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";

const DoubleBarChart = ({
  data,
  xDataKey,
  barKeys,
  barNames,
  barColors, // Default colors
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
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div style={{ width: width, height: height }}>
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
      <ResponsiveContainer>
        <ComposedChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey={xDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              name={barNames[index] || key}
              fill={barColors[index] || "#ccc"}
              style={{transition: "fill 0.3s ease"}}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoubleBarChart;
