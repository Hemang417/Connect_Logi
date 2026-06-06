import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleLineChart = ({
  data,
  xDataKey,
  lines,
  title,
  height = 300,
  width = "100%",
  margin = { top: 10, right: 10, left: 0, bottom: 10 },
}) => {
  // Generate a unique color for each line if not provided
  const defaultColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

  return (
    <div style={{ width: width, height: height }}>
      {title && (
        <h6
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "var(--pg-title-color)",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </h6>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={margin} className="Margin">
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey={xDataKey} tick={{ fontSize: "12" }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color || defaultColors[index % defaultColors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleLineChart;
