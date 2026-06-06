import React from "react";
import styles from "./NewInput.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const NewInput = ({
  width,
  height = "fit-content",
  setSelectedValue,
  selectedValue,
  placeholder,
  type,
  name,
  readlyOnly,
  disabled,
  textarea,
  textareaHeight,
  textareaMinHeight,
  textareaMaxHeight,
  inputType,
  index,
  specialName,
  max,
  min,
}) => {
  const location = useLocation();
  const specialPaths = [
    "/Createorg",
    "/impcreatejob",
    "/expcreatejob",
    "/impeditjob",
    "/expeditjob",
    "/PaymentSheetDebitCreate",
    "/UserListAccess",
    "/Editorg",
    "/NewKYCAccess",
  ];
  return (
    <span
      className={styles.input}
      style={{
        width: width,
        height: height,
        borderColor:
          (readlyOnly || disabled) && !textarea
            ? "transparent"
            : "var(--border-color)",
        paddingLeft: readlyOnly || disabled ? "0px" : "16px",
      }}
    >
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className={styles.textarea}
          readOnly={readlyOnly}
          disabled={disabled}
          value={selectedValue}
          style={{
            minHeight: textareaMinHeight || "86px",
            maxHeight: textareaMaxHeight || "100px",
            height: textareaHeight || null,
          }}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
      ) : inputType === "type1" ? (
        <input
          spellCheck="false"
          name={name}
          type={type}
          className={styles.customInput}
          autoComplete="off"
          placeholder={placeholder}
          value={selectedValue}
          readOnly={readlyOnly}
          disabled={disabled}
          max={max}
          onChange={(e) => {
            setSelectedValue(index, specialName, e.target.value);
          }}
        />
      ) : (
        <input
          spellCheck="false"
          name={name}
          autoComplete="off"
          type={type}
          className={styles.customInput}
          placeholder={placeholder}
          value={selectedValue}
          readOnly={readlyOnly}
          disabled={disabled}
          max={max}
          min={min}
          onChange={(e) => {
            const [firstsegment] = location.pathname.split("/").slice(1);
            const basePath = `/${firstsegment}`;
            specialPaths.includes(basePath)
              ? setSelectedValue(e)
              : setSelectedValue(e.target.value);
          }}
        />
      )}
      {/* {console.log(path.join("", location.pathname.split("/")[1]))} */}
    </span>
  );
};

export default NewInput;
