import React from "react";

const NewTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-separate"
        style={{
          width: "100%",
          borderCollapse: "separate", // ✅ Ensure separate borders
          borderSpacing: "0 8px", // ✅ Adds spacing between rows
        }}
      >
        {/* Table Header */}
        <thead style={{ background: "var(--Table-Column, #2F4096)", color: "white" }}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="rounded-lg shadow-md">
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2 rounded-lg"
                  style={{
                    background: rowIndex % 2 === 0
                      ? "var(--Card-Row-2, #D8F0FD)"
                      : "var(--Table-Row-1, #F6FCFF)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewTable;
