import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NewButton from "src/views/buttons/buttons/NewButton";
import "../../../css/styles.css";
import API_BASE_URL from "src/config/config";

registerAllModules();

const Quotation = () => {
  const tableRef = useRef(null);
  const hotInstanceRef = useRef(null);
  const [displayData, setDisplayData] = useState([]);
  const [hasPastedNewData, setHasPastedNewData] = useState(false);
  const [makeFirstRowHeader, setMakeFirstRowHeader] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");
  const section = queryParams.get("section");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  useEffect(() => {
    fetchQuotation();
  }, []);

  useEffect(() => {
    if (!tableRef.current) return;

    if (hotInstanceRef.current) {
      hotInstanceRef.current.destroy();
    }

    hotInstanceRef.current = new Handsontable(tableRef.current, {
      data: displayData,
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      manualRowResize: true,
      manualColumnResize: true,
      manualRowMove: true,
      mergeCells: true,
      manualColumnMove: true,
      copyPaste: true,
      fillHandle: true,
      undo: true,
      redo: true,
      width: "100%",
      height: 400,
      stretchH: "all",
      licenseKey: "non-commercial-and-evaluation",
      cells(row, col) {
        const cellProperties = {};
        if (row === 0 && makeFirstRowHeader) {
          cellProperties.className = "header-row";
        }
        return cellProperties;
      },
      afterChange(changes, source) {
        if (source !== "loadData") {
          setDisplayData(hotInstanceRef.current.getData());
        }
      },
      afterPaste() {
        setHasPastedNewData(true);
        setDisplayData(hotInstanceRef.current.getData());
      },
    });
  }, [displayData, theme, makeFirstRowHeader]);

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData.getData("Text");
    const rows = clipboardData
      .trim()
      .split("\n")
      .map((row) => row.split("\t"));

    setDisplayData(rows);
    setHasPastedNewData(true);
    e.preventDefault();
  };

  const handleUpdate = async () => {
    const data = hotInstanceRef.current?.getData() || [];
    if (!data.length) return toast.error("No data to save.");

    try {
      const url = hasPastedNewData
        ? `${API_BASE_URL}/saveExcelData`
        : `${API_BASE_URL}/saveExcelChanges`;

      const payload = {
        username: localStorage.getItem("username"),
        tableData: hasPastedNewData
          ? data
          : data.map((row) => ({ json_data: row })),
        section,
        jobNumber,
        orgcode: localStorage.getItem("orgcode"),
        orgname: localStorage.getItem("orgname"),
        branchcodeofemp: localStorage.getItem("branchcodeofemp"),
        branchnameofemp: localStorage.getItem("branchnameofemp"),
        clientname: sessionStorage.getItem("importername"),
      };

      const res = await axios.post(url, payload);
      if (res) {
        toast.success("Data saved successfully.");
        fetchQuotation();
        setHasPastedNewData(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving data.");
    }
  };

  const fetchQuotation = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getQuotation`, {
        params: {
          jobnumber: jobNumber,
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });

      if (response.data) {
        const tableData = response.data.map((row) => row.json_data);
        setDisplayData(tableData);
      }
    } catch (err) {
      toast.error("Failed to fetch quotation.");
    }
  };

  const handleClose = () => {
    setTimeout(() => window.top.close(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-data-1" style={{ fontSize: 20, fontWeight: 500 }}>
        Paste Excel Data Below:
      </h3>

      <div
        contentEditable
        onPaste={handlePaste}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "100px",
          marginBottom: "20px",
        }}
      >
        <label className="text-data-1">
          (Click here and paste your Excel data)
        </label>
      </div>

      <h4 className="text-data-1" style={{ display: "flex", gap: 10 }}>
        Editable Table:
        <label>
          Make First Row as Header
          <input
            type="checkbox"
            checked={makeFirstRowHeader}
            onChange={() => setMakeFirstRowHeader(!makeFirstRowHeader)}
          />
        </label>
      </h4>

      <div
        ref={tableRef}
        style={{
          width: "100%",
          maxHeight: "450px",
          marginBottom: "20px",
        }}
      ></div>

      <div className="all-buttons">
        <div className="search-button" onClick={handleUpdate}>
          <NewButton width={"120px"} text={"Save"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
            fetchQuotation();
          }}
        >
          <NewButton width={"120px"} text={"Save & New"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          <NewButton width={"120px"} text={"Save & Close"} />
        </div>
        <div className="search-button" onClick={handleClose}>
          <NewButton width={"120px"} text={"Close"} />
        </div>
      </div>
    </motion.div>
  );
};

export default Quotation;
